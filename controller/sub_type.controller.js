const { SubType } = require("../model/sub_type");
const { Sequelize, Op } = require("sequelize");


module.exports.addSubType = async (req, res, next) => {
    try {
        const { nameTH, nameEN, typeProductID } = req.body;
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
            typeProductID: typeProductID || null,
        });

        res.status(200).json({ message: "add sub-type success", data: resData });
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
        const { nameTH, nameEN, typeProductID } = req.body;
        console.log("---------- updateSubType controller ----------")

        await SubType.sync({ alter: true })

        const resData = await SubType.update({
            nameTH: nameTH,
            nameEN: nameEN,
            typeProductID: typeProductID || null,

        }, { where: { id: id } });

        res.status(200).json({ message: "update sub-type success" });
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.getSubType = async (req, res, next) => {
    try {
        const { search, typeProductID } = req.query;
        console.log("---------- getSubType controller ----------", req.query)
        var resData;

        if (typeProductID == null || typeProductID == '') {

            resData = await SubType.findAll({
                where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("nameTH"), Sequelize.col("nameEN")), {
                    [Op.iLike]: `%${search}%`,
                }),
                order: [
                    ['id', 'ASC'] //DESC
                ]
            });
        }
        else if ((search == null || search == '') && (typeProductID != null || typeProductID != '')) {
            resData = await SubType.findAll({
                where: {
                    typeProductID: {
                        [Op.eq]: typeProductID
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