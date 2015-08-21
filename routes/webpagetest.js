/**
 * Created by jangheejeong on 15. 8. 11..
 */
//api key :A.81570d0c6da5ed737e21f766e7a89655
//statusText: 'The test request will exceed the daily test limit for the given API key' }
var compare_url = 'http://www.webpagetest.org/video/view.php?id='
var compare_extrUrl = "&embed=1&width=904&height=400"
var WebPageTest = require('webpagetest');
var async = require('async');
var mysql = require('mysql');
var mysql_module = require('./mysql');
var mWpt;

const LEFT_VIEW = 1;
const RIGHT_VIEW = 2;

//var mysql_connection;



var task = function(mResFunction, aDomain) {
    var leftId;
    var rightId;
    var leftContent;
    var rightContent;

    async.series([
        function(callback) {
            console.log(aDomain.http1);
            console.log(aDomain.http2);
            runLeft(aDomain, function(aId) {
                leftId = aId;
                callback(null);
            });
        },
        function(callback) {
            runRight(aDomain, function(aId) {
                rightId = aId;
                callback(null);
            });
        },
        function(callback) {
            console.log("left Id : " + leftId);
            result(LEFT_VIEW, leftId, function(aContent) {
                leftContent = aContent;
                callback(null);
            });
        },
        function(callback) {
            console.log("right Id : " + rightId);
            result(RIGHT_VIEW, rightId, function(aContent) {
                var compareId = leftId+','+rightId;
                rightContent = aContent;
                createVideo(compareId);
                callback(null);
            });
        }
    ], function(error, result) {
        setTimeout(function() {
            var compareId = leftId+','+rightId;
            createVideo(compareId);
            getChartUrl(leftContent, LEFT_VIEW);
            getChartUrl(rightContent, RIGHT_VIEW);
            getWaterfallImg(leftId, LEFT_VIEW);
            getWaterfallImg(rightId, RIGHT_VIEW);
            mResFunction(resData);

            var sql_data = {
                'compare_url':resData.compareVideo,
                'graph_url':resData.leftContentUrl,
                'h1_waterfall_url':resData.leftWaterfallImg,
                'h2_waterfall_url':resData.rightWatefFallImg,
                'http1_time':resData.leftLoadTime,
                'http2_time':resData.rightLoadTime,
                'performance':(resData.rightLoadTime/resData.leftLoadTime)*100
            };

            mysql_module.insert_result(sql_data);

            //var query = mysql_connection.query('insert into result set ?',sql_data,function(err,result){
            //    if (err) {
            //        console.error(err);
            //        throw err;
            //    }
            //    console.log('Query execute : '+query.sql);
            //});


            console.log('error : ', result);


        }, 5000);
    });
}

var getChartUrl = function(aContent, aLocation) {
    var quiche = require('quiche');
    var chart = quiche('pie');
    chart.addData(aContent.html.bytes, 'html', '0000FF');
    chart.addData(aContent.js.bytes, 'js', 'F2CB61');
    chart.addData(aContent.css.bytes, 'css', 'A566FF');
    chart.addData(aContent.flash.bytes, 'flash', 'ABF200');
    chart.addData(aContent.other.bytes, 'other', 'CFFF24');
    chart.setAutoScaling();
    chart.setTransparentBackground();
    if(aLocation == LEFT_VIEW)
        resData.leftContentUrl =  chart.getUrl(true);
    else
        resData.rightContentUrl =  chart.getUrl(true);
}

var resData = {
    leftWaterfallImg : undefined,
    rightWatefFallImg : undefined,
    compareVideo : undefined,
    leftContentUrl : undefined,
    rightContentUrl : undefined,
    leftLoadTime : undefined,
    rightLoadTime : undefined
}

exports.run = function(key, aDomain, aRcvFun) {
    mWpt = new WebPageTest('www.webpagetest.org', key);
    //mysql_connection = connection;
    console.log(key);
    task(aRcvFun, aDomain);
}

runLeft = function(aDomain, callback) {
    var h1Domain = aDomain.http1;
    mWpt.runTest(h1Domain, { "video":true,"player":true, breakdown: true, domains: true, pageSpeed: true, requests: true},
        function(err, aData) {
            console.log(aData);
            var leftTestId = aData.data.testId;
            callback(leftTestId);
        });
}

runRight = function(aDomain, callback) {
    var h2Domain = aDomain.http2;
    mWpt.runTest(h2Domain, { "video":true,"player":true, breakdown: true, domains: true, pageSpeed: true, requests: true},
        function(err, aData) {
            console.log(aData);
            var rightTestId = aData.data.testId;
            callback(rightTestId);
        });
}

createVideo = function(compareId) {
    mWpt.createVideo(compareId, {'dryrun':true},function(error, data) {
        var videoId = data.data.videoId;
        resData.compareVideo = compare_url + videoId + compare_extrUrl;
    });
}

result = function(aLocation, aId, callback) {
    mWpt.getTestResults(aId, { breakdown: true, requests: true, "location":"ec2-ap-northeast-1:Chrome"}, function(err, data) {
        console.log("statusCode : "+data.data.statusCode);
        if(data.statusCode == 200) {
            if(aLocation==LEFT_VIEW){
                resData.leftLoadTime = data.data.average.firstView.loadTime;
            }else{
                resData.rightLoadTime = data.data.average.firstView.loadTime;
            }

            var leftContent = data.data.median.firstView.breakdown;

            callback(leftContent);
        } else {
            result(aLocation,aId, callback);
        }
    });
}

getWaterfallImg = function(aId, aLocation) {
    mWpt.getWaterfallImage(aId, { dryRun:true, chartWidth: 450, mime:true, colorByMime: true }, function (err, aData) {
        if(aLocation == LEFT_VIEW) {
            resData.leftWaterfallImg = aData.url;

        }
        else {
            resData.rightWatefFallImg = aData.url;
        }
    });
}
