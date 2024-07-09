/*
 * @Author: Ayush Saxena
 * @Date: 2024-07-09
 * @Last Modified by: ayushsaxena994@dhwaniris.com
 * @Last Modified Date: 2024-07-09
 * Created a table named task with the following fields:
 */
const commonFields = require("./CommonField");
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define(
    "task",
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        comment: "Name of the task",
      },
      description: {
        type: DataTypes.STRING(250),
        comment: "Description of the task",
      },
      organization_id: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: "Foreign Key to organization table",
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: "Foreign Key to organization user table",
      },
      ...commonFields(DataTypes),
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  task.associate = (models) => {
    task.belongsTo(models.organization, {
      foreignKey: "organization_id",
      targetKey: "uuid",
      message: "The provided user ID does not exist in the organization table.",
    });
    task.belongsTo(models.organization_user, {
      foreignKey: "created_by",
      targetKey: "uuid",
      message:
        "The provided user ID does not exist in the organization user table.",
    });
  };
  return task;
};
