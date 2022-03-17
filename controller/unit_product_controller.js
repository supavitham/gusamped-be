const { UnitProduct } = require("../model/unit_product_model");
const { Sequelize, Op } = require("sequelize");

module.exports.addUnitProduct = async (req, res, next) => {
    try {
        const { nameTH, nameEN } = req.body;
        console.log("---------- addUnitProduct controller ----------")

        let checkTableExist = await new Promise((resolve, reject) => {
            UnitProduct.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        await UnitProduct.sync(!checkTableExist || checkTableExist == 0 ? { force: true } : { alter: true })

        const resData = await UnitProduct.create({
            nameTH: nameTH,
            nameEN: nameEN || null,
        });

        res.status(200).json({ message: "add unit product success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.updateUnitProduct = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { nameTH, nameEN } = req.body;
        console.log("---------- updateUnitProduct controller ----------")

        await UnitProduct.sync({ alter: true })

        const resData = await UnitProduct.update({
            nameTH: nameTH,
            nameEN: nameEN || null,

        }, { where: { id: id } });

        if (resData[0] == 1) {
            res.status(200).json({ message: "update unit product success" });
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

module.exports.getUnitProduct = async (req, res, next) => {
    try {
        const { search } = req.query;
        console.log("---------- getUnitProduct controller ----------", req.query)
        var resData;

        resData = await UnitProduct.findAll({
            where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("nameTH"), Sequelize.col("nameEN")), {
                [Op.iLike]: `%${search}%`,
            }),
            order: [
                ['id', 'ASC'] //DESC
            ]
        });

        res.status(200).json(resData);
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}