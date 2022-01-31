const express = require("express");
const route = express.Router();
const { body, validationResult } = require('express-validator');
const { registerUser, loginController } = require('../../controller/auth_controller/auth_controller')
const { generateToken } = require('../../utils/token_utils')
const { authenticateRefreshToken } = require('../../middleware/authenticateToken')

route.post('/login', [
    body("email").notEmpty().isEmail(),
    body("password").trim().notEmpty().isLength({ min: 10 })
], loginController,generateToken)

route.post('/registerUser', [
    body('email', 'not format email').trim().notEmpty().isEmail(),
    body('password', 'password min 10 length').trim().isLength({ min: 10 }),
    body("phoneNumber", 'password 10 length').trim().notEmpty().isLength({ min: 10, max: 10 }),
    body("firstName").trim(),
    body("lastName").trim(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}, registerUser)

route.post('/refreshToken',authenticateRefreshToken,generateToken)

module.exports = route;

