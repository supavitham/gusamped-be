const { Category } = require("../model/category_model");
const { Sequelize, Op } = require("sequelize");

module.exports.addCategory = async (req, res, next) => {
    try {
        const { nameTH, nameEN } = req.body;
        console.log("---------- addCategory controller ----------")

        let checkTableExist = await new Promise((resolve, reject) => {
            Category.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        let token = req.headers['authorization'].split(' ')[1]

        var user = await getUserFromToken(token);
        var resUser = await checkEmail(user);

        await Category.sync(!checkTableExist || checkTableExist == 0 ? { force: true } : { alter: true })

        const resData = await Category.create({
            nameTH: nameTH,
            nameEN: nameEN || null,
            userID: resUser.id,
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

module.exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { nameTH, nameEN } = req.body;
        console.log("---------- updateCategory controller ----------")

        let token = req.headers['authorization'].split(' ')[1]

        var user = await getUserFromToken(token);
        var resUser = await checkEmail(user);

        await Category.sync({ alter: true })

        const resData = await Category.update({
            nameTH: nameTH,
            nameEN: nameEN || null,
            userID: resUser.id,

        }, { where: { id: id } });

        if (resData[0] == 1) {
            res.status(200).json({ message: "update category success" });
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