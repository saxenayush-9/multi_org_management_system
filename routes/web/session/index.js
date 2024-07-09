const express = require("express");
const apiRoutes = express.Router();
const { createSession, getSession, switchOrg } = require("./sessionController");

apiRoutes.route("/session").get(getSession).post(createSession);

//switch organization within session
apiRoutes.route("/sessions/:session_id/organizations").put(switchOrg);

module.exports = apiRoutes;
