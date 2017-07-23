const express = require('express');
const app = express();
const mongoose = require('mongoose');
var config = require('./config/database.js');
var path = require('path');

const port = 8080;

app.use(express.static(__dirname + '/client/dist'));

mongoose.connect(config.uri,(err) => {
	if(err)
		console.log(err)
	else
		console.log("CONNECTED TO THE DATABASE: "+config.db);
})

app.get('/',(req,res,next) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'));
})

app.listen(port,(err) => {
	if(err)
		console.log(err);
	else
		console.log("SERVER STARTED ON PORT: "+port);
})