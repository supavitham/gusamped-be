const { Sequelize } = require("sequelize");
const { development } = require("../config/config");
const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    port: development.port,
    dialect: development.dialect,
    timezone: "+07:00",
    logging: true,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connect database ${development.database} successful`);
  })
  .catch((err) => {
    console.error(
      `Unable to connect to the database ${development.database}:`,
      err
    );
  });


// sequelize.sync({ alter: true })
//   .then(function () {
//     console.log('All models were synchronized successfully.')
//   })
//   .catch(function (err) {
//     console.log('Connection Sequelize Error! : ' + err)
//   })
  
module.exports = { DB: sequelize };
