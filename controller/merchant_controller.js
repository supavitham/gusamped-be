const { Merchant } = require("../model/merchant_model");
const { Sequelize, Op } = require("sequelize");
const { getUserFromToken, checkEmail } = require("../utils/check_utils")

module.exports.addMerchant = async (req, res, next) => {
    try {
        const {
            name,
            outlet_name,
            address,
            sub_district,
            district,
            province,
            postcode,
        } = req.body;
        console.log("---------- addMerchant controller ----------")

        let token = req.headers['authorization'].split(' ')[1]

        var user = await getUserFromToken(token);
        var resUser = await checkEmail(user);

        await Merchant.sync({ alter: true })

        const resData = await Merchant.create({
            name: name,
            outlet_name: outlet_name || null,
            address: address,
            sub_district: sub_district,
            district: district,
            province: province,
            postcode: postcode,
            userID: resUser.id,
        });

        res.status(200).json({ message: "add merchant success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.getMerchant = async (req, res, next) => {
    try {
        const { search } = req.query;
        console.log("---------- getMerchant controller ----------")

        const resData = await Merchant.findAll({
            where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("name"), Sequelize.col("outlet_name")), {
                [Op.iLike]: `%${search}%`,
            })
        });

        res.status(200).json(resData);
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.updateMerchant = async (req, res, next) => {
    try {
        const { id } = req.query;
        const {
            name,
            outlet_name,
            address,
            sub_district,
            district,
            province,
            postcode,
        } = req.body;
        console.log("---------- updateMerchant controller ----------")

        let token = req.headers['authorization'].split(' ')[1]

        var user = await getUserFromToken(token);
        var resUser = await checkEmail(user);

        await Merchant.sync({ alter: true })

        const resData = await Merchant.update({
            name: name,
            outlet_name: outlet_name || null,
            address: address,
            sub_district: sub_district,
            district: district,
            province: province,
            postcode: postcode,
            userID: resUser.id,
        }, { where: { id: id } });

        if (resData[0] == 1) {
            res.status(200).json({ message: "update merchant success" });
        } else if (resData[0] == 0) {
            throw `can't find id ${id}`;
        }

        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}