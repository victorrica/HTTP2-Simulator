
$(document).ready(function(){
    $(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
      e.preventDefault();
      return;                      
    });
    $(window).on("keydown.disableScroll", function(e) {
      var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      for (var i = 0; i < eventKeyArray.length; i++) {
        if (e.keyCode === eventKeyArray [i]) {
          e.preventDefault();
          return;
        }
      }
    });
});



function check_tls(url){
	$.ajax({
		url: '/tls',
		type: "POST",
		data:{'hostName':url},
		success: function(result){


			if($("#protocol_result").length==1){
				$("#protocol_result").text(result);

			}else{
				get_check_result(result);
			}

		},
		error:function(e){
			alert(e.responseText);
		}
	});
}


function get_check_result(protocol){

	$.ajax({
		url: "/check_result",
		dataType: 'html',
		success: function (data) {
			$('body').append(data);
			$("#protocol_result").text(protocol);
            var target = $("#one").offset().top;
            $('html, body').animate({scrollTop:target}, 1000);
		}
	});
}


$(document).ready(function(){


	$("#start").click(function(){
		check_tls($("#url").val());
	});


});
//
//function check_tls(url){
//	$.ajax({
//		url: '/tls',
//		type: "POST",
//		data:{'hostName':url},
//		success: function(result){
//
//
//			if($("#protocol_result").length==1){
//				$("#protocol_result").text(result);
//
//			}else{
//				get_check_result(result);
//			}
//
//		},
//		error:function(e){
//			alert(e.responseText);
//		}
//	});
//}

function check_tls(url) {
	var socket = io.connect();
	socket.emit('tls', url);
	socket.on('result', function(result) {
		if($("#protocol_result").length==1){
			$("#protocol_result").text(result);

		}else{
			get_check_result(result);
		}
	});
}
