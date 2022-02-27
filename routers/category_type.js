const express = require("express");
const route = express.Router();
const { addCategoryType, updateCategoryType, getCategoryType } = require('../controller/category_type_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addCategoryType)
route.put('', authenticateAccessToken, updateCategoryType)
route.get('', authenticateAccessToken, getCategoryType)

module.exports = route;