/**
 * Created by kolnidur on 15. 8. 6..
 */

function wpt_start(url) {
    $.ajax({
        type: "POST",
        url: "http://www.webpagetest.org/runtest.php",
        data: "url=" + url + "&k=A.4c4149b53488c09ce7ee8f7e8cc637b6&f=json&video=1",
        success: function(result) {

            //alert(result.data.jsonUrl);
            $("#result_url").val(result.data.jsonUrl);

        },
        error:function(e){
            alert(e.responseText);
        }
    });
}

function wpt_result(url) {
    $.ajax({
        type: "POST",
        url: url,  // 형식 : http://www.webpagetest.org/jsonResult.php?test=150806_KY_E97
        //data: "url=" + url + "&k=A.4c4149b53488c09ce7ee8f7e8cc637b6&f=json&video=1",
        success: function(result) {

            //alert(url);
            if(result.statusText=="Test Complete"){
                alert("Test Complete");

                var url_array=url.split('?');
                var temp1=url_array[1].split('=');
                var id=temp1[1];
                var id_array = id.split('_');
                var year = id_array[0].charAt(0)+id_array[0].charAt(1);
                var month = id_array[0].charAt(2)+id_array[0].charAt(3);
                var day = id_array[0].charAt(4)+id_array[0].charAt(5);
               // alert(id_array);  // 15 , 08 , 06 , KY , E97

                var img_url = "http://www.webpagetest.org/results/"+year+'\/'+month+'\/'+day+'\/'+id_array[1]+'\/'+id_array[2]+'\/'+"1_waterfall.png";
                //alert(img_url);
                var path="<img src=\""+img_url+"\">";
                //alert(path);
                $("#img_div").append(path);
            }else{
                alert("Now test status is "+result.statusText+". Please retry 30 seconds later.");
            }
        },
        error:function(e){
            alert(e.responseText);
        }
    });
}



$(document).ready(function(){


    $("#wpt1_start").click(function(){
        var json = wpt_start($("#hostname").val());
        //var json= $("#result_url").val('http://www.webpagetest.org/jsonResult.php?test=150806_KY_E97');
    });

    $("#wptr_start").click(function(){
        var json = wpt_result($("#result_url").val());
    });



});



