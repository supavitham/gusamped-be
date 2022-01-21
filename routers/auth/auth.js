const express = require("express");
const route = express.Router();
const { body, validationResult } = require('express-validator');
const { registerUser } = require('../../controller/auth_controller/auth_controller')

route.post('/login',[
    body("email").notEmpty().isEmail(),
    body("password").trim().notEmpty().isLength({min: 8})
])

route.post('/registerUser',[
    body('email').trim().notEmpty().isEmail(),
    body('password').trim().isLength({min: 8}),
    body("phone").trim().notEmpty().isLength({min: 10, max: 10}),
    body("firstName").trim().notEmpty(),
    body("lastName").trim().notEmpty(),
], registerUser)

module.exports = route;

