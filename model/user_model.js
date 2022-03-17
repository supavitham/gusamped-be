const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class Users extends Model {
    static associate(models) {
        this.hasOne(models.Merchant, { foreignKey: 'userID', as: 'merchant' });
        this.hasMany(models.Category, { foreignKey: 'userID', as: 'category' });
        this.hasMany(models.ProductMaster, { foreignKey: 'userID', as: 'product_master' });
        this.hasMany(models.ProductGroup, { foreignKey: 'userID', as: 'product_group' });
        this.hasMany(models.Brands, { foreignKey: 'userID', as: 'brands' });
    }
}

Users.init({
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
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
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!')
        }
    }
}, {
    sequelize: DB,
    tableName: 'users',
    modelName: 'users'
});

module.exports = { Users };
