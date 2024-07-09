const express = require("express");
const apiRoutes = express.Router();
const { getOrgs, addOrg, getUserOrgs, assignOrg } = require("./userController");

apiRoutes.route("/organization").get(getOrgs).post(addOrg);
apiRoutes
  .route("/organizations/:organization_id/users")
  .get(getUserOrgs)
  .post(assignOrg);

module.exports = apiRoutes;
