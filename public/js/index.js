/*
$(document).ready(function(){
	$("#url").keyup(function(e){
		var url = $("#url").val();
		if(url.substring(0, 8) != "https://")
			$(this).val("https://");
		if(e.keyCode == 13)
	    	$("#start").click();
	});
	
	$("#url").click(function(){
		if($(this).val() == "")
			$(this).val("https://");
	});
});
*/


function check_tls(url){
	$.ajax({
		//url: "https://www.google.com",
		url: '/tls',
		type: "POST",
		data:{'hostName':url},
		//data: "hostname=" + url.substring(8, url.length).replace("/", "") + "&public=true",
		success: function(result){


			if($("#protocol_result").length==1){
				alert("두번째 검사");
				$("#protocol_result").text(result);

			}else{
				alert("첫번째 검사");
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

		}
	});
}


$(document).ready(function(){


	$("#start").click(function(){
		check_tls($("#url").val());
	});


});
