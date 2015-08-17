var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var http = require("http");
var https = require("https");
var url = require("url");
var URL = process.argv[2];
var filepath = process.argv[3];
var URLprotocal = url.parse(URL).protocol;

// this is for test
filepath = "./download/" + filepath;
if(filepath.lastIndexOf('/') != -1)
  mkdirp.sync(filepath.substring(0,filepath.lastIndexOf('/')));

var file = fs.createWriteStream(filepath);

var request = (URLprotocal=="https:"?https:http).get(URL, function(response) {
	console.log("Download Start - " + URL);
	response.pipe(file);
});
