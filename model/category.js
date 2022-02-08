const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db');

class Category extends Model { }

Category.init({
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
    tableName: 'category',
    schema: "gusamped_schema",
})

Category.associations = (models) => {
    Category.hasMany(models.TypeProduct, { foreignKey: 'categoryID', as: 'type_product' })
}

module.exports = { Category }