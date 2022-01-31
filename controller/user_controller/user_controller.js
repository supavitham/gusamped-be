const { validationResult } = require("express-validator");
const { Sequelize, QueryTypes } = require("sequelize");
const { Users } = require("../../model/user");

module.exports.getUser = async (req, res, next) => {
    console.log('...........11111');

    try {
        const resData = await Users.findAll();
        res.status(200).json(resData);
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}