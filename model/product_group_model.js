const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class ProductGroup extends Model {
    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'categoryID', as: 'category' });
        this.belongsTo(models.CategoryType, { foreignKey: 'categoryTypeID', as: 'category_type' });
        this.belongsTo(models.SubType, { foreignKey: 'subTypeID', as: 'sub_type' });
        this.belongsTo(models.ProductMaster, { foreignKey: 'product_mst_id', as: 'product_master' });
        this.belongsTo(models.Users, { foreignKey: 'userID', as: 'users' });
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