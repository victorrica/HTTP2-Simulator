
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var wpt = require('./routes/webpagetest');
var bodyParser = require('body-parser');
var checker = require('./routes/check');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var crypto = require('crypto');
var url_module = require('url');


var date_utils = require('date-utils');

//console.log(date);

var keyCount=0;

var key = [
  "A.a66edbb10b50e156ebf63dccda3e938d", "A.cfbefb5968dacd324d3ce4426ff593ce",
  "A.81570d0c6da5ed737e21f766e7a89655", "A.4f498e8fdf15d820545af9a0ced88431","A.4c4149b53488c09ce7ee8f7e8cc637b6"
];

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


var connection = mysql.createConnection({
  host    :'localhost',
  port : 3306,
  user : 'root',
  password : 'soma123123!',
  database:'HTTP2Simulator'
});


function randomValueHex (len) {
  return crypto.randomBytes(Math.ceil(len/2))
      .toString('hex') // convert to hexadecimal format
      .slice(0,len);   // return required number of characters
}
/*
app.post('/check', function(req, res) {
  //console.log(req.body.hostName);
  checker.fillUrl(req.body.hostName, res);
  checker.checkSpdy(function() {
    checker.checkHttp2();
  })


});
*/

function callback(path2) {
  //console.log("callback start");
  connection.query("select `path2` from sites where `path2` = '" + path2 + "' limit 1",function(err,result){

    if(result.length==1){
      path2 = randomValueHex(6);
      //temp = path2;
      console.log("LOTTO");
      callback(path2);
    }

  });

}

app.post('/webpagetest',  function(req, res) {
  wpt.run(key[keyCount++], connection, function(aResData) {
    console.log(key[keyCount++]);
    console.log("aaaaaaaaaaa");
    console.log(aResData);
    res.send(aResData);

  });
  if(keyCount >= 4)
      keyCount = 0;
});

//Add by Kolnidur
app.post('/tls', function(req, res) {
  //console.log(req.body.hostName);
  checker.fillUrl(req.body.hostName, res);
  checker.checkNPNproto();

  var dt = new Date();
  var date = dt.toFormat('YYYYMMDDHHMMSS');
  var domain = url_module.parse(req.body.hostName).hostname;
  var url = req.body.hostName;
  var path1 = crypto.createHash('md5').update(date+url).digest("hex");
  var path2 = randomValueHex(6);
  //var temp = "b5c569";
  callback(path2);
  //insert mysql
  var user = {'url':url,
    'path1':path1,
    'path2':path2,
    'domain':domain
  };

  var query = connection.query('insert into sites set ?',user,function(err,result){
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('Query execute : '+query.sql);
  });

});



connection.connect(function(err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});
/*
app.post('/mysql_send', function(req, res) {
  var user = {'name':req.body.name,
    'grade':req.body.grade};
  var query = connection.query('insert into teacher set ?',user,function(err,result){
    if (err) {
      //console.error(err);
      throw err;
    }
    console.log(query);
    res.send(200,'success');
  });

});
*/
http.createServer(app).listen(app.get('port'), function(){
    console.log("Start H2Perf.org Server!");
});

