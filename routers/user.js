const express = require("express");
const route = express.Router();
const { body, validationResult } = require('express-validator');
const { getUser } = require('../controller/user_controller/user_controller')
const { authenticateAccessToken } = require('../middleware/authenticateToken')

route.get('/getUser',authenticateAccessToken, getUser)

module.exports = route;