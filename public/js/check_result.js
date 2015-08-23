/**
 * Created by kolnidur on 15. 8. 18..
 */

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
    $('#baseText').text(aText);
}

function startComparison(aDomain) {
    var socket = io.connect();
    var index=0;
    socket.emit('crawler', aDomain);
    socket.on('state', function(data) {
        if(data.search('redirect') != -1) {
            var text = data.substring(8);
            alert("text is "+text);
            var domain = "/result/"+text;
            window.location.replace(domain);
        } else if(data.search('crawling') != -1) {
            updateText("Crawling Website");
        } else if(data.search('wpt') != -1) {
            updateBaseText("");
            updateText("Comparing http1 and http2");
        } else if(index = data.search('download') != -1) {
            var text = data.substring(index+24);
            updateBaseText(text);
        }
    });
}

$(document).ready(function(){


    $("#next").click(function(){

        click_next();

    });

});
