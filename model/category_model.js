const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db');
class Category extends Model {

    static associate(models) {
        this.hasMany(models.CategoryType, { foreignKey: 'fk_categoryID', targetKey: 'categoryID' });
        this.hasMany(models.ProductGroup, { foreignKey: 'fk_categoryID2', targetKey: 'categoryID' });
        this.belongsTo(models.Users, { foreignKey: 'fk_userID', targetKey: 'userID' });
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