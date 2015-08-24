/**
 * Created by kolnidur on 15. 8. 21..
 */

var mysql = require('mysql');
var crypto = require('crypto');
var url_module = require('url');
var date_utils = require('date-utils');
var connection

exports.start_connection = function(){

    connection = mysql.createConnection({
        host    :'localhost',
        port : 3306,
        user : 'root',
        password : 'soma123123!',
        database:'HTTP2Simulator'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('mysql connection error');
            console.error(err);
            throw err;
        }
    });

};

exports.insert_sites = function(hostname){

    var dt = new Date();
    var date = dt.toFormat('YYYYMMDDHHMMSS');
    var domain = url_module.parse(hostname).hostname;
    var url = hostname;
    var path1 = crypto.createHash('md5').update(date+url).digest("hex");
    var path2 = randomValueHex(6);
    callback(path2);

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


    return user;
}

exports.insert_result = function(data){

    var query = connection.query('insert into result set ?',data,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log('Query execute : '+query.sql);
    });
}

exports.findIdxByPath2 = function(path2, cb){
    var query = connection.query('select * from sites where `path2`='+mysql.escape(path2), function(err,rows) {
        if(err) {
            console.error(err);
            throw err;
        }
        console.log('Query execute : '+query.sql);

        cb(rows[0].idx);
    });
}

exports.findIdxByPath1 = function(path1, cb){
    var query = connection.query('select * from sites where `path1`='+mysql.escape(path1), function(err,rows) {
        if(err) {
            console.error(err);
            throw err;
        }
        console.log('Query execute : '+query.sql);

        cb(rows[0].idx);
    });
}

exports.findResultdataByIdx = function(idx,cb){
    var query = connection.query('select * from result where `site_idx`='+mysql.escape(idx), function(err,rows) {
        if(err) {
            console.error(err);
            throw err;
        }
        console.log('Query execute : '+query.sql);

        cb(rows);
    });


}

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}


function callback(path2) {
    connection.query("select `path2` from sites where `path2` = '" + path2 + "' limit 1",function(err,result){

        if(result.length==1){
            path2 = randomValueHex(6);
            console.log("LOTTO");
            callback(path2);
        }
    });
}
