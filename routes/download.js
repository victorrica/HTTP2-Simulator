var fs = require('fs');
var mkdirp = require('mkdirp');
var request = require("request");

var options = JSON.parse(process.argv[2]);
var filepath = process.argv[3];
var path = process.argv[4];

var URLprotocal = options.port;


filepath = "/usr/local/nginx/html/" + path + "/" + filepath;

if(filepath.lastIndexOf('/') != -1)
  mkdirp.sync(filepath.substring(0,filepath.lastIndexOf('/')));

var file = fs.createWriteStream(filepath);

request(options) .on('response', function(response) {
	if(response.statusCode == 200) {
		console.log("Download Start - " + options.url);
	}
}).pipe(file);
