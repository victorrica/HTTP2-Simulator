
loadjscssfile("http://script.gmarket.co.kr/jQuery/1.6.4/jquery-1.6.4.min.js", "js");
loadjscssfile("http://script.gmarket.co.kr/pc/js/ko/common/display_ad.js", "js");
loadjscssfile("http://script.gmarket.co.kr/_Net/css/core/reset.css", "css");
loadjscssfile("http://script.gmarket.co.kr/pc/css/ko/common/display_ad.css", "css");
	
function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
	

		// ��ܱ��� ǥ�� 2
		document.write("<div class=\"ad_bnr_wrap type2\"><a href=\"#link_none\" class=\"ad_bnr_btn\">������ �ڼ�������</a><div class=\"ad_bnr_layer\"style=\"z-index:9000;display: none;\"><em></em><p>������</p><a href=\"#\" onclick=\"this.parentNode.style.display = 'none'; return false;\"class=\"ad_bnr_close\">�ݱ�</a></div></div>");
	
	//bannerKind : G
	document.write("<A href=\"javascript:check_ad_link('47407','96952','http://promotion.gmarket.co.kr/planview/plan.asp?sid=131124')\"><img src=\"http://image.gmarket.co.kr/ad_seller/2015/08/10/20150810104110576622_785_295.jpg\" width=\"785\" height=\"295\" border=\"0\" alt=\"���ȷ� Ÿ���ƿ콺+��Ƽ��Ʈ\" ></a>");
	
	
document.write("<div style=\"display:none;\"><img id=\"ad_check_img\" name=\"ad_check_img\" src=\"http://adlog.gmarket.co.kr/adcheck.html?bid_ad_no=96952&bid_banner_ad_no=47407&ad_type=1\" width=\"0\" height=\"0\" border=\"0\"  alt=\"���̹���\"></div>");
function check_ad_link(sBidBannerAdNo,sBidAdNo,sLinkUrl) //1
{
  document.getElementById("ad_check_img").src = "http://adlog.gmarket.co.kr/adcheck.html?bid_ad_no="+sBidAdNo+"&bid_banner_ad_no="+sBidBannerAdNo+"&ad_type=2" ;
	window.open(sLinkUrl);
}


<!--2015-08-20 13:04:04-->