var mtd = require('mt-downloader');

url = system.args[1];
file = system.args[2];

var url = url;
var file = file;

var downloader = new mtd(file, url);

downloader.start();
