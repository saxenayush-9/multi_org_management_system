/*
 * @Author: Ayush Saxena
 * @Date: 2024-07-09
 * @Last Modified by: ayushsaxena994@dhwaniris.com
 * @Last Modified Date: 2024-07-09
 * Created a table named organization with the following fields:
 */
const commonFields = require("./CommonField");
module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define(
    "organization",
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        comment: "Name of the organization",
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: "Foreign Key to user table",
      },
      ...commonFields(DataTypes),
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  organization.associate = (models) => {
    organization.belongsTo(models.user, {
      foreignKey: "created_by",
      targetKey: "uuid",
      message: "The provided user ID does not exist in the user table.",
    });
  };
  return organization;
};
