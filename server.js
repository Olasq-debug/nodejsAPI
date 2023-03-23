const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logsEvents');
const verifyJWT = require('./middleware/verifyJWT');
const connDb = require('./config/connDb');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

connDb();

// middleware for log events
app.use(logger);

// built-in middleware for json
app.use(express.json());

//third party middleware for cookies
app.use(cookieParser());

// app routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/register', require('./routes/apis/register'));
app.use('/login', require('./routes/apis/login'));
app.use('/logout', require('./routes/apis/logout'));
app.use('/refresh', require('./routes/apis/refresh'));


//middleware for verifying JWT
app.use(verifyJWT)
app.use('/employees', require('./routes/apis/employees')) //route for employees that are verified by JWT


app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log("MongoDB is connected")
    // App listening on port 3500
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} ...`)
    })
});


