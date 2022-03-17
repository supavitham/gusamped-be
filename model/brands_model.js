const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db');
class Brands extends Model {

    static associate(models) {
        this.hasMany(models.ProductMaster, { foreignKey: 'fk_brandID', targetKey: 'brandID' });
        this.belongsTo(models.Users, { foreignKey: 'fk_userID', targetKey: 'userID' });
    }
}

Brands.init({
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
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
    tableName: 'brands',
    modelName: 'brands',
})

module.exports = { Brands }