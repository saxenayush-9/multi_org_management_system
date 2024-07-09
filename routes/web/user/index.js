const express = require("express");
const apiRoutes = express.Router();
const { getUsers, addUser, assignRole, getUserRoles } = require("./userController");
const session = require("express-session");
apiRoutes.use(
  session({
    secret: process.env.SUPERSECRET, // Replace with a secure secret key
    resave: false, // Set to false to prevent session resaving on each request
    saveUninitialized: true, // Set to true to save new sessions with uninitialized data
  })
);

apiRoutes.route("/user").get(getUsers).post(addUser);
apiRoutes.route("/users/:user_id/roles").get(getUserRoles).post(assignRole);

module.exports = apiRoutes;
