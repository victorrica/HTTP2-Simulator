/**
 * Created by jangheejeong on 15. 8. 12..
 */

//function runTest(aDomain){
//    $.ajax({
//        url: '/webpagetest',
//        type: "POST",
//        data: aDomain,
//        success: function(result){
//            $('#first-waterfall').attr("src", result.leftWaterfallImg);
//            $('#repeat-waterfall').attr("src", result.rightWatefFallImg);
//            $('#comparevideo').attr("src", result.compareVideo);
//            $('#left-chart').attr("src", result.leftContentUrl);
//            $('#right-chart').attr("src", result.rightContentUrl);
//        },
//        error:function(e){
//            alert(e.responseText);
//        }
//    });
//}
//
//$(document).ready(function(){
//
//});

$('#first-waterfall').load(function() {
    var img=$('#first-waterfall');
    var imgHeight = img.height();
    $("#chart-title-left").css({top: imgHeight+650, left: 320, position:'absolute'});
    $("#chart-title-right").css({top: imgHeight+650, right: 320, position:'absolute'});
    $("#left-chart").css({top: imgHeight+700, left: 150, position:'absolute'});
    $("#right-chart").css({top: imgHeight+700, right: 150, position:'absolute'});
});
