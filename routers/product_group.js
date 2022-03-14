const express = require("express");
const route = express.Router();
const { categorizeProduct, categorizeByProduct } = require('../controller/product_group_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, categorizeProduct)
route.get('/categorizeByProduct', authenticateAccessToken, categorizeByProduct)

module.exports = route;