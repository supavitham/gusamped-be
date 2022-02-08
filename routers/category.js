const express = require("express");
const route = express.Router();
const { addCategory, getCategory } = require('../controller/category_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addCategory)
route.get('', authenticateAccessToken, getCategory)

module.exports = route;