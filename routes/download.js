var mtd = require('mt-downloader');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var url = process.argv[2];
var file = process.argv[3];


if(file.lastIndexOf('/') != -1)
	folder = file.substring(0,file.lastIndexOf('/'));

if(folder){
	mkdirp("./test/" + folder, function(err) { 
	   console.log(err);
	});
}

var downloader = new mtd("./test/" + file, url);

downloader.start();