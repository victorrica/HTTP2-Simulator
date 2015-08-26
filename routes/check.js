
var url = require("url");
var http = require('http');
var fs = require('fs');
var path = require("path");
var body,file,url = "https://patenthelper.kr";
var spdy = require('spdy');
var util = require('util');
var http = require('https');
var tls = require('tls');

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

//var mSocket = undefined;

//var url = {
//	spdy : undefined,
//	http2 : undefined
//};

//var sendFailMsg = function() {
//	ajaxResponse.status = ERROR;
//	mSocket.emit("result",ajaxResponse);
//	ajaxResponse.status = undefined;
//	ajaxResponse.value = undefined;
//}

//var checkHttp2 = function() {
//	require('http2').get(url.http2, function(response) {
//		version.http2 = response.httpVersion;
//
//
//		if(version.spdy != undefined && (version.http2 == undefined || version.http2 == '1.1')) {
//			ajaxResponse.status = OK;
//			ajaxResponse.value = version.spdy;
//			mSocket.emit("result",ajaxResponse);
//		} else {
//			var resHttp2 = "http" + version.http2;
//			ajaxResponse.status = OK;
//			ajaxResponse.value = resHttp2;
//			mSocket.emit("result",ajaxResponse);
//		}
//		mSocket = undefined;
//		version.spdy = undefined;
//		version.http2 = undefined;
//		ajaxResponse.status = undefined;
//		ajaxResponse.value = undefined;
//	});
//}
exports.startCheck = function(arg, aUrl, aSocket, callback) {
	var url = {
		spdy : undefined,
		http2 : undefined
	};
	console.log("url : " + aUrl);
	url.http2 = aUrl;
	url.spdy = aUrl.substring(8, Buffer.byteLength(aUrl));
	console.log("spdy : "+url.spdy);
	console.log("http2 : " + url.http2);
	if(arg == '1') {
        notHTTPS(aSocket, callback);
	}
	else if(arg == '2') {
		console.log("aUrl",+url);
		checkNPNproto(aSocket, url, callback);
	}
	else if(arg == '3') {
		wronghost(aSocket);
	}
}

var fillUrl = function(aUrl) {
	var url = {
		spdy : undefined,
		http2 : undefined
	};
	//console.log(aUrl);


	return url;
}

//Protocol Check using TLS extensions NPN protocol
var checkNPNproto = function(aSocket, aUrl, callback){
	var port = 443;
	var host = aUrl.spdy;


	if(host.charAt(host.length-1)=='/'){
		host = host.substring(0,host.length-1);

	}
	var options = {
		// Chain of certificate autorities
		// Client and server have these to authenticate keys
		ca: [
			fs.readFileSync('public/ssl/root-cert.pem'),
			fs.readFileSync('public/ssl/ca1-cert.pem'),
			fs.readFileSync('public/ssl/ca2-cert.pem'),
			fs.readFileSync('public/ssl/ca3-cert.pem'),
			fs.readFileSync('public/ssl/ca4-cert.pem')
		],
		// Private key of the client
		key: fs.readFileSync('public/ssl/agent2-key.pem'),
		// Public key of the client (certificate key)
		cert: fs.readFileSync('public/ssl/agent2-cert.pem'),
		NPNProtocols: ['h2', 'spdy/1', 'spdy/2', 'spdy/3', 'spdy/3.1'],
		// Automatically reject clients with invalid certificates.
		rejectUnauthorized: false             // Set false to see what happens.
	};

	var socket = tls.connect(port, host, options, function () {
		//console.log(host);
		var npn = 'HTTP/1#http1';
		console.log('check host name : '+host);
		console.log('npn data : ' + this.npnProtocol);
		if(this.npnProtocol == 'h2')  {
			npn = 'HTTP/2(npn)#http2';
		}
		else if(this.npnProtocol == undefined){
			npn='HTTP/2(ALPN)#http2';
			require('http2').get(host, function(response) {
				npn='HTTP/';
				npn += util.inspect(response.httpVersion);

			});
		}
		else if(this.npnProtocol != false) {
			if(/spdy\/[0-9\.]+/.test(this.npnProtocol)) {
				npn = this.npnProtocol+'#http2';
			}
		}

		var ajax_message = npn;
		console.log('This host using '+npn+'(origin : '+this.npnProtocol+')');
		console.log('ajax_message' + ajax_message);
		console.log('sockId' + aSocket.id);
		aSocket.emit("result", ajax_message);
		callback();
	});

	socket.on('error', function(error) {

		//var result_check;

		//var agent = spdy.createAgent({
		//	host: url.spdy,
		//	port: 443,
        //
		//	// Optional SPDY options
		//	//spdy: {
		//	//	plain: true,
		//	//	ssl: true
		//	//}
		//});

		//http.get({
		//	host: url.spdy,
		//	agent: agent
		//}, function(response) {
		//	result_check = response.req.agent._spdyState.socket.npnProtocol;
		//	console.log(response);
		//	agent.close();
		//	//exports.checkHttp2();
		//}).end();
		//console.log("spdy_check");
		//console.log(result_check);
		//console.log("This host not support TSL connection or wrong host name");
		aSocket.emit("result",'Wrong SSL#http2');

	})

}
var notHTTPS = function(aSocket, callback){
    aSocket.emit("result","HTTP/1.1(Not SSL)#http1");
      callback();
}

var wronghost = function(){
    aSocket.emit("result","Wrong Host#http2");
}
