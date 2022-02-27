const express = require("express");
const route = express.Router();
const { addProductMaster, updateProductMaster, getProductMaster } = require('../controller/product_master_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addProductMaster)
route.put('', authenticateAccessToken, updateProductMaster)
route.get('', authenticateAccessToken, getProductMaster)

module.exports = route;