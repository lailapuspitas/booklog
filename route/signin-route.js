const express = require("express");
const signinController = require("../controller/signin-controller");
const signinRoute = express.Router();

signinRoute.get("/", signinController.getUser);
signinRoute.post("/", signinController.createUser);

module.exports = { signinRoute };
