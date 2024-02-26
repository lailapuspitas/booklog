const express = require("express");
const loginController = require("../controller/login-controller");
const loginRoute = express.Router();

loginRoute.post("/login", loginController.loginUser);

module.exports = { loginRoute };
