const express = require("express");
const route = express.Router();
const { addCategory, getCategory } = require('../controller/category_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('/category', authenticateAccessToken, addCategory)
route.get('/category', authenticateAccessToken, getCategory)

module.exports = route;