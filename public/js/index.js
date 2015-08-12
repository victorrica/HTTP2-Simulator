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

			//alert(result);
			$("#protocol_result").text(result);
			$("#one").css("visibility","visible");
			$("#one").css("display","block");
			$(location).attr('href',"/#one");


		},
		error:function(e){
			alert(e.responseText);
		}
	});
}

$(document).ready(function(){


	//$("#start").click(function(){
	//	var json = checkh2($("#hostname").val());
	//});

	$("#start").click(function(){
		var json = check_tls($("#url").val());
	});

	$("#next").click(function(){
		$("#two").css("visibility","visible");
		$("#two").css("display","block");
		$(location).attr('href',"/#two");
	});

});
