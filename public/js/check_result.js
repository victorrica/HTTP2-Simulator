/**
 * Created by kolnidur on 15. 8. 18..
 */

function click_next(){

    get_progress_page();
    runCrawler();

}

function runCrawler() {
    $.ajax({
        url: '/crawler',
        success: function(result){
            if(result.status==0) {
                get_result_page(result);
            } else {
                //fail message
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
        success: function (data) { $('body').append(data); },
        dataType: 'html'
    });
}
//x=x1&x=x2&x=x3

function get_result_page(aDomain){
    var domain = "/result?http1=" + aDomain.http1 + "&http2=" + aDomain.http2 + "&status=" + aDomain.status;
    alert(aDomain.http1 + ", " + aDomain.http2);
    window.location.replace(domain);
}

$(document).ready(function(){


    $("#next").click(function(){

        click_next();

    });

});
