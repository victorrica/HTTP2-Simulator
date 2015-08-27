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
	if(m != 0){
        if(m==1){
            if(s==0||s==1){
                count = m + 'minute ' + s + "second";
            }else{
                count = m + 'minute ' + s + "seconds";
            }
        }else{
            if(s==0||s==1){
                count = m + 'minutes ' + s + "second";
            }else{
                count = m + 'minutes ' + s + "seconds";
            }
        }
    }
	else{
        if(s==0||s==1){
            count = s + "second";
        }else{
            count = s + "seconds";
        }
    }

	$('#countText').multiline("Estimated time : 4 minutes 10 seconds\nLead time : " + count);
}

function startComparison(aDomain) {
    var socket = io.connect();
    var index=0;
    socket.emit('crawler', aDomain);
    socket.on('state', function(data) {
        if(data.search('redirect') != -1) {
            var text = data.substring(8);
            var domain = "https://www.h2perf.org/result/"+text;
            window.location.replace(domain);
        } else if(data.search('crawling') != -1) {
            updateText("Crawling and Modifying Website");
        } else if(data.search('wpt') != -1) {
            updateText("Comparing HTTP/1.1 and HTTP/2");
            //$("#baseText").remove();
        } else if(index = data.search('download') != -1) {
            var text = data.substring(index+24);
            updateBaseText(text);
        } else if(data.search('wpt_status') != -1) {
            alert("eeee");
            var text = data.substring(index+11);
            alert(text);
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
