

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
var checker = require('./routes/check');
var cookieParser = require('cookie-parser');
var mysql_module = require('./routes/mysql');

var mUrl;
var keyCount=0;
var user_data;

//WebPageTest Keys
var key = [
  "A.a66edbb10b50e156ebf63dccda3e938d", "A.cfbefb5968dacd324d3ce4426ff593ce",
  "A.81570d0c6da5ed737e21f766e7a89655", "A.4f498e8fdf15d820545af9a0ced88431","A.4c4149b53488c09ce7ee8f7e8cc637b6"
];

var app = express();

const HTTPS = "https://";
const H1_DOMAIN = "-h1.h2perf.org:1234/";
const H2_DOMAIN = "-h2.h2perf.org:12345/";

process.on('uncaughtException', function (err) {
  console.log("error");
  console.log('Caught exception: ' + err);
  if(err ==  "Error: No supported SPDY version") {
    checker.checkHttp2();
  } else if(err = "Error: connect ECONNREFUSED") {
    try {
      checker.sendFailMsg();
    } catch(e) {
      console.log(e.message);
    }
  }
});

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/Webpagetest', routes.Webpagetest);
app.get('/rank', routes.rank);
app.get('/contactus', routes.contactus);
app.get('/check_result', routes.check_result);
app.get('/progress_page', routes.progress_page);
app.get('/result', routes.result);
app.get('/mysql', routes.mysql);

app.post('/webpagetest',  function(req, res) {
  var domain = {
    http1 : req.params.http1,
    http2 : req.params.http2,
    status : req.params.status
  }

  wpt.run(key[keyCount++], domain, function(aResData) {
    console.log(key[keyCount++]);
    console.log(aResData);
    res.send(aResData);

  });
  if(keyCount >= 4)
      keyCount = 0;
});


app.get('/crawler', function(req, res) {
  var child = spawn("phantomjs", ["--ssl-protocol=any", "--ignore-ssl-errors=yes", "./routes/crawler.js",
    mUrl, user_data.path1]);

  var domain = {
    http1 : undefined,
    http2 : undefined,
    status : undefined
  }

  console.log("**user_data.path1 : "+user_data.path1);

  child.stdout.on("data", function (data) {
    console.log(data);
  });

  child.stderr.on("data", function (err,data) {
    console.log("Download Error : " + err);
  });

  child.on("exit", function (code) {
    domain.http1 = HTTPS+user_data.path1+H1_DOMAIN;
    domain.http2 = HTTPS+user_data.path1+H2_DOMAIN;
    domain.status = code;

    console.log("app:"+code);
    const SUCCESS = "0";
    const FAIL = "1";
    if(code == SUCCESS) {
      res.send(domain);
    } else {
      res.send(domain);
    }

  });

});
app.post('/tls', function(req, res) {
  //console.log(req.body.hostName);
  mUrl = req.body.hostName;
  checker.fillUrl(mUrl, res);
  checker.checkNPNproto();

  user_data = mysql_module.insert_sites(req.body.hostName);

});

mysql_module.start_connection();


http.createServer(app).listen(app.get('port'), function(){
    console.log("Start H2Perf.org Server!");
});

