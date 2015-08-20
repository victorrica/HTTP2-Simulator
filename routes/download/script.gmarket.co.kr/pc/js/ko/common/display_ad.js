/*
$(document).ready ���� ����. page�� window.onload�� �浹���� �ʰ� ȣ�������� ó��
*/

//window.onload ��ȸ �Ͽ� ���� ȣ��
addLoadEvent(funLoad);
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		};
	}
}

//���� ���� script
function funLoad(){
	$(".ad_bnr_wrap .ad_bnr_btn").each(function (index) {
		$(".ad_bnr_layer").css({ display: "none" });
		$(this).bind("click keyup", function (e) {
			e.preventDefault();
			if ($(this).next(".ad_bnr_layer").css("display") == "none") {
				$(".ad_bnr_wrap .ad_bnr_layer").hide().css("z-index", "1");
				$(this).next(".ad_bnr_layer").show().css("z-index", "9000");
			} else {
				$(this).next(".ad_bnr_layer").hide();
				$(this).next(".ad_bnr_layer").css("z-index", "1");
			}
		});
	});
	$("div.ad_bnr_layer a.ad_bnr_close").bind("click keyup", function (e) {
		$(".ad_bnr_wrap > .ad_bnr_layer").hide();
		$(this).parent().parent().find(".ad_bnr_btn").focus();
	});
}