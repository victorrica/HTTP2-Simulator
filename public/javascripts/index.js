function checkh2(url){
	$.ajax({
		//url: "https://www.h2check.org/javascripts/check",
		url: '/check',
		type: "POST",
		data:{'hostName':'https://'+url},
		//data: "hostname=" + url.substring(8, url.length).replace("/", "") + "&public=true",
		success: function(result){
			var res;
			if(result.status == 2) {
				res = "This site supports " + result.value + ".";
			} else {
				res = result.value;
			}
			$('#result').text(res);
			/*			if(data.error)
				alert("443포트, SSL이 적용되어있지 않습니다.");*/
				 //호스트에 연결 에러, 이 서비스에 포트가 열려있습니까? 그리고 방화벽으로 방해 되지 않았습니까? 꼭, HTTP/2를 위한 https를 이용한 443 포트가 열려 있어야 합니다.
			/*else if(data.status == 0 || data.status == 1)
				alert("이 사이트는 " + data.protocol + "프로토컬을 이용중입니다");*/
/*			else if(result.status == 2)
				res = "버전 : " + result.value + ".";
			else if(result.status == 4)
				res = result.value;
			else
				alert("이 사이트는 HTTP/2 를 지원하지 않습니다");*/
			//$('#result').text(res);
		},
		error:function(e){
			alert(e.responseText);
		}
	});
}
$(document).ready(function(){

/*	$("#container > #url").keyup(function(e){
		var url = $("#url").val();
		if(url.substring(0, 8) != "https://")
			$(this).val("https://");
		if(e.keyCode == 13)
			$("#start").click();
	});

	$("#container > #url").click(function(){
		if($(this).val() == "")
			$(this).val("https://");
	})*/

	/*$("#start").click(function(){
		var json = checkh2($("#url").val());
	});*/
	$("#start").click(function(){
		var json = checkh2($("#hostname").val());
	});
});



