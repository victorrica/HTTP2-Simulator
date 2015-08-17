/**
 * Created by kolnidur on 15. 8. 18..
 */

function click_next(){

    get_progress_page();

}

function get_progress_page(){

    $.ajax({
        url: "/progress_page",
        success: function (data) { $('body').append(data); },
        dataType: 'html'
    });
}



$(document).ready(function(){


    $("#next").click(function(){

        click_next();

    });

});
