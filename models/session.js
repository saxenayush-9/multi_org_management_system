/*
 * @Author: Ayush Saxena
 * @Date: 2024-07-09
 * @Last Modified by: ayushsaxena994@dhwaniris.com
 * @Last Modified Date: 2024-07-09
 * Created a table named session with the following fields:
 */
const commonFields = require("./CommonField");
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    "session",
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
        comment: "Foreign Key to organization user table",
      },
      start_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "Session start time",
      },
      end_time: {
        type: DataTypes.DATE,
        comment: "Session end time",
      },
      ...commonFields(DataTypes),
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  organization_user.associate = (models) => {
    organization_user.belongsTo(models.user, {
      foreignKey: "user_id",
      targetKey: "uuid",
      message: "The provided user ID does not exist in the user table.",
    });
  };
  return session;
};
