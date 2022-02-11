const express = require("express");
const route = express.Router();
const { addSubType, updateSubType, getSubType } = require('../controller/sub_type.controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.post('', authenticateAccessToken, addSubType)
route.put('', authenticateAccessToken, updateSubType)
route.get('', authenticateAccessToken, getSubType)

module.exports = route;