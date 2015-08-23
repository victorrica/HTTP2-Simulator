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
                //get_result_page(result);
                get_progress_page(result);
            }
        },
        error:function(e){
            alert(e.responseText);
        }
    });
}

function get_progress_page(result){

    $.ajax({
        url: "/progress_page",
        data: result,
        success: function (data) {
          $('body').append(data); 
          var target = $("#two").offset().top;
          $('html, body').animate({scrollTop:target}, 1000);
        },
        dataType: 'html'
    });
}

//function get_result_page(aDomain) {
//    var domain = "https://www.h2perf.org/result?http1=" + aDomain.http1 + "&http2=" + aDomain.http2 + "&status=" + aDomain.status;
//    window.location.replace(domain);
//}

$(document).ready(function(){


    $("#next").click(function(){

        click_next();

    });

});
