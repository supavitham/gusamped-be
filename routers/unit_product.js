const express = require("express");
const route = express.Router();
const { addUnitProduct, getUnitProduct,updateUnitProduct } = require('../controller/unit_product_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addUnitProduct)
route.get('', authenticateAccessToken, getUnitProduct)
route.put('', authenticateAccessToken, updateUnitProduct)

module.exports = route;