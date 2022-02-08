const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')
const { Category } = require('./category')

class TypeProduct extends Model { }

TypeProduct.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: false },
    categoryID: { type: DataTypes.INTEGER, allowNull: true },
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
    tableName: 'typeProduct',
    schema: "gusamped_schema",
})

TypeProduct.belongsTo(Category);

module.exports = { TypeProduct }