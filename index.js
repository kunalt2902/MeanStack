const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database.js');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser')

const port = 8080;


//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));
app.use('/authentication',authentication);


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