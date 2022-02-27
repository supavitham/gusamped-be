const { SubType } = require("../model/sub_type_model");
const { Sequelize, Op } = require("sequelize");


module.exports.addSubType = async (req, res, next) => {
    try {
        const { nameTH, nameEN, categoryTypeID } = req.body;
        console.log("---------- addSubType controller ----------")

        let checkTableExist = await new Promise((resolve, reject) => {
            SubType.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        await SubType.sync(!checkTableExist || checkTableExist == 0 ? { force: true } : { alter: true })

        const resData = await SubType.create({
            nameTH: nameTH,
            nameEN: nameEN,
            categoryTypeID: categoryTypeID || null,
        });

        res.status(200).json({ message: "add sub type success", data: resData });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.updateSubType = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { nameTH, nameEN, categoryTypeID } = req.body;
        console.log("---------- updateSubType controller ----------")

        await SubType.sync({ alter: true })

        const resData = await SubType.update({
            nameTH: nameTH,
            nameEN: nameEN,
            categoryTypeID: categoryTypeID || null,

        }, { where: { id: id } });

        if (resData[0] == 1) {
            res.status(200).json({ message: "update sub type success" });
        } else if (resData[0] == 0) {
            throw `can't find id ${id}`;
        }

        res.status(200).json({ message: "update sub type success" });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.getSubType = async (req, res, next) => {
    try {
        const { search, categoryTypeID } = req.query;
        console.log("---------- getSubType controller ----------", req.query)
        var resData;

        if (categoryTypeID == null || categoryTypeID == '') {

            resData = await SubType.findAll({
                where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("nameTH"), Sequelize.col("nameEN")), {
                    [Op.iLike]: `%${search}%`,
                }),
                order: [
                    ['id', 'ASC'] //DESC
                ]
            });
        }
        else if ((search == null || search == '') && (categoryTypeID != null || categoryTypeID != '')) {
            resData = await SubType.findAll({
                where: {
                    categoryTypeID: {
                        [Op.eq]: categoryTypeID
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