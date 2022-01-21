const { validationResult } = require("express-validator");
const { Sequelize, QueryTypes } = require("sequelize");
const  { Users } = require("../../model/user");

module.exports.getUser = async (req, res, next) => {
    console.log('...........11111');

    try{
        //await Sequelize.sync({ force: true });
        //await User.sync({force : true});
        const resData = await Users.findAll();
        //console.log("SSSSS ",resData);
        res.status(200).json(resData); 
        next();
    }catch(error){
        const err = Error(error);
        err.status = 400;
        next(err);
    }
} 

module.exports.registerUser = async (req,res,next) => {
    try{
        const { email, password, phoneNumber, firstName, lastName } = req.body;
        console.log("regis")

        const resData = await Users.create({
            //id:3,
            firstName:firstName,
            lastName:lastName,
            phoneNumber:phoneNumber,
            email:email,
            password:password
        });
        
        res.status(200).json(resData); 
        next();
    }catch(error){
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}