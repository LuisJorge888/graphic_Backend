// .env file
require('dotenv').config();

// MODULOS
const express = require('express');
const bodyParser = require('body-parser')
const { generateNewValues } = require('./taks');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//  DATA BASE
const { testConection } = require('./database/conexion');
testConection();

//  MQTT
//const { client } = require('./mqtt');
//client.publish('1', 'new!!!')

//  RUTAS
const rutas = require('./routes/index');
rutas.addRutas(app);

//  TASK  
setInterval(generateNewValues, 2000, 'funky');


module.exports = app;