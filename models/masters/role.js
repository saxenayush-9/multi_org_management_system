/*
 * @Author: Ayush Saxena
 * @Date: 2024-07-09
 * @Last Modified by: ayushsaxena994@gmail.com
 * @Last Modified Date: 2024-07-09
 * Creating a table named role with the following fields:
 */
const commonFields = require("../CommonField");
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "role",
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: "Name of the role",
        validate: {
          async isUnique(value) {
            const roleName = await role.findOne({
              where: sequelize.where(
                sequelize.fn(
                  "REPLACE",
                  sequelize.fn("LOWER", sequelize.col("name")),
                  " ",
                  ""
                ),
                sequelize.fn(
                  "REPLACE",
                  sequelize.fn("LOWER", value.trim()),
                  " ",
                  ""
                )
              ),
              attributes: ["uuid"],
            });
            if (roleName && roleName.uuid !== this.uuid) {
              throw new Error("Role already exists!");
            }
          },
        },
      },
      description: {
        type: DataTypes.STRING(250),
        comment: "This is the role description",
      },
      ...commonFields(DataTypes),
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return role;
};
