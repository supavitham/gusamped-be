const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class Users extends Model {

    static associate(models) {
        this.hasOne(models.Merchant, { foreignKey: 'fk_userID', targetKey: 'userID' });
        this.hasMany(models.Category, { foreignKey: 'fk_userID2', targetKey: 'userID' });
        this.hasMany(models.ProductMaster, { foreignKey: 'fk_userID3', targetKey: 'userID' });
        this.hasMany(models.ProductGroup, { foreignKey: 'fk_userID4', targetKey: 'userID' });
        this.hasMany(models.Brands, { foreignKey: 'fk_userID5', targetKey: 'userID' });
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
