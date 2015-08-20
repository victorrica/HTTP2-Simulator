/**
 * Created by kolnidur on 15. 8. 18..
 */

function click_next(){

    get_progress_page();
    get_result_page();


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
