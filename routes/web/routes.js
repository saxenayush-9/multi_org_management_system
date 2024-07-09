require("rootpath")();
const express = require("express");
const apiRoutes = express.Router();

/****** USER ******/
const user = require("./user");
apiRoutes.use(user);

/****** ORGANIZATION ******/
const organization = require("./organization");
apiRoutes.use(organization);

/****** SESSION ******/
const session = require("./session");
apiRoutes.use(session);

/****** TASK ******/
const task = require("./task");
apiRoutes.use(task);

module.exports = apiRoutes;
