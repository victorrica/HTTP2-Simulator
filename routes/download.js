var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var http = require("http");
var https = require("https");
var request = require("request");

var options = JSON.parse(process.argv[2]);
var filepath = process.argv[3];
var path = process.argv[4];

var URLprotocal = options.port;

filepath = "/usr/local/nginx/html/" + path + "/" + filepath;

if(filepath.lastIndexOf('/') != -1)
  mkdirp.sync(filepath.substring(0,filepath.lastIndexOf('/')));

var file = fs.createWriteStream(filepath);

var req = (URLprotocal=="http"?https:http).request(options, function(response) {
	console.log("Download Start - " + options.hostname + options.path + "\n");
	response.pipe(file);
});

req.on('error', function(error) {
  console.log(error);
});

req.end();