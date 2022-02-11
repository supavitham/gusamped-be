const { Category } = require("../model/category");
const { Sequelize, Op } = require("sequelize");

module.exports.addCategory = async (req, res, next) => {
    try {
        const { nameTH, nameEN } = req.body;
        console.log("---------- addCategory controller ----------")

        let checkTablePromise = await new Promise((resolve, reject) => {
            Category.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        await Category.sync(!checkTablePromise || checkTablePromise == 0 ? { force: true } : { alter: true })

        const resData = await Category.create({
            nameTH: nameTH,
            nameEN: nameEN,
        });

        res.status(200).json({ message: "add category success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.getCategory = async (req, res, next) => {
    try {
        // http://localhost:3000/api/category/?search=appetiz -> req.query
        // http://localhost:3000/api/category/appetiz -> req.params

        const { search } = req.query;
        console.log("---------- getCategory controller ----------")

        const resData = await Category.findAll({
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