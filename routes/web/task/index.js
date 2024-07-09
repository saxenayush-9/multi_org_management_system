const express = require("express");
const apiRoutes = express.Router();
const { getTasks, createTask, getOrgTasks } = require("./taskController");

apiRoutes.route("/tasks").get(getTasks);
apiRoutes.route("/organizations/:organization_id/users").get(getOrgTasks).post(createTask);

module.exports = apiRoutes;
