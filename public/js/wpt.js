/**
 * Created by jangheejeong on 15. 8. 12..
 */


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}



$(document).ready(function(){
    var domain = {
        http1 :getQueryVariable("http1"),
        http2 :getQueryVariable("http2"),
        status :getQueryVariable("status")
    }
    runTest(domain);
});

function runTest(aDomain){
    $.ajax({
        url: '/webpagetest',
        type: "POST",
        data: aDomain,
        success: function(result){
            $('#first-waterfall').attr("src", result.leftWaterfallImg);
            $('#repeat-waterfall').attr("src", result.rightWatefFallImg);
            $('#comparevideo').attr("src", result.compareVideo);
            $('#left-chart').attr("src", result.leftContentUrl);
            $('#right-chart').attr("src", result.rightContentUrl);
        },
        error:function(e){
            alert(e.responseText);
        }
    });
}

$('#first-waterfall').load(function() {
    var img=$('#first-waterfall');
    var imgHeight = img.height();
    $("#chart-title-left").css({top: imgHeight+650, left: 320, position:'absolute'});
    $("#chart-title-right").css({top: imgHeight+650, right: 320, position:'absolute'});
    $("#left-chart").css({top: imgHeight+700, left: 150, position:'absolute'});
    $("#right-chart").css({top: imgHeight+700, right: 150, position:'absolute'});
});
