const express = require("express");
const route = express.Router();
const { addMerchant, getMerchant, updateMerchant } = require('../controller/merchant_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addMerchant)
route.get('', authenticateAccessToken, getMerchant)
route.put('', authenticateAccessToken, updateMerchant)

module.exports = route;