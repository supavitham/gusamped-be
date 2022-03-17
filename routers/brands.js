const express = require("express");
const route = express.Router();
const { addBrands, updateBrands, getBrands } = require('../controller/brands_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addBrands)
route.put('', authenticateAccessToken, updateBrands)
route.get('', authenticateAccessToken, getBrands)

module.exports = route;