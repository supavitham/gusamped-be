const { validationResult } = require("express-validator");
const { Sequelize, QueryTypes, Op } = require("sequelize");
const { DB } = require("../../database/gusamped.db");
const { Users } = require("../../model/user");
const bcrypt = require("bcrypt");
const { checkEmail } = require("../../utils/check_utils")

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, password, phoneNumber, firstName, lastName } = req.body;
        console.log("---------- registerUser controller ----------")

        const countRow = await Users.count();

        // const checkEmail = await Users.findOne({
        //     where: {
        //         email: {
        //             [Op.eq]: email
        //         }
        //     }
        // });

        const checkEmailRes = await checkEmail(email);

        if (checkEmailRes != null) throw 'email already exists'

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        await Users.sync(countRow == 0 ? { force: true } : { alter: true })

        const resData = await Users.create({
            //id:3,
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        });

        res.status(200).json(resData);
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.loginController = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("---------- login controller ----------")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            throw errors
                .array()
                .reduce((p, c) => p + c.msg + " " + c.param + ", ", "");

        const checkEmailRes = await checkEmail(email);

        if (checkEmailRes == null) throw "Email or password is wrong!";
        
        const validPass = await bcrypt.compare(password, checkEmailRes.password);
        if (!validPass) throw "Password is incorrect!";

        next();

    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}