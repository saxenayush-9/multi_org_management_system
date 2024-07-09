module.exports = (DataTypes) => {
  return {
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "Indicates whether entity is active or not",
    },
    deleted_at: {
      type: DataTypes.DATE,
      comment: "Date when the entity is marked as inactive",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: "Date when the entity is created",
    },
    updated_at: {
      type: DataTypes.DATE,
      comment: "Date when the entity is last updated",
    },
  };
};
