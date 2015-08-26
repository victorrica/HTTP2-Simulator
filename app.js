/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var childProcess = require("child_process");
var spawn = childProcess.spawn;
var wpt = require('./routes/webpagetest');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var mysql_module = require('./routes/mysql');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var async = require('async');
var timeout = express.timeout;
//var mUrl;
keyCount=0;
//var user_data;

//WebPageTest Keys
var key = [
   "A.4f498e8fdf15d820545af9a0ced88431", "A.4c4149b53488c09ce7ee8f7e8cc637b6", "A.81570d0c6da5ed737e21f766e7a89655", "A.cfbefb5968dacd324d3ce4426ff593ce",
   "A.a66edbb10b50e156ebf63dccda3e938d"
];


var client = {
  socketid : undefined,
  crawler : undefined
};

const HTTPS = "https://";
const H1_DOMAIN = "-h1.h2perf.org:1234/";
const H2_DOMAIN = "-h2.h2perf.org:12345/";

process.on('uncaughtException', function (err) {
  console.log("error");
  console.log('Caught exception: ' + err);

});

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon("public/images/favicon.ico"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(timeout(260000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/Webpagetest', routes.Webpagetest);
app.get('/contactus', routes.contactus);
app.get('/progress_page', routes.progress_page);
app.get('/check_result', routes.check_result);
app.get('/check_result_http2', routes.check_result_http2);
app.get('/mysql', routes.mysql);

var startCrawler = function(aSocket, callback, aUser_data, aUrl) {
  console.log(aUrl);
  var child = spawn("phantomjs", ["--ssl-protocol=any", "--ignore-ssl-errors=yes", "--web-security=no", "./routes/crawler.js",
    aUrl, aUser_data.path1]);

  var domain = {
    http1 : undefined,
    http2 : undefined,
    status : undefined,
    path1 : undefined
  }

  console.log("**user_data.path1 : "+aUser_data.path1);

  child.stdout.on("data", function (data) {
    var cleanData = data.toString("utf8");
    aSocket.emit("state", 'download+'+cleanData);
    console.log(cleanData);
  });

  child.stderr.on("data", function (err,data) {
    console.log("Download Error : " + err);
  });

  child.on("exit", function (code) {
    domain.http1 = HTTPS+aUser_data.path1+H1_DOMAIN;
    domain.http2 = HTTPS+aUser_data.path1+H2_DOMAIN;
    domain.path1 = aUser_data.path1;
    domain.status = code;

    console.log("app:"+code);
    const SUCCESS = "0";
    const FAIL = "1";
    if(code == SUCCESS) {
      callback(domain);
    }
  });
}

app.get('/rank', function(request, response){
  mysql_module.getTopPerformanceData(function(data){
    console.log(data);
    response.render('rank',{data:data});
  });
});

app.post('/mail', function(request,response){

	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'somah2simulator@gmail.com',
	        pass: 'soma123123!'
	    }
	});

	var mailOptions = {
	    from: request.body.name + ' <SomaH2Simulator@gmail.com>',
	    to: 'SomaH2Simulator@gmail.com',
	    subject: 'HTTP/2 Simulator Service Feedback - ' + request.body.subject,
	    text: request.body.message,
	    html: '<b>' + request.body.message + '</b>'
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
	response.send("<script>alert('Thank you for the feedback.');location.href='/';</script>");
});

app.get('/result/:path2', function(request, response) {

  var path2 = request.params.path2;
  var site_idx,site_url;
  async.series([
    function(callback) {
      mysql_module.findIdxByPath2(path2, function(data) {
        site_idx = data.idx;
        site_url = data.url;
        callback(null);
      });
    },
    function(callback) {
      mysql_module.findResultdataByIdx(site_idx,function(data){
        response.render('result', {
          url : site_url,
          compare_url : data[0].compare_url,
          graph_url : data[0].graph_url,
          h1_waterfall_url : data[0].h1_waterfall_url,
          h2_waterfall_url : data[0].h2_waterfall_url,
          http1_time : data[0].http1_time,
          http2_time : data[0].http2_time,
          performance : data[0].performance
        });
        callback(null);
      });
    }
  ], function(error, result) {
  });
});


mysql_module.start_connection();

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Start H2Perf.org Server!");
});
//var mId;
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
  //mId = socket.id;
  var url;
  var user_data;
  var checker = require('./routes/check');
  socket.on('crawler', function (data) {
    var domain;
    async.series([
      function(callback) {
        socket.emit('state',"crawling");
        startCrawler(socket, function(aDomain) {
          domain = aDomain;
          callback(null, aDomain);
        }, user_data, url);
        callback(null);
      },
      function(callback) {
        socket.emit('state',"wpt");
        wpt.startWpt(domain, function() {
          socket.emit('state',"redirect"+user_data.path2);
          callback(null);
        });
      },
    ], function(error, result) {

    });
  });
  socket.on('tls', function (data) {
    url = data;
    console.log("url" + data);
    var ssl_exist_array =
        url.split(':');
    var ssl_exist =
        ssl_exist_array[0];
    var res;
    if(ssl_exist.toUpperCase()=="HTTP")
      res = '1';
    else if(ssl_exist.toUpperCase()=="HTTPS")
      res = '2';
    else
      res = '3';

    console.log(res);
    async.series([
      function(callback) {
        checker.startCheck(res, url, socket, function () {
          callback(null);
        });
      }, function(callback) {
        user_data = mysql_module.insert_sites(url, function () {
          callback(null);
        });
      },
    ])
  });
});
