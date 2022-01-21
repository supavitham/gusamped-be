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


// sequelize.sync({ force: true })
//   .then(function () {
//     console.log('Connected Success')
//   })
//   .catch(function (err) {
//     console.log('Connection Sequelize Error! : ' + err)
//   })
module.exports = { DB: sequelize };
