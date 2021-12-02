require('dotenv').config();

const bcrypt = require('bcrypt');

// Setting up mongoose to connect with th DB:
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION);
mongoose.connection.on('connected', ()=> {
    console.log('Connection established! =^.^=');
});

mongoose.connection.on("error", console.error);



/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const OrdersRouter = require('./routes/orders');
const cors = require("./middleware/cors");


/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));


/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);


/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/orders', OrdersRouter);


/** EXPORT PATH */
module.exports = app;
