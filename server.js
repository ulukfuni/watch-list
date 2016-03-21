'use strict';
var express = require('express');
var app = express();
var xray = require('x-ray')();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 8000);
console.log('Magic happens on port 8000');

xray('http://www.rotoworld.com/log/nba/1967/anthony-davis', '.statstable')(function(err, obj){
  console.log(obj);
});

exports = module.exports = app;