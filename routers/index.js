const express = require("express");
const route = express.Router();

const auth = require("./auth/auth");
const user = require("./user")
const category = require("./category")
const type = require("./type_product")

route.use("/auth", auth);
route.use("/user", user);
route.use("/category", category);
route.use("/typeProduct", type);

module.exports = route;

