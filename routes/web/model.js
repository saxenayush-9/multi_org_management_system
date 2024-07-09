const modelPath = require("../../dbConnection");

/* Exporting the modelPath object. */
module.exports = {
  masters: require("./masters/model"),
  mappers: require("./mappers/model"),
  user: modelPath.user,
  organization: modelPath.organization,
  organization_user: modelPath.organization_user,
  task: modelPath.task,
  session: modelPath.session,
};
