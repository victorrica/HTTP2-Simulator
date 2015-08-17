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

function get_check_result(result){

	$.ajax({
		url: "/check_result",
		success: function (data) {
			$('body').append(data);
			$("#protocol_result").text(result);

		},
		dataType: 'html'
	});
}


$(document).ready(function(){


	//$("#start").click(function(){
	//	var json = checkh2($("#hostname").val());
	//});

	$("#start").click(function(){
		check_tls($("#url").val());
	});

	$("#next").click(function(){

		click_next();

	});

});
