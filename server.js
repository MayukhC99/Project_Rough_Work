const express = require('express');
const server = express();

//only use json or urlencoded for encryption
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/public',express.static(__dirname + '/public'));//public folder will contain all the html files
server.use('/styles',express.static(__dirname + '/styles'));
server.use('/scripts',express.static(__dirname + '/scripts'));


server.listen(5000);