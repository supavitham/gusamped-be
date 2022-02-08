const express = require("express");
const route = express.Router();
const { addTypeProduct, updateTypeProduct, getTypeProduct } = require('../controller/type_product_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addTypeProduct)
route.put('', authenticateAccessToken, updateTypeProduct)
route.get('', authenticateAccessToken, getTypeProduct)

module.exports = route;