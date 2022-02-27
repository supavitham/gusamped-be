const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class ProductMaster extends Model {
    static associate(models) {
        this.belongsTo(models.UnitProduct, { foreignKey: 'unitID', as: 'unit_product' });
    }
}

ProductMaster.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: true },
    model: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    remark: { type: DataTypes.STRING, allowNull: true },
    unitID: { type: DataTypes.INTEGER, allowNull: true },
    //brandID: { type: DataTypes.INTEGER, allowNull: true },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DB.fn('NOW'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DB.fn('NOW'),
    },
}, {
    sequelize: DB,
    tableName: 'product_master',
    modelName: 'product_master',
})

module.exports = { ProductMaster }