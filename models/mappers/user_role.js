/*
 * @Author: Ayush Saxena
 * @Date: 2024-07-09
 * @Last Modified by: ayushsaxena994@gmail.com
 * @Last Modified Date: 2024-07-09
 * Creating a table named user_role with the following fields:
 */
const commonFields = require("../CommonField");

module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define(
    "user_role",
    {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: "Foreign Key to user table",
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: "Foreign Key to role table",
      },
      ...commonFields(DataTypes),
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  user_role.associate = (models) => {
    user_role.belongsTo(models.user, {
      foreignKey: "user_id",
      targetKey: "uuid",
      message: "The provided user ID does not exist in the user table.",
    });
    user_role.belongsTo(models.role, {
      foreignKey: "role_id",
      targetKey: "uuid",
      message: "The provided role ID does not exist in the role table.",
    });
  };
  return user_role;
};
