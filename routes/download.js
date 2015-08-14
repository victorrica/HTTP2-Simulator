var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var http = require("http");
var https = require("https");
var url = process.argv[2];
var filepath = process.argv[3];

// this is for test
filepath = "./download/" + filepath;

var file = fs.createWriteStream(filepath);

var request = http.get(url, function(response) {
	console.log("Download Start - " + url);
	response.pipe(file);
});
			
if(filepath.lastIndexOf('/') != -1)
	folder = filepath.substring(0,filepath.lastIndexOf('/'));

if(folder){
	mkdirp(folder);
}