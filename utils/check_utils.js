const { Sequelize, QueryTypes, Op } = require("sequelize");
const { Users } = require("../model/user_model");
const jwt = require("jsonwebtoken");

module.exports = {
    checkEmail: (email) => new Promise((resolve, rejects) => {
        Users.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        }).then(res => {
            resolve(res)
        }).catch(err => {
            rejects(err)
        })
    }),
    getUserFromToken: (token) => new Promise((resolve, rejects) => {
        try {

            const res = jwt.decode(token);

            return resolve(res.email)
        } catch (error) {
            return reject(error)
        }
    }),
}
