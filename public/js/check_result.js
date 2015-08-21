/**
 * Created by kolnidur on 15. 8. 18..
 */

function click_next(){

    get_progress_page();
    runCrawler();
    //get_result_page();


}
function runCrawler() {
    $.ajax({
        url: '/crawler',
        success: function(result){
            if(result==0) {
                get_result_page();
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

function get_result_page(){
    window.location.replace("/result");
}

$(document).ready(function(){


    $("#next").click(function(){

        click_next();

    });

});
