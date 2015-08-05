"use strict";
var downloader = require('./').download;

var mtd = downloader({
    uri: 'http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg',
    path: './Cat-Wallpaper.jpg'
}).start(function () {
    console.log('yeah')
});