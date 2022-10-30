const express = require('express');

// RUTAS
const subjectRouter = require('./topic');

const indexRouter = express.Router();

function addRutas(app){

  app.use('/', indexRouter);
  app.use('/topic', subjectRouter);
}

indexRouter.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "msg": "Bienvenido a subject API que genera FakeData de prueba..." }));   
});
/*
// 404
indexRouter.use(function(req,res){
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
        "errorCode": "404",
        "msg" : "Resource not found!!!!.."
    }));   
});

// 500
indexRouter.use(function(req,res){
  res.status(500);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 
      "errorCode": "500",
      "msg" : "Ups...!!"
  }));   
});
*/
module.exports = {
  addRutas
};
