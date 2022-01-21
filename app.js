const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const routeApi = require("./routers/index");
const  {DB} = require('./database/gusamped.db')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', routeApi);

// DB.sequelize.sync({force : true}).then(() => {
//     console.log("Drop and re-sync db.");
// });

module.exports = app;