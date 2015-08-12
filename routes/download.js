var mtd = require('mt-downloader');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var http = require('http');

var url = process.argv[2];
var filepath = process.argv[3];
var stats,fileSize;

// this is for test

filepath = "./test/" + filepath;

var options = {
	count: 2,
	method: 'GET',
	port: 80,
	range: '0-100',
	onStart: function(meta) {
		console.log("Download Started :", url + " - " + filepath);		
	},
	onEnd: function(err, result) {
		stats = fs.statSync(filepath)
		fileSize = stats["size"];
		if(fileSize == 0)
		{
			console.log("Download Started [ ITS FUCKIN CHUNKED FILE. ] :", url + " - " + filepath);
			var file = fs.createWriteStream(filepath);
			var request = http.get(url, function(response) {
				response.pipe(file);
			});
		}
		
		else
			console.log("Download Complete :", url + " - " + filepath);
			
	}
};

if(filepath.lastIndexOf('/') != -1)
	folder = filepath.substring(0,filepath.lastIndexOf('/'));

if(folder){
	mkdirp(folder, function(err) { 
	   console.log(err);
	});
}

var downloader = new mtd(filepath, url,options);

downloader.start();