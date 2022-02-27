const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class UnitProduct extends Model {
    static associate(models) {
        this.hasMany(models.ProductMaster, { foreignKey: 'unitID', as: 'product_master' });
    }
}

UnitProduct.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: false },
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
    tableName: 'unit_product',
    modelName: 'unit_product',
})

module.exports = { UnitProduct }