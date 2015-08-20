/**
 * Created by jangheejeong on 15. 8. 11..
 */
//api key :A.81570d0c6da5ed737e21f766e7a89655
//statusText: 'The test request will exceed the daily test limit for the given API key' }
var compare_url = 'http://www.webpagetest.org/video/view.php?id='
var compare_extrUrl = "&embed=1&width=904&height=400"
var WebPageTest = require('webpagetest');
var async = require('async');
var mWpt;

const LEFT_VIEW = 1;
const RIGHT_VIEW = 2;

var task = function(mResFunction) {
    var leftId;
    var rightId;
    var leftContent;
    var rightContent;

    async.series([
        function(callback) {
            runLeft(function(aId) {
                leftId = aId;
                callback(null);
            });
        },
        function(callback) {
            runRight(function(aId) {
                rightId = aId;
                callback(null);
            });
        },
        function(callback) {
            console.log("left Id : " + leftId);
            result(leftId, function(aContent) {
                leftContent = aContent;
                callback(null);
            });
        },
        function(callback) {
            console.log("right Id : " + rightId);
            result(rightId, function(aContent) {
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
            console.log('error : ', result);
        }, 3000);
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
    rightContentUrl : undefined
}

exports.run = function(key, aRcvFun) {
    mWpt = new WebPageTest('www.webpagetest.org', key);
    console.log(key);
    task(aRcvFun);
}

runLeft = function(callback) {
    mWpt.runTest('www.youtube.com', { "video":true,"player":true, breakdown: true, domains: true, pageSpeed: true, requests: true},
        function(err, aData) {
            console.log(aData);
            var leftTestId = aData.data.testId;
            callback(leftTestId);
        });
}

runRight = function(callback) {
    mWpt.runTest('www.facebook.com', { "video":true,"player":true, breakdown: true, domains: true, pageSpeed: true, requests: true},
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

result = function(aId, callback) {
    mWpt.getTestResults(aId, { breakdown: true, requests: true, "location":"ec2-ap-northeast-1:Chrome"}, function(err, data) {
        console.log("statscode : "+data.data.statusCode);
        if(data.statusCode == 200) {
            var leftContent = data.data.median.firstView.breakdown;
            callback(leftContent);
        } else {
            result(aId, callback);
        }
    });
}

getWaterfallImg = function(aId, aLocation) {
    mWpt.getWaterfallImage(aId, { dryRun:true, chartWidth: 450, repeatView:true,  mime:true, colorByMime: true }, function (err, aData) {
        if(aLocation == LEFT_VIEW) {
            resData.leftWaterfallImg = aData.url;
        }
        else {
            resData.rightWatefFallImg = aData.url;
        }
    });
}