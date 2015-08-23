/**
 * Created by kolnidur on 15. 8. 18..
 */

function click_next(){

    get_progress_page();
}

function startCrawler() {
    $.ajax({
        url: '/crawler',
        success: function(result){
            const SUCCESS = '0';
            if(result.status==SUCCESS) {
                checkWpt(result);
            }
        },
        error:function(e){
            alert(e.responseText);
        }
    });
}

function get_progress_page(){

    $.ajax({
        url: "/progress_page",
        success: function (data) {
            $('body').append(data);
            var target = $("#two").offset().top;
            $('html, body').animate({scrollTop:target}, 1000);
            startCrawler();
        },
        dataType: 'html'
    });
}

function checkWpt(aDomain) {
    var socket = io.connect();
    socket.emit('checkWpt', aDomain);
    socket.on('state', function(data) {
        if(data == '0') {
            alert('result');
            var domain = "/result";
            window.location.replace(domain);
        }
    });
}

$(document).ready(function(){


    $("#next").click(function(){

        click_next();

    });

});
