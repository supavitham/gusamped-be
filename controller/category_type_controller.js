const { CategoryType } = require("../model/category_type_model");
const { Sequelize, Op } = require("sequelize");

module.exports.addCategoryType = async (req, res, next) => {
    try {
        const { nameTH, nameEN, categoryID } = req.body;
        console.log("---------- addCategoryType controller ----------")

        let checkTableExist = await new Promise((resolve, reject) => {
            CategoryType.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        await CategoryType.sync(!checkTableExist || checkTableExist == 0 ? { force: true } : { alter: true })

        const resData = await CategoryType.create({
            nameTH: nameTH,
            nameEN: nameEN,
            categoryID: categoryID || null,
        });

        res.status(200).json({ message: "add category type success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.updateCategoryType = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { nameTH, nameEN, categoryID } = req.body;
        console.log("---------- updateCategoryType controller ----------")

        await CategoryType.sync({ alter: true })

        const resData = await CategoryType.update({
            nameTH: nameTH,
            nameEN: nameEN,
            categoryID: categoryID || null,

        }, { where: { id: id } });

        if (resData[0] == 1) {
            res.status(200).json({ message: "update category type success" });
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

module.exports.getCategoryType = async (req, res, next) => {
    try {
        const { search, categoryID } = req.query;
        console.log("---------- getCategoryType controller ----------", req.query)
        var resData;

        if (categoryID == null || categoryID == '') {

            resData = await CategoryType.findAll({
                where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("nameTH"), Sequelize.col("nameEN")), {
                    [Op.iLike]: `%${search}%`,
                }),
                order: [
                    ['id', 'ASC'] //DESC
                ]
            });
        }
        else if ((search == null || search == '') && (categoryID != null || categoryID != '')) {
            resData = await CategoryType.findAll({
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