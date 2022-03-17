const express = require("express");
const route = express.Router();
const { addCategory, getCategory, updateCategory } = require('../controller/category_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addCategory)
route.get('', authenticateAccessToken, getCategory)
route.put('', authenticateAccessToken, updateCategory)

module.exports = route;