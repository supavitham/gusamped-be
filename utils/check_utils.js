const { Sequelize, QueryTypes, Op } = require("sequelize");
const { Users } = require("../model/user_model");

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
}