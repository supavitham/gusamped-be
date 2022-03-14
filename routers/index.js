const express = require("express");
const route = express.Router();

const auth = require("./auth/auth");
const user = require("./user")
const category = require("./category")
const categoryType = require("./category_type")
const subType = require("./sub_type")
const unitProduct = require("./unit_product")
const productMaster = require("./product_master")
const productGroup = require("./product_group")

route.use("/auth", auth);
route.use("/user", user);
route.use("/category", category);
route.use("/categoryType", categoryType);
route.use("/subType", subType);
route.use("/unitProduct", unitProduct);
route.use("/productMaster", productMaster);
route.use("/categorizeProduct", productGroup);

module.exports = route;

