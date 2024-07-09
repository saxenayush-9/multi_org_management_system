/*
 * @Author: Ayush Saxena
 * @Date: 2024-07-09
 * @Last Modified by: ayushsaxena994@gmail.com
 * @Last Modified Date: 2024-07-09
 * Created a table named user with the following fields:
 */
const commonFields = require("./CommonField");
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        comment: "Name of the user",
      },
      email_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "This is the user email id",
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.TEXT,
        comment: "This is password for user",
      },
      confirm_password: {
        type: DataTypes.TEXT,
      },
      ...commonFields(DataTypes),
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return user;
};
