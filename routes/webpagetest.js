/**
 * Created by jangheejeong on 15. 8. 11..
 */
//api key :A.81570d0c6da5ed737e21f766e7a89655
//statusText: 'The test request will exceed the daily test limit for the given API key' }
var compare_url = 'https://www.webpagetest.org/video/view.php?id='
var compare_extrUrl = "&embed=1&width=900&height=400"
var WebPageTest = require('webpagetest');
var async = require('async');
var mysql = require('mysql');
var mysql_module = require('./mysql');
var mWpt;

const LEFT_VIEW = 1;
const RIGHT_VIEW = 2;
var keyCount = 0;
var key = [
    "A.a66edbb10b50e156ebf63dccda3e938d", "A.4f498e8fdf15d820545af9a0ced88431",
    "A.4c4149b53488c09ce7ee8f7e8cc637b6", "A.81570d0c6da5ed737e21f766e7a89655",
    "A.cfbefb5968dacd324d3ce4426ff593ce",
];
//var mysql_connection;



var getAgent = function(aCallback) {
    mWpt.getLocations(function callback(err, data) {
        var lowPriority = new Array();
        var lowAgent = new Array();
        var count=0;
        var length = data.response.data.location.length;
        for(var i=0; i<length; i++) {
            var msg = data.response.data.location[i];
            var id = msg.id;
            if(id.indexOf('ec2') != -1 && id.indexOf('Chrome') != -1) {
                lowPriority[count] = msg.PendingTests.LowPriority;
                lowAgent[count] = msg.id;
                count++
            }
        }
        var minimumPriority = lowPriority[0];
        var minimumAgent = lowAgent[0];
        for(var cnt=0; cnt<count; cnt++) {
            if(minimumPriority > lowPriority[cnt]) {
                minimumPriority = lowPriority[cnt];
                minimumAgent = lowAgent[cnt];
            }
        }
        console.log("lowPriority : ", minimumPriority);
        console.log("lowAgent : ", minimumAgent);
        aCallback(minimumAgent);
    });
}

var task = function(aSocket,mResFunction, aDomain) {
    var leftId;
    var rightId;
    var leftContent;
    var rightContent;
    getAgent(function(aAgent) {
        async.series([
            function(callback) {
                runLeft(mResFunction, aAgent, aDomain, function(aId) {
                    leftId = aId;
                    callback(null);
                });
            },
            function(callback) {
                runRight(mResFunction, aAgent, aDomain, function(aId) {
                    rightId = aId;
                    callback(null);
                });
            },
            function(callback) {
                console.log("left Id : " + leftId);
                result(aSocket,LEFT_VIEW, leftId, function(aContent) {
                    leftContent = aContent;
                    callback(null);
                });
            },
            function(callback) {
                console.log("right Id : " + rightId);
                result(aSocket,RIGHT_VIEW, rightId, function(aContent) {
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
                mysql_module.findIdxByPath1(aDomain.path1,function(idx){
                    var sql_data = {
                        'site_idx':idx,
                        'compare_url':resData.compareVideo,
                        'graph_url':resData.leftContentUrl,
                        'h1_waterfall_url':resData.leftWaterfallImg.replace("http", "https"),
                        'h2_waterfall_url':resData.rightWatefFallImg.replace("http", "https"),
                        'http1_time':resData.leftLoadTime,
                        'http2_time':resData.rightLoadTime,
                        'performance':(resData.leftLoadTime/resData.rightLoadTime)*100
                    };
                    mysql_module.insert_result(sql_data);
                    mResFunction();
                });
            }, 2000);
        });
    });
}

var getChartUrl = function(aContent, aLocation) {
    var quiche = require('quiche');
    var chart = quiche('pie');
    chart.addData(aContent.html.bytes, 'html', '0000FF');
    chart.addData(aContent.js.bytes, 'js', 'F2CB61');
    chart.addData(aContent.css.bytes, 'css', 'A566FF');
    chart.addData(aContent.image.bytes, 'image', 'F6F6F6');
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

run = function(aSocket, key, aDomain, aRcvFun) {
    mWpt = new WebPageTest('www.webpagetest.org', key);
    //mysql_connection = connection;
    console.log(key);
    task(aSocket,aRcvFun, aDomain);
}

runLeft = function(aResFun, aAgent, aDomain, callback) {
    var h1Domain = aDomain.http1;
    console.log("h1 url : "+h1Domain);
    console.log(aAgent);
    mWpt.runTest(h1Domain, { "location":aAgent, "label": "HTTP/1.1", "ignoreSSL":true,"video":true,"player":true, breakdown: true,
        domains: true, pageSpeed: true, requests: true },
        function(err, aData) {
            if(aData.statusCode == 400) {
                keyCount++;
                exports.startWpt(aDomain, aResFun);
            }
            else {
                console.log(aData);
                var leftTestId = aData.data.testId;
                callback(leftTestId);
            }
        });
}

runRight = function(aResFun, aAgent, aDomain, callback) {
    var h2Domain = aDomain.http2;
    console.log("h2 url : "+h2Domain);
    console.log(aAgent);
    mWpt.runTest(h2Domain, { "location":aAgent, "label": "HTTP/2", "ignoreSSL":true,"video":true,"player":true, breakdown: true,
        domains: true, pageSpeed: true, requests: true },
        function(err, aData) {
            if(aData.statusCode == 400 && aData.statusText.indexOf('limit') != -1) {
                keyCount++;
                exports.startWpt(aDomain, aResFun);
            }
            else {
                console.log(aData);
                var rightTestId = aData.data.testId;
                callback(rightTestId);
            }
        });
}

createVideo = function(compareId) {
    mWpt.createVideo(compareId, {'dryrun':true},function(error, data) {
        var videoId = data.data.videoId;
        resData.compareVideo = compare_url + videoId + compare_extrUrl;
    });
}

result = function(aSocket,aLocation, aId, callback) {
    mWpt.getTestResults(aId, { breakdown: true, requests: true}, function(err, data) {
        console.log("statusCode : "+data.data.statusCode + "\n" + data.data.statusText);
        if(data.statusCode == 200) {
            if(aLocation==LEFT_VIEW){
                resData.leftLoadTime = data.data.average.firstView.visualComplete;
            }else{
                resData.rightLoadTime = data.data.average.firstView.visualComplete;
            }

            var leftContent = data.data.median.firstView.breakdown;

            callback(leftContent);
        } else {
            var text = "wptstatus"+" "+data.data.statusText;
            console.log("text :", text);
            aSocket.emit("state",text);
            result(aSocket,aLocation,aId, callback);
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

exports.startWpt = function(aSocket, aData, callback) {
    var domain = {
        http1 : aData.http1,
        http2 : aData.http2,
        path1 : aData.path1
    };
    if(keyCount >= 4)
        keyCount = 0;

    run(aSocket, key[keyCount], domain, function() {
        console.log("keycount");
        console.log(keyCount);
        console.log(key[keyCount]);
        keyCount++;
        callback();
    });


}
