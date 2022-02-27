const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class CategoryType extends Model {

    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'categoryID', as: 'category' });
        this.hasMany(models.SubType, { foreignKey: 'categoryTypeID', as: 'sub_type' });
    }
}

CategoryType.init({
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
    tableName: 'category_type',
    modelName: 'category_type',
})

// TypeProduct.associate = (models) => {
//     TypeProduct.belongsTo(models.Category, { foreignKey: 'categoryID', as: 'category' })
//     //Model.TypeProduct.hasMany(Model.Subtype, { foreignKey: 'categoryTypeID', as: 'sub_type' })
// }

module.exports = { CategoryType }