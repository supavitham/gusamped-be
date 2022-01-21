const { validationResult } = require("express-validator");
const { Sequelize, QueryTypes } = require("sequelize");
const { DB } = require("../../database/gusamped.db");

module.exports.registerUser = async (req, res, next) => {
    // console.log("KKKKKKKK" , req.body);
    // try {
    //     // const errors = validationResult(req);
    //     // if (!errors.isEmpty())
    //     //     throw errors
    //     //         .array()
    //     //         .reduce((p, c) => p + c.msg + " " + c.param + ", ", "");

    //     const { email, password, phone, firstName, lastName } = req.body;
         
    //     const result = await DB.query(
    //         `
    //            SELECT * FROM gusamped_schema.products_master
    //         `,{type: QueryTypes.SELECT}
    //       );
      
    //     console.log(">>>> ",result);
    //     res.json(result);
    //     next();
    
    // } catch (error) {
    //     const err = Error(error);
    //     err.status = 400;
    //     next(err);
    // }
} 