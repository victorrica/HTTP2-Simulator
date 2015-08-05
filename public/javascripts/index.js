function updateResultArea(txt) {
	$('#result').text(txt);
}
var FAILMSG = "This site is not supported.";
var OKMSG = "This site supports ";

function checkWeb(url) {
	$.ajax({
		type: "POST",
		url: "https://www.h2check.org/api/check",
		data: "hostname=" + url + "&public=true",
		success: function(result) {
			if(result.error) {
				updateResultArea(FAILMSG);
			} else if(result.status == 0 || data.status == 1) {
				updateResultArea(OKMSG+result.protocol+".");
			} else
				updateResultArea(OKMSG+result.protocol+".");
		},
		error:function(e){
			alert(e.responseText);
		}
	});
}

function checkh2(url){
	$.ajax({
		url: '/check',
		type: "POST",
		data:{'hostName':'https://'+url},
		success: function(result){
			var res;
			if(result.status == 2) {
				updateResultArea(OKMSG + result.value + ".");
			} else {
				checkWeb(url);
			}
		},
		error:function(e){
			alert(e.responseText);
		}
	});
}


function check_tls(url){
	$.ajax({
		//url: "https://www.h2check.org/javascripts/check",
		url: '/tls',
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


	$("#start").click(function(){
		var json = checkh2($("#hostname").val());
	});

});



