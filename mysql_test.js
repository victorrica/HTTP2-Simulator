/**
 * Created by kolnidur on 15. 8. 17..
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : '1234',
    database:'test'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/users',function(req,res){
    var user = {'userid':req.body.userid,
        'name':req.body.name,
        'address':req.body.address};
    var query = connection.query('insert into users set ?',user,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(query);
        res.send(200,'success');
    });
});

app.get('/users', function(req,res){
    var query = connection.query('select * from users',function(err,rows){
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
});