const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class CategoryType extends Model {

    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'fk_categoryID', targetKey: 'categoryID' });
        this.hasMany(models.SubType, { foreignKey: 'fk_categoryTypeID', targetKey: 'categoryTypeID' });
        this.hasMany(models.ProductGroup, { foreignKey: 'fk_categoryTypeID2', targetKey: 'categoryTypeID' });
    }
}

CategoryType.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: true },
    categoryID: { type: DataTypes.INTEGER, allowNull: true },
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
    tableName: 'category_type',
    modelName: 'category_type',
})

module.exports = { CategoryType }