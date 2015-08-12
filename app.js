
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var checker = require('./routes/check');
var cookieParser = require('cookie-parser');
//var fs = require('fs');

var app = express();

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
app.set('port', process.env.PORT || 3000);
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


app.post('/check', function(req, res) {
  console.log(req.body.hostName);
  checker.fillUrl(req.body.hostName, res);
  checker.checkSpdy(function() {
    checker.checkHttp2();
  })
});


//Add by Kolnidur
app.post('/tls', function(req, res) {
  console.log(req.body.hostName);
  checker.fillUrl(req.body.hostName, res);
  checker.checkNPNproto();
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('HTTP2-Simulator server listening on port ' + app.get('port'));
});
