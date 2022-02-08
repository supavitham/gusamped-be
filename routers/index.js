const express = require("express");
const route = express.Router();

const auth = require("./auth/auth");
const user = require("./user")
const category = require("./category")

route.use("/auth", auth);
route.use("/user", user);
route.use("/",category);

module.exports = route;

