const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class ProductGroup extends Model {
    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'fk_categoryID', targetKey: 'categoryID' });
        this.belongsTo(models.CategoryType, { foreignKey: 'fk_categoryTypeID', targetKey: 'categoryTypeID' });
        this.belongsTo(models.SubType, { foreignKey: 'fk_subTypeID', targetKey: 'subTypeID' });
        this.belongsTo(models.ProductMaster, { foreignKey: 'fk_product_mst_id', targetKey: 'product_mst_id' });
        this.belongsTo(models.Users, { foreignKey: 'fk_userID', targetKey: 'userID' });
    }
}

ProductGroup.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    categoryID: { type: DataTypes.INTEGER, allowNull: false },
    categoryTypeID: { type: DataTypes.INTEGER, allowNull: true },
    subTypeID: { type: DataTypes.INTEGER, allowNull: true },
    product_mst_id: { type: DataTypes.INTEGER, allowNull: false },
    userID: { type: DataTypes.UUID, allowNull: false },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DB.fn('NOW'),
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DB.fn('NOW'),
        allowNull: false
    },
}, {
    sequelize: DB,
    tableName: 'product_group',
    modelName: 'product_group',
})

module.exports = { ProductGroup }