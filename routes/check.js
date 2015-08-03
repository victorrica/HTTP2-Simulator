//var Crawler = require("crawler");
var url = require("url");
var http = require('http');
var fs = require('fs');
var path = require("path");
/*var mtd = require('mt-downloader');
var htmlparser = require("htmlparser2");*/
var body,file,url = "https://patenthelper.kr";
var chunked = false;
var spdy = require('spdy');
var http = require('https');

var ERROR = '4';
var OK = '2';

var ajaxResponse  = {
	value : undefined,
	status : undefined
};
var version = {
	spdy : undefined,
	http2 : undefined
};

var mResponse = undefined;

var url = {
	spdy : undefined,
	http2 : undefined
};
/*

var options = {
	headers: {'Accept-Encoding' : 'gzip'},
};

var c = new Crawler({
	maxConnections : 100
});

c.queue([{
	uri: url,
	jQuery: false,
	callback: function (error, result) {
		parser.write(result.body);
	}
}]);

var parser = new htmlparser.Parser({
	onopentag: function(name, attribs){
		console.log("parser");
		// if( response code == 200 )
		file = "";
		if(name === "script" || name == "img"){
			file = attribs.src;
		}
		else if(name == "link"){
			file = attribs.href;
		}
		if(file!= undefined && file!="")
		{
			if(file.substring(0, 2) == "//")
			{
				if(url.substring(0, 4) == "http")
					file = "http:" + file;
				else if(url.substring(0, 5) == "https")
					file = "https:" + file;
			}
			if(!(file.indexOf("//") > -1))
			{
				if(file.substring(0, 2) == "./")
					file[0] = "";
				if(file.substring(0, 1) != "/")
					file = "/" + file;
				file = url + file;
			}

			/!*
			 var file = fs.createWriteStream("testfile/" + filename);
			 var request = http.get(file, function(response) {
			 console.log(response);
			 });
			 *!/
			filename = file.split("/");
			filename = filename[filename.length-1];

			Download(file,filename);
		}
	}
}, {decodeEntities: true});

function Download(url,filename)
{
	var file = "testfile/" + filename;

	console.log(file + "\n" + url + "\n");
	var downloader = new mtd(file, url,options);
	downloader.start();
}
*/

exports.sendFailMsg = function() {
	ajaxResponse.status = ERROR;
	ajaxResponse.value = "This site is not supported.";
	mResponse.send(ajaxResponse);
	ajaxResponse.status = undefined;
	ajaxResponse.value = undefined;
}

exports.checkHttp2 = function() {
	require('http2').get(url.http2, function(response) {
		version.http2 = response.httpVersion;

		if(version.spdy != undefined && (version.http2 == undefined || version.http2 == '1.1')) {
			console.log(version.spdy);
			ajaxResponse.status = OK;
			ajaxResponse.value = version.spdy;
			mResponse.send(ajaxResponse);
		} else {
			var resHttp2 = "http" + version.http2;
			console.log(resHttp2);
			ajaxResponse.status = OK;
			ajaxResponse.value = resHttp2;
			mResponse.send(ajaxResponse);
		}
		mResponse = undefined;
		version.spdy = undefined;
		version.http2 = undefined;
		ajaxResponse.status = undefined;
		ajaxResponse.value = undefined;
	});
}

exports.fillUrl = function(aUrl, aResponse){
	console.log(aUrl);
	mResponse = aResponse;
	url.http2 = aUrl;
	url.spdy = url.http2.substring(8, Buffer.byteLength(url.http2));
}
exports.checkSpdy = function() {
	console.log(spdy);
	var agent = spdy.createAgent({
		host: url.spdy,
		port: 443,

		// Optional SPDY options
		spdy: {
			plain: true,
			ssl: true
		}
	});
	http.get({
		host: url.spdy,
		agent: agent
	}, function(response) {
		version.spdy = response.req.agent._spdyState.socket.npnProtocol;
		agent.close();
		exports.checkHttp2();
	}).end();
}