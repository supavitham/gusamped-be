const { ProductGroup } = require("../model/product_group_model");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const { DB } = require("../database/gusamped.db");

module.exports.categorizeProduct = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { categoryID, categoryTypeID, subTypeID, product_mst_id } = req.body;
        console.log("---------- categorize product controller ----------")

        if ((categoryID == null || categoryID == '') || (product_mst_id == null || product_mst_id == '')) {

            throw 'categoryID and product_mst_id not null';
        }

        var resData;

        if (id == null || id == '') {

            let checkTableExist = await new Promise((resolve, reject) => {
                ProductGroup.count()
                    .then(res => {
                        resolve(res)
                    }).catch(err => {
                        resolve(false)
                    })
            });

            await ProductGroup.sync(!checkTableExist || checkTableExist == 0 ? { force: true } : { alter: true })

            resData = await ProductGroup.create({
                categoryID: categoryID,
                categoryTypeID: categoryTypeID || null,
                subTypeID: subTypeID || null,
                product_mst_id: product_mst_id,
            });
            res.status(200).json({ message: "add categorize product success", data: resData });

        } else {

            await ProductGroup.sync({ alter: true })

            resData = await ProductGroup.update({
                categoryID: categoryID,
                categoryTypeID: categoryTypeID || null,
                subTypeID: subTypeID || null,
                product_mst_id: product_mst_id,
            }, { where: { id: id } });

            if (resData[0] == 1) {
                res.status(200).json({ message: "update categorize product success" });
            } else if (resData[0] == 0) {
                throw `can't find id ${id}`;
            }
        }

        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.categorizeByProduct = async (req, res, next) => {
    try {
        const { productID } = req.query;
        console.log("---------- getCategorizeProduct controller ----------", req.query)

        const result = await DB.query(
            `
                select c.id as "categoryID", c."nameTH" as "categoryNameTH", c."nameEN" as "categoryNameEN",
                ct.id  as "categoryTypeID", ct."nameTH" as "categoryTypeNameTH", ct."nameEN" as "categoryTypeNameEN",
                st.id  as "subTypeID", st."nameTH" as "subTypeNameTH", st."nameEN" as "subTypeNameEN"
                from product_group pg 
                left  join category c on c.id  = pg."categoryID" 
                left join category_type ct on  ct.id  = pg."categoryTypeID" 
                left join sub_type st on st.id  = pg."subTypeID" 
                where pg.product_mst_id  = :p_product_mst_id
            
            `,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    p_product_mst_id: productID,
                },

            }
        );

        res.status(200).json(result);
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}