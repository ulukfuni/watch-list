'use strict';
var express = require('express');
var app = express();
// var xray = require('x-ray')();
// var http = require('http')();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 8000);
console.log('Magic happens on port 8000');

// var arr = new Array();
// xray('http://www.rotoworld.com/log/nba/1967/anthony-davis', {
// 	playerName: 'h1',
// 	stats: xray('.statstable', ['.statstable:not(#cp1_ctl02_tblDepthCharts) tr td'])})(function(err, obj){
// 		var size = 22;
// 		for (var i=0; i<obj.stats.length; i+=size) {
// 			arr.push(obj.stats.slice(i,i+size));
// 		}

// });

// app.get('/data', function(req, res){
// 	res.send(arr);
// });

// app.get('/players', function(req, res){
// 	var options={
// 		host: 'https://www.stattleship.com',
// 		path: '/basketball/nba/players'
// 	};
// 	http.get(options, function(res){

// 	})
// });

exports = module.exports = app;