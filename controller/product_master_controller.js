const { ProductMaster } = require("../model/product_master_model");
const { Sequelize, Op } = require("sequelize");

module.exports.addProductMaster = async (req, res, next) => {
    try {
        const { nameTH, nameEN, price, model, description, remark, unitID } = req.body;
        console.log("---------- addProductMaster controller ----------")

        let checkTableExist = await new Promise((resolve, reject) => {
            ProductMaster.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        await ProductMaster.sync(!checkTableExist || checkTableExist == 0 ? { force: true } : { alter: true })

        const resData = await ProductMaster.create({
            nameTH: nameTH,
            nameEN: nameEN,
            price: price || null,
            model: model || null,
            description: description || null,
            remark: remark || null,
            unitID: unitID || null
        });

        res.status(200).json({ message: "add product success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.updateProductMaster = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { nameTH, nameEN, price, model, description, remark, unitID } = req.body;
        console.log("---------- updateProductMaster controller ----------")

        await ProductMaster.sync({ alter: true })

        const resData = await ProductMaster.update({
            nameTH: nameTH,
            nameEN: nameEN,
            price: price || null,
            model: model || null,
            description: description || null,
            remark: remark || null,
            unitID: unitID || null

        }, { where: { id: id } });

        if (resData[0] == 1) {
            res.status(200).json({ message: "update product success" });
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

module.exports.getProductMaster = async (req, res, next) => {
    try {
        const { search } = req.query;
        console.log("---------- getProductMaster controller ----------", req.query)
        var resData;

        resData = await ProductMaster.findAll({
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