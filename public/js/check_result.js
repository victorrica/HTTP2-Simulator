/**
 * Created by kolnidur on 15. 8. 18..
 */

 var count;

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

function Display(min,sec) {
 var disp;
 if( min <= 9 ) disp=" 0";
 else disp=" ";

 if( min >= 60 ) {
  hour = parseInt( min / 60 );

  if( hour >=24 ) {
    day = parseInt( hour / 24 );
    disp += day + "일 :" + ( hour % 24 ) + "시간 :" + parseInt( min % 60 ) + "분 :";
  }
  else {
    disp +=  hour + "시간 :" + parseInt( min % 60 ) + "분 :";
  }
 }
 else {
  disp += min + "분 :";
 }

 if( sec <= 9 ) disp += "0" + sec + "초";
 else disp += sec + "초";

 return(disp);
}



function Tcounter(timegap) {
 csec1j = timegap % 60;
 cmin1j = ( timegap - csec1j ) / 60;
 TcounterZero();
}

function TcounterZero() {
 csec1j--;

 if(csec1j == -1) {
  csec1j = 59;
  cmin1j--;
 }

 count = Display( cmin1j, csec1j );
 else{
  Tcounter = setTimeout( "TcounterZero()", 1000 );
 }
}

function startComparison(aDomain) {
    var socket = io.connect();
    var index=0;
    socket.emit('crawler', aDomain);
    socket.on('state', function(data) {
        if(data.search('redirect') != -1) {
            var text = data.substring(8);
            var domain = "/result/"+text;
            window.location.replace(domain);
        } else if(data.search('crawling') != -1) {
            updateText("Crawling and Modifying Website");
        } else if(data.search('wpt') != -1) {
            updateBaseText("남은 시간 : " + count);
            updateText("Comparing HTTP/1.1 and HTTP/2");
        } else if(index = data.search('download') != -1) {
            var text = data.substring(index+24);
            updateBaseText(text);
        }
    });
}

$(document).ready(function(){
    $("#next").click(function(){

        click_next();
        Tcounter(45);

    });

});
