const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class TypeProduct extends Model {

    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'categoryID', as: 'category' });
        this.hasMany(models.SubType, { foreignKey: 'typeProductID', as: 'sub_type' });
    }
}

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
    tableName: 'type_product',
    //schema: "gusamped_schema",
    modelName: 'type_product',
})

// TypeProduct.associate = (models) => {
//     TypeProduct.belongsTo(models.Category, { foreignKey: 'categoryID', as: 'category' })
//     //Model.TypeProduct.hasMany(Model.Subtype, { foreignKey: 'typeProductID', as: 'sub_type' })
// }

module.exports = { TypeProduct }