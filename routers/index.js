const express = require("express");
const route = express.Router();

const auth = require("./auth/auth");
const user = require("./get_api/user")

route.use("/auth", auth);
route.use("/user", user);


module.exports = route;

