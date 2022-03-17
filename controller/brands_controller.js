const { Brands } = require("../model/brands_model");
const { Sequelize, Op } = require("sequelize");
const { getUserFromToken, checkEmail } = require("../utils/check_utils")

module.exports.addBrands = async (req, res, next) => {
    try {
        const { nameTH, nameEN } = req.body;

        console.log("---------- addBrands controller ----------")

        let token = req.headers['authorization'].split(' ')[1]

        var user = await getUserFromToken(token);
        var resUser = await checkEmail(user);

        await Brands.sync({ alter: true })

        const resData = await Brands.create({
            nameTH: nameTH,
            nameEN: nameEN || null,
            userID: resUser.id,
        });

        res.status(200).json({ message: "add brands success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.getBrands = async (req, res, next) => {
    try {
        const { search } = req.query;
        console.log("---------- getBrands controller ----------")

        const resData = await Brands.findAll({
            where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("nameTH"), Sequelize.col("nameEN")), {
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

module.exports.updateBrands = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { nameTH, nameEN } = req.body;

        console.log("---------- updateBrands controller ----------")

        let token = req.headers['authorization'].split(' ')[1]

        var user = await getUserFromToken(token);
        var resUser = await checkEmail(user);

        await Brands.sync({ alter: true })

        const resData = await Brands.update({
            nameTH: nameTH,
            nameEN: nameEN || null,
            userID: resUser.id,
        }, { where: { id: id } });

        if (resData[0] == 1) {
            res.status(200).json({ message: "update brands success" });
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