exports = Sequelize = require("sequelize");
const config = require("../config");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const operatorsAliases = config.db_operatorsAliases;
const ENV = process.env.ENV;
const db = {};

/* This is the configuration of the database. */
let options = {
  operatorsAliases,
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
  port: process.env.DB_PORT,
  define: {
    underscored: false,
    schema: "public",
  },
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
  },
  pool: {
    max: 100,
    min: 0,
    idle: 20000,
    acquire: 1000000,
  },
  timezone: "+05:30",
};

if (config.internal_db_cred.hasOwnProperty(ENV)) {
  let creds = config.internal_db_cred[ENV];
  Object.assign(options, { host: creds.host });
  sequelize = new Sequelize(
    creds.database,
    creds.user,
    creds.password,
    options
  );

  /* Reading all the files in the model folder and then it is creating a table in the database. */
  const modelPath = ["../models", "../models/mappers", "../models/masters"];
  for (const pathIs of modelPath) {
    fs.readdirSync(path.join(__dirname, pathIs))
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
        );
      })
      .forEach((file) => {
        const model = require(path.join(__dirname, pathIs + "/" + file))(
          sequelize,
          Sequelize.DataTypes
        );
        if (model != undefined) {
          db[model.name] = model;
        }
      });
  }
  /* Creating a relationship between the tables. */
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  /* Checking if the database is connected or not. */
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Internal: [${ENV}] - Database connected.`);
    })
    .catch((err) => {
      console.log(`External:Error in connecting [${ENV}] database : `, err);
      process.exit(0);
    });

  let syncConfig = { alter: { alter: true, drop: false }, force: false }; // Note : folrce true is delete you table forcefully and create new table
  /* Creating the table in the database. */
  sequelize
    .sync(syncConfig)
    .then(() => {
      console.log("Successfully created table");
    })
    .catch((err) => {
      console.log("err", err);
    });
} else {
  console.log(ENV, "Env not supported");
  process.exit(0);
}
exports = sequelize;
db.sequelize = sequelize;
module.exports = db;
