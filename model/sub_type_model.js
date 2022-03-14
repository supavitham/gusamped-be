const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class SubType extends Model {
    static associate(models) {
        this.belongsTo(models.CategoryType, { foreignKey: 'categoryTypeID', as: 'category_type' });
        this.hasMany(models.ProductGroup, { foreignKey: 'subTypeID', as: 'product_group' });
    }
}

SubType.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nameTH: { type: DataTypes.STRING, allowNull: false },
    nameEN: { type: DataTypes.STRING, allowNull: true },
    categoryTypeID: { type: DataTypes.INTEGER, allowNull: true },
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
    tableName: 'sub_type',
    modelName: 'sub_type',
})

module.exports = { SubType }