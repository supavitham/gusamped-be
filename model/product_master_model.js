const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class ProductMaster extends Model {
    static associate(models) {
        this.hasMany(models.ProductGroup, { foreignKey: 'fk_product_mst_id', targetKey: 'product_mst_id' });
        this.belongsTo(models.UnitProduct, { foreignKey: 'fk_unitID', targetKey: 'unitID' });
        this.belongsTo(models.Users, { foreignKey: 'fk_userID', targetKey: 'userID' });
        this.belongsTo(models.Brands, { foreignKey: 'fk_brandID', targetKey: 'brandID' });
    }
}

ProductMaster.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.DOUBLE, allowNull: true },
    model: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    remark: { type: DataTypes.STRING, allowNull: true },
    unitID: { type: DataTypes.INTEGER, allowNull: true },
    brandID: { type: DataTypes.UUID, allowNull: false },
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
    tableName: 'product_master',
    modelName: 'product_master',
})

module.exports = { ProductMaster }