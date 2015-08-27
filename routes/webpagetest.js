/**
 * Created by jangheejeong on 15. 8. 11..
 */
//api key :A.81570d0c6da5ed737e21f766e7a89655
//statusText: 'The test request will exceed the daily test limit for the given API key' }
var compare_url = 'https://www.webpagetest.org/video/view.php?id='
var compare_extrUrl = "&embed=1"
var WebPageTest = require('webpagetest');
var async = require('async');
var mysql = require('mysql');
var mysql_module = require('./mysql');
var mWpt;

const LEFT_VIEW = 1;
const RIGHT_VIEW = 2;
keyCount = 0;
/*var key = [
    "A.a66edbb10b50e156ebf63dccda3e938d", "A.4f498e8fdf15d820545af9a0ced88431",
    "A.4c4149b53488c09ce7ee8f7e8cc637b6", "A.81570d0c6da5ed737e21f766e7a89655",
    "A.cfbefb5968dacd324d3ce4426ff593ce",
];*/
var key = [
    "A.a620315bf396d7262967e30946ba161a","A.e93010f2bc66cb646f18825ccb76101b","A.cab08c165e78344079744e984cb2c5b5",
    "A.58067983769a0219b6bce7368ed1e196","A.c93b1070dc4903bcbdf1ad06f51116cf","A.18b73dc5e789b37068e510ef5f631501",
    "A.f7853ac48a457add4debc37f04deb0d2","A.7f7b3c557d06af003fd30fde775ef9e7","A.0e79c8894e9f18171d45195914c08109",
    "A.9c66553fd61dd092c88c763078495b0a"
]
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

var task = function(aSocket, mResFunction, aDomain) {
    var leftId;
    var rightId;
    var leftContent;
    var rightContent;

    var resData = {
        leftWaterfallImg : undefined,
        rightWatefFallImg : undefined,
        compareVideo : undefined,
        leftContentUrl : undefined,
        rightContentUrl : undefined,
        leftLoadTime : undefined,
        rightLoadTime : undefined
    }

    getAgent(function(aAgent) {
        async.series([
            function(callback) {
                runLeft(aSocket, mResFunction, aAgent, aDomain, function(aId) {
                    leftId = aId;
                    callback(null);
                });
            },
            function(callback) {
                runRight(aSocket, mResFunction, aAgent, aDomain, function(aId) {
                    rightId = aId;
                    callback(null);
                });
            },
            function(callback) {
                console.log("left Id : " + leftId);
                result(aSocket,LEFT_VIEW, leftId, function(aContent, aLeftLoad, aRightLoad) {
                    leftContent = aContent;
                    resData.leftLoadTime = aLeftLoad;
                    resData.rightLoadTime = aRightLoad;
                    callback(null);
                });
            },
            function(callback) {
                console.log("right Id : " + rightId);
                result(aSocket,RIGHT_VIEW, rightId, function(aContent, aLeftLoad, aRightLoad) {

                    rightContent = aContent;
                    resData.leftLoadTime = aLeftLoad;
                    resData.rightLoadTime = aRightLoad;
                    var compareId = leftId+','+rightId;
                    createVideo(compareId, function (aData) {
                        resData.compareVideo = aData;
                        callback(null);
                    });

                });
            },
            function(callback) {
                getChartUrl(leftContent, LEFT_VIEW, function (aData) {
                    resData.leftContentUrl = aData;
                    callback(null);
                });
            },
            function(callback) {
                getWaterfallImg(leftId, LEFT_VIEW, function(aData) {
                    resData.leftWaterfallImg = aData;
                    callback(null);
                });
            },
            function(callback) {
                getWaterfallImg(rightId, RIGHT_VIEW, function(aData) {
                    resData.rightWatefFallImg = aData;
                    callback(null);
                });
            },
        ], function(error, result) {
            setTimeout(function() {
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
                    console.log("exitttttttttttttttttttt : ", keyCount);
                });
            }, 2000);
        });
    });
}

var getChartUrl = function(aContent, aLocation, aCallback) {
    var quiche = require('quiche');
    var chart = quiche('pie');
    chart.addData(aContent.html.bytes, 'html', '5f86cb');
    chart.addData(aContent.js.bytes, 'js', '3fa5ae');
    chart.addData(aContent.css.bytes, 'css', '90c574');
    chart.addData(aContent.image.bytes, 'image', 'ab84cc');
    chart.addData(aContent.flash.bytes, 'flash', '359ea6');
    chart.addData(aContent.other.bytes, 'other', 'b7b7b7');

    chart.setAutoScaling();
    chart.setTransparentBackground();

    if(aLocation == LEFT_VIEW)
        aCallback(chart.getUrl(true));
    else
        aCallback(chart.getUrl(true));

}

var run = function(aSocket, key, aDomain, aRcvFun) {
    mWpt = new WebPageTest('www.webpagetest.org', key);
    //mysql_connection = connection;
    console.log('key : ',key);
    task(aSocket,aRcvFun, aDomain);
}

var runLeft = function(aSocket, aResFun, aAgent, aDomain, callback) {
    var h1Domain = aDomain.http1;
    console.log("h1 url : "+h1Domain);
    console.log(aAgent);
    mWpt.runTest(h1Domain, { "location":aAgent, "label": "HTTP/1.1", "ignoreSSL":true,"video":true,"player":true, breakdown: true,
        domains: true, pageSpeed: true, requests: true },
        function(err, aData) {
            if(aData.statusCode == 400) {
                keyCount++;
                console.log(keyCount + "\n");
                console.log("aaaaaaaaaDomain", aDomain);
                console.log("aaaaaaaaaResFun", aResFun);
                console.log("111111111111ccccccccccccccccc : ", key[keyCount]);
                console.log("111111111111ddddddddddddddddd : ", keyCount);
                exports.startWpt(aSocket, aDomain, aResFun);
            }
            else {
                console.log(aData);
                var leftTestId = aData.data.testId;
                callback(leftTestId);
            }
        });
}

var runRight = function(aSocket, aResFun, aAgent, aDomain, callback) {
    var h2Domain = aDomain.http2;
    console.log("h2 url : "+h2Domain);
    console.log(aAgent);
    mWpt.runTest(h2Domain, { "location":aAgent, "label": "HTTP/2", "ignoreSSL":true,"video":true,"player":true, breakdown: true,
        domains: true, pageSpeed: true, requests: true },
        function(err, aData) {
            if(aData.statusCode == 400) {
                keyCount++;
                console.log("bbbbbbbbbDomain", aDomain);
                console.log("bbbbbbbbbResFun", aResFun);
                console.log("22222222222ccccccccccccccccc : ", key[keyCount]);
                console.log("22222222222ddddddddddddddddd : ", keyCount);
                exports.startWpt(aSocket, aDomain, aResFun);
            }
            else {
                console.log(aData);
                var rightTestId = aData.data.testId;
                callback(rightTestId);
            }
        });
}

var createVideo = function(compareId, aCallback) {
    mWpt.createVideo(compareId, {'dryrun':true},function(error, data) {
        var videoId = data.data.videoId;
        aCallback(compare_url + videoId + compare_extrUrl);
    });
}

var result = function(aSocket,aLocation, aId, callback) {
    mWpt.getTestResults(aId, { breakdown: true, requests: true}, function(err, data) {
        console.log("statusCode : "+data.data.statusCode + "\n" + data.data.statusText);
        if(data.statusCode == 200) {
            var leftLoadTime;
            var rightLoadTime;
            if(aLocation==LEFT_VIEW){
                leftLoadTime = data.data.average.firstView.visualComplete;
            }else{
                rightLoadTime = data.data.average.firstView.visualComplete;
            }

            var leftContent = data.data.median.firstView.breakdown;

            callback(leftContent, leftLoadTime, rightLoadTime);
        } else {
            if(aLocation==LEFT_VIEW){
                var text = "wptstatus"+"HTTP1.1 "+data.data.statusText;
            } else {
                var text = "wptstatus"+"HTTP/2 "+data.data.statusText;
            }

            console.log("text :", text);
            aSocket.emit("state",text);
            result(aSocket,aLocation,aId, callback);
        }
    });
}

var getWaterfallImg = function(aId, aLocation, aCallback) {
    mWpt.getWaterfallImage(aId, { dryRun:true, chartWidth: 450, mime:true, colorByMime: true }, function (err, aData) {
        if(aLocation == LEFT_VIEW) {
            aCallback(aData.url)
        }
        else {
            aCallback(aData.url)
        }
    });
}

exports.startWpt = function(aSocket, aData, callback) {
    var domain = {
        http1 : aData.http1,
        http2 : aData.http2,
        path1 : aData.path1
    };
    if(keyCount >= 9)
        keyCount = 0;

    run(aSocket, key[keyCount], domain, function() {
        console.log("keycount");
        console.log(keyCount);
        console.log(key[keyCount]);
        keyCount++;
        callback();
    });


}
