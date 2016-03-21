'use strict';
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 8000);
console.log('Magic happens on port 8000');

exports = module.exports = app;