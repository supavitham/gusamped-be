const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class SubType extends Model {
    static associate(models) {
        this.belongsTo(models.TypeProduct, { foreignKey: 'typeProductID', as: 'type_product' });
    }
}

SubType.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: false },
    typeProductID: { type: DataTypes.INTEGER, allowNull: true },
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
    tableName: 'sub_type',
    //schema: "gusamped_schema",
    modelName: 'sub_type',
})

module.exports = { SubType }