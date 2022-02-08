const { TypeProduct } = require("../model/type_product");
const { Sequelize, Op } = require("sequelize");

module.exports.addTypeProduct = async (req, res, next) => {
    try {
        const { nameTH, nameEN, categoryID } = req.body;
        console.log("---------- addTypeProduct controller ----------")

        let checkTablePromise = await new Promise((resolve, reject) => {
            TypeProduct.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        await TypeProduct.sync(!checkTablePromise || checkTablePromise == 0 ? { force: true } : { alter: true })

        const resData = await TypeProduct.create({
            nameTH: nameTH,
            nameEN: nameEN,
            categoryID: categoryID || null,
        });

        res.status(200).json({ message: "add type success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.updateTypeProduct = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { nameTH, nameEN, categoryID } = req.body;
        console.log("---------- updateTypeProduct controller ----------")

        await TypeProduct.sync({ alter: true })

        const resData = await TypeProduct.update({
            nameTH: nameTH,
            nameEN: nameEN,
            categoryID: categoryID || null,

        }, { where: { id: id } });
        res.status(200).json({ message: "update type success" });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.getTypeProduct = async (req, res, next) => {
    try {
        const { search, categoryID } = req.query;
        console.log("---------- getTypeProduct controller ----------", req.query)
        var resData;

        if (categoryID == null || categoryID == '') {

            resData = await TypeProduct.findAll({
                where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("nameTH"), Sequelize.col("nameEN")), {
                    [Op.iLike]: `%${search}%`,
                }),
                order: [
                    ['id', 'ASC'] //DESC
                ]
            });
        }
        else if ((search == null || search == '') && (categoryID != null || categoryID != '')) {
            resData = await TypeProduct.findAll({
                where: {
                    categoryID: {
                        [Op.eq]: categoryID
                    }
                },
                order: [
                    ['id', 'ASC']
                ]
            });
        }

        res.status(200).json(resData);
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}