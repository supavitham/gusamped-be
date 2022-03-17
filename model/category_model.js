const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db');
class Category extends Model {

    static associate(models) {
        this.hasMany(models.CategoryType, { foreignKey: 'categoryID', as: 'category_type' });
        this.hasMany(models.ProductGroup, { foreignKey: 'categoryID', as: 'product_group' });
        this.belongsTo(models.Users, { foreignKey: 'userID', as: 'users' });
    }
}

Category.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: true },
    userID: { type: DataTypes.UUID, allowNull: false },
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
    tableName: 'category',
    modelName: 'category',
})

// Category.associate = (models) => {
//     Category.hasMany(models.CategoryType, { foreignKey: 'categoryID', as: 'category_type' })
//     //Category.hasMany(models.ProductGroup, { foreignKey: 'categoryID', as: 'product_group' })
// }

module.exports = { Category }