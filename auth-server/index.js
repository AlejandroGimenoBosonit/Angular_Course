// import express.js
const express = require('express');
// importing cors
const cors = require('cors');
// environment configuration
require('dotenv').config();
// database connection method
const { dbConnection } = require('./database/database-config');


// create express app
const app = express();

// database connection
dbConnection();

// Public Directory Middleware
app.use( express.static('./public') );
//cross-domain midleware
app.use( cors() );
// body-reading midleware
app.use( express.json() );
// routes applying middleware
app.use( '/api/auth', require('./routes/auth.routes'));



// listen to a port
const port = process.env.PORT;
app.listen(4000, ()=> console.log(`Server running at port ${ port }`));

/*
npm i -g nodemon
npm i 
    bcryptjs -> password encryption
    cors -> 'cross-domain' request
    dotenv -> environment variables
    express -> node server framework
    express-validator
    jsonwebtoken -> jwt
    mongoose -> DDBB connection
*/