const { Model, DataTypes } = require('sequelize')
const { DB } = require('../database/gusamped.db')

class Users extends Model { }

Users.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: 'TIMESTAMP', defaultValue: DB.literal('CURRENT_TIMESTAMP'), allowNull: true, field: "created_at" },
    updatedAt: { type: 'TIMESTAMP', defaultValue: DB.literal('CURRENT_TIMESTAMP'), allowNull: true, field: "updated_at" },
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
    schema: "gusamped_schema"
});


module.exports = { Users };
