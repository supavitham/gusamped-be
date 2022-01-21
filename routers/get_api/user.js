const express = require("express");
const route = express.Router();
const { body, validationResult } = require('express-validator');
const { getUser,registerUser } = require('../../controller/user_controller/user_controller')

route.get('/getUser',getUser)
route.post('/registerUser',registerUser)


module.exports = route;