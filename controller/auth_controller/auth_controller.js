const { validationResult } = require("express-validator");
const { Sequelize, QueryTypes, Op } = require("sequelize");
const { DB } = require("../../database/gusamped.db");
const { Users } = require("../../model/user");
const bcrypt = require("bcrypt");
const { checkEmail } = require("../../utils/check_utils")

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, password, phoneNumber, firstName, lastName } = req.body;
        console.log("---------- registerUser controller ----------")

        let checkTableExist = await new Promise((resolve, reject) => {
            Users.count()
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    resolve(false)
                })
        });

        if(checkTableExist != false){
            const checkEmailRes = await checkEmail(email);
            if (checkEmailRes != null) throw 'email already exists'
    
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        await Users.sync(!checkTableExist || checkTableExist == 0 ? { force: true } : { alter: true })

        const resData = await Users.create({
            //id:3,
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        });

        res.status(200).json(resData);
        next();
    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

module.exports.loginController = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("---------- login controller ----------")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            throw errors
                .array()
                .reduce((p, c) => p + c.msg + " " + c.param + ", ", "");

        const checkEmailRes = await checkEmail(email);

        if (checkEmailRes == null) throw "Email or password is wrong!";
        
        const validPass = await bcrypt.compare(password, checkEmailRes.password);
        if (!validPass) throw "Password is incorrect!";

        next();

    } catch (error) {
        const err = Error(error);
        err.status = 400;
        next(err);
    }
}

// module.exports = (sequelize, DataTypes) => {
//     const Device = sequelize.define('Device', {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       imei: {
//         type: DataTypes.STRING,
//         field: 'imei',
//       },
//       brand: {
//         type: DataTypes.STRING,
//         field: 'brand',
//       },
//       status: {
//         type: DataTypes.STRING,
//         field: 'status',
//       },
//       lastUpdate: {
//         type: DataTypes.DATE,
//         field: 'last_update',
//       },
//       lastState: {
//         type: DataTypes.STRING,
//         field: 'last_state',
//       },
//       stateTime: {
//         type: DataTypes.DATE,
//         field: 'state_time',
//       },
//       ignitionOnTime: {
//         type: DataTypes.DATE,
//         field: 'ignition_on_time',
//       },
//       deviceModelId: {
//         type: DataTypes.INTEGER,
//         field: 'device_model_id',
//       },
//       // enginehourSecond: {
//       //   type: DataTypes.INTEGER,
//       //   field: 'enginehour_second',
//       // },
//       // contact: {
//       //   type: DataTypes.STRING,
//       // },
//     }, {
//       underscored: true,
//       freezeTableName: true,
//       tableName: 'device',
//       timestamps: false,
//     });
  
//     Device.associate = (Model) => {
//       Model.Device.hasOne(Model.Position, {
//         foreignKey: 'deviceId',
//         as: 'position',
//       });
//       Model.Device.hasOne(Model.Simcard, {
//         foreignKey: 'deviceId',
//         as: 'simcard',
//       });
//       Model.Device.hasOne(Model.FuelLevel, {
//         foreignKey: 'deviceId',
//         as: 'fuelLevel',
//       });
//       Model.Device.belongsTo(Model.DeviceModel, {
//         foreignKey: 'deviceModelId',
//         as: 'model',
//       });
//       // Model.Device.hasMany(Model.DeviceCustomAttributes, {
//       //   as: 'customAttributes',
//       //   foreignKey: 'deviceid',
//       // });
//     };
  
//     return Device;
//   };
  
//   module.exports = (sequelize, DataTypes) => {
//     const Position = sequelize.define('Position', {
//       deviceId: {
//         type: DataTypes.INTEGER,
//         field: 'device_id',
//         allowNull: false,
//         primaryKey: true,
//       },
//       protocol: {
//         type: DataTypes.STRING,
//         field: 'protocol',
//       },
//       serverTime: {
//         type: DataTypes.DATE,
//         field: 'server_time',
//       },
//       deviceTime: {
//         type: DataTypes.DATE,
//         field: 'device_time',
//       },
//       fixTime: {
//         type: DataTypes.DATE,
//         field: 'fix_time',
//       },
//       valid: {
//         type: DataTypes.BOOLEAN,
//         field: 'valid',
//       },
//       latitude: {
//         type: DataTypes.DOUBLE,
//         field: 'latitude',
//       },
//       longitude: {
//         type: DataTypes.DOUBLE,
//         field: 'longitude',
//       },
//       altitude: {
//         type: DataTypes.FLOAT,
//         field: 'altitude',
//       },
//       speed: {
//         type: DataTypes.FLOAT,
//         field: 'speed',
//       },
//       course: {
//         type: DataTypes.FLOAT,
//         field: 'course',
//       },
//       address: {
//         type: DataTypes.STRING,
//         field: 'address',
//       },
//       // positionAttributes: {
//       //   type: DataTypes.STRING,
//       //   field: 'attributes'
//       // },
//       accuracy: {
//         type: DataTypes.DOUBLE,
//         field: 'accuracy',
//       },
//       network: {
//         type: DataTypes.STRING,
//         field: 'network',
//       },
//       attributes: {
//         type: DataTypes.STRING,
//         field: 'attributes',
//         get() {
//           return JSON.parse(this.getDataValue('attributes'));
//         },
//         set(value) {
//           this.setDataValue('attributes', JSON.stringify(value));
//         },
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         field: 'created_date',
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         field: 'updated_date',
//       },
  
//     }, {
//       // underscored: true,
//       // freezeTableName: true,
//       timestamps: true,
//       tableName: 'position',
//     });
//     Position.associate = (Model) => {
//       Model.Position.belongsTo(Model.Device, {
//         foreignKey: 'deviceId',
//       });
//       Model.Position.belongsTo(Model.Asset, {
//         foreignKey: 'deviceId',
//       });
//       Model.Position.belongsTo(Model.Vehicle, {
//         foreignKey: 'deviceId',
//       });
//       Model.Position.belongsTo(Model.HeavyEquipment, {
//         foreignKey: 'deviceId',
//       });
//       // Model.Position.hasOne(Model.Fuel, {
//       //   foreignKey: 'position_id',
//       //   as: 'fuel',
//       // });
//     };
//     return Position;
//   };
  