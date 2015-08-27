/**
 * Created by kolnidur on 15. 8. 18..
 */

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
            $('html, body').animate({scrollTop:target}, 1000,function(){
	            $("#header h1").css("color","black");
				$("#header nav > ul > li a").css("color","black");
            });
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
function startComparison(aDomain) {
    var socket = io.connect();
    var index=0;
    socket.emit('crawler', aDomain);
    socket.on('state', function(data) {
        if(data.search('redirect') != -1) {
            var text = data.substring(8);
            var domain = "https://www.h2perf.org/result/" + text;
            window.location.replace(domain);
        }
        if(data.search('crawling') != -1) {
            updateText("Crawling and Modifying Website");
        }
        if(data.search('wpt') != -1) {
            updateText("Comparing HTTP/1.1 and HTTP/2");
            //$("#baseText").remove();
        }
        if(index = data.search('download') != -1) {
            var text = data.substring(index+24);
            updateBaseText(text);
        }
        if(index = data.search('wptstatus') != -1) {
            var text = data.substring(index+9);
            updateBaseText(text);
        }
    });
}

$(document).ready(function(){
    $("#next").click(function(){

        click_next();
    });

});
