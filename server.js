'use strict';
var express = require('express');
var app = express();
var xray = require('x-ray')();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 8000);
console.log('Magic happens on port 8000');

xray('http://www.rotoworld.com/log/nba/1967/anthony-davis', {
	playerName: 'h1',
	stats: xray('.statstable', ['.statstable:not(#cp1_ctl02_tblDepthCharts) tr td'])})(function(err, obj){
  console.log(obj);
}).write('results.json');

exports = module.exports = app;