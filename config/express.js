const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
const consign    = require('consign');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv/config')

module.exports = ()=>{
    const app = express();
    app.set('port', process.env.PORT || config.get('server.port'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    console.log(process.env.DATABASE_URL);

    //Endpoints
    consign({cwd:'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

    //Connetc to database
    mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
        console.log("Connected on databse");
    });

    return app;
}