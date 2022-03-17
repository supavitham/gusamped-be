const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class UnitProduct extends Model {
    static associate(models) {
        this.hasMany(models.ProductMaster, { foreignKey: 'fk_unitID', targetKey: 'unitID' });
    }
}

UnitProduct.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: true },
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
    tableName: 'unit_product',
    modelName: 'unit_product',
})

module.exports = { UnitProduct }