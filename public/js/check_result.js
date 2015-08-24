/**
 * Created by kolnidur on 15. 8. 18..
 */

var count;

$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
}

function click_next(){

    get_progress_page();
}

function get_progress_page(){

    $.ajax({
        url: "/progress_page",
        success: function (data) {
            $('body').append(data);
            var target = $("#two").offset().top;
            $('html, body').animate({scrollTop:target}, 1000);
            startComparison();
        },
        dataType: 'html'
    });
}

function updateText(aText) {
    $('#text').text(aText);
}
function updateBaseText(aText) {
	aText.replace("Download Start", "\nDownload Start");
    $('#baseText').multiline(aText.trim());
}

var gap = 0;
// 경과 시간 표시
function echoTime (serverStartTime, serverNowTime)
{
	var nowTime = new Date();
	nowTime = parseInt(nowTime / 1000);

	if (gap == 0) gap = serverNowTime - nowTime;
	nowTime = nowTime + gap;

	var echoTime = nowTime - (serverStartTime);

	m = parseInt((echoTime % 3600) / 60);
	s = parseInt((echoTime % 60));
	if(m != 0)
		count = m + '분 ' + s + "초";
	else
		count = s + "초";
	$('#countText').multiline("예상 시간 : 4분 10초\n경과 시간 : " + count);
}

function startComparison(aDomain) {
    var socket = io.connect();
    var index=0;
    socket.emit('crawler', aDomain);
    socket.on('state', function(data) {
        if(data.search('redirect') != -1) {
            var text = data.substring(8);
            var domain = "/result/"+text;
            window.location.replace(domain);
        } else if(data.search('crawling') != -1) {
            updateText("Crawling and Modifying Website");
        } else if(data.search('wpt') != -1) {
            updateText("Comparing HTTP/1.1 and HTTP/2");
            $("#baseText").remove();
        } else if(index = data.search('download') != -1) {
            var text = data.substring(index+24);
            updateBaseText(text);
        }
    });
}

$(document).ready(function(){
    $("#next").click(function(){

        click_next();
        var nt = new Date();
        var nt2 = new Date();
        setInterval(function(){
	        echoTime(nt, nt2);
	    }, 1000);
    });

});
