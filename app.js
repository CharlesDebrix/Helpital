// HELPITAL //

const http = require('http');
var url = require('url');
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static(__dirname+"/public"));

app.listen(port);

app.get('/agent', function(req, res) {
    console.log('agent page requested');
    res.sendFile(path.join(__dirname+'/public/src/views/agent.html'));
});

app.get('/chief', function(req, res) {
    console.log('chief page requested');
    res.sendFile(path.join(__dirname+'/public/src/views/chief.html'));
});

// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});