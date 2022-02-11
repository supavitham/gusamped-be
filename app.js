const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const routeApi = require("./routers/index");

/// Middleware
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', routeApi);

// DB.sequelize.sync({force : true}).then(() => {
//     console.log("Drop and re-sync db.");
// });

// error handler
app.use(errorHandler);

module.exports = app;