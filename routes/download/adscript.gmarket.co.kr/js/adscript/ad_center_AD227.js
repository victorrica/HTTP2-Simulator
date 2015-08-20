
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
	

var sAdcnt = "10";
var arrADCenterBanner = new Array(sAdcnt);
for(var i=0; i<sAdcnt;  i++)
{
    arrADCenterBanner[i] = new Array(8);
}    
arrADCenterBanner[0]['BANNER_AD_NO'] = "46936";
arrADCenterBanner[0]['AD_NO'] = "96538";
arrADCenterBanner[0]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/07/03/20150703140154207990_168_328.jpg";
arrADCenterBanner[0]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_OB_eC_1507_gm_168328,RTRK_OB_eC_1507_gm_168328.html";
arrADCenterBanner[0]['BANNER_TEXT'] = "구강 안티에이징을 위한 오랄비 전동칫솔";
arrADCenterBanner[0]['IMG_GUBUN'] = "M";
arrADCenterBanner[0]['IMG_WIDTH'] = "168";
arrADCenterBanner[0]['IMG_HEIGHT'] = "328";
arrADCenterBanner[0]['BANNER_KIND'] = "G";
arrADCenterBanner[1]['BANNER_AD_NO'] = "47326";
arrADCenterBanner[1]['AD_NO'] = "96881";
arrADCenterBanner[1]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/17/20150817141108371428_168_328.jpg";
arrADCenterBanner[1]['URL'] = "http://event.okpoint.co.kr/event/gateway?c_code=c00000007&e_code=e00000117&s_code=s00000118";
arrADCenterBanner[1]['BANNER_TEXT'] = "G마켓 5천원 제휴할인쿠폰";
arrADCenterBanner[1]['IMG_GUBUN'] = "M";
arrADCenterBanner[1]['IMG_WIDTH'] = "168";
arrADCenterBanner[1]['IMG_HEIGHT'] = "328";
arrADCenterBanner[1]['BANNER_KIND'] = "G";
arrADCenterBanner[2]['BANNER_AD_NO'] = "47406";
arrADCenterBanner[2]['AD_NO'] = "96951";
arrADCenterBanner[2]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/10/20150810104032233429_168_328.jpg";
arrADCenterBanner[2]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=131124";
arrADCenterBanner[2]['BANNER_TEXT'] = "홈앤쇼핑 연간광고";
arrADCenterBanner[2]['IMG_GUBUN'] = "M";
arrADCenterBanner[2]['IMG_WIDTH'] = "168";
arrADCenterBanner[2]['IMG_HEIGHT'] = "328";
arrADCenterBanner[2]['BANNER_KIND'] = "G";
arrADCenterBanner[3]['BANNER_AD_NO'] = "47460";
arrADCenterBanner[3]['AD_NO'] = "96997";
arrADCenterBanner[3]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/07/30/20150730120245623958_168_328.jpg";
arrADCenterBanner[3]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_DW_EC_1508_gm_bb,RTRK_DW_EC_1508_gm_bb.html";
arrADCenterBanner[3]['BANNER_TEXT'] = "다우니 신제품 출시 사은품 증정! 여름철 찌든 냄새를 없애주고 막아주고";
arrADCenterBanner[3]['IMG_GUBUN'] = "M";
arrADCenterBanner[3]['IMG_WIDTH'] = "168";
arrADCenterBanner[3]['IMG_HEIGHT'] = "328";
arrADCenterBanner[3]['BANNER_KIND'] = "G";
arrADCenterBanner[4]['BANNER_AD_NO'] = "47568";
arrADCenterBanner[4]['AD_NO'] = "97091";
arrADCenterBanner[4]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/07/23/20150723114216695727_168_328.jpg";
arrADCenterBanner[4]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=137626";
arrADCenterBanner[4]['BANNER_TEXT'] = "느낌여행 태안, 총 100명 커피 상품권 증정.";
arrADCenterBanner[4]['IMG_GUBUN'] = "M";
arrADCenterBanner[4]['IMG_WIDTH'] = "168";
arrADCenterBanner[4]['IMG_HEIGHT'] = "328";
arrADCenterBanner[4]['BANNER_KIND'] = "G";
arrADCenterBanner[5]['BANNER_AD_NO'] = "47727";
arrADCenterBanner[5]['AD_NO'] = "97236";
arrADCenterBanner[5]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/03/20150803145919317910_168_328.jpg";
arrADCenterBanner[5]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_MB_EC_1507_gm_bb,RTRK_MB_EC_1507_gm_bb.html";
arrADCenterBanner[5]['BANNER_TEXT'] = "썸머 구조대 출동! 여름을 구하라!";
arrADCenterBanner[5]['IMG_GUBUN'] = "M";
arrADCenterBanner[5]['IMG_WIDTH'] = "168";
arrADCenterBanner[5]['IMG_HEIGHT'] = "328";
arrADCenterBanner[5]['BANNER_KIND'] = "G";
arrADCenterBanner[6]['BANNER_AD_NO'] = "47765";
arrADCenterBanner[6]['AD_NO'] = "97271";
arrADCenterBanner[6]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/13/20150813160153139038_168_328.jpg";
arrADCenterBanner[6]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=133686";
arrADCenterBanner[6]['BANNER_TEXT'] = "동원8월행사 5%할인/머그컵증정";
arrADCenterBanner[6]['IMG_GUBUN'] = "M";
arrADCenterBanner[6]['IMG_WIDTH'] = "168";
arrADCenterBanner[6]['IMG_HEIGHT'] = "328";
arrADCenterBanner[6]['BANNER_KIND'] = "G";
arrADCenterBanner[7]['BANNER_AD_NO'] = "47841";
arrADCenterBanner[7]['AD_NO'] = "97343";
arrADCenterBanner[7]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/03/20150803145852636352_168_328.jpg";
arrADCenterBanner[7]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_MB_EC_1507_gm_bb,RTRK_MB_EC_1507_gm_bb.html";
arrADCenterBanner[7]['BANNER_TEXT'] = "썸머 구조대 출동! 여름을 구하라!";
arrADCenterBanner[7]['IMG_GUBUN'] = "M";
arrADCenterBanner[7]['IMG_WIDTH'] = "168";
arrADCenterBanner[7]['IMG_HEIGHT'] = "328";
arrADCenterBanner[7]['BANNER_KIND'] = "G";
arrADCenterBanner[8]['BANNER_AD_NO'] = "47876";
arrADCenterBanner[8]['AD_NO'] = "97375";
arrADCenterBanner[8]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/07/31/20150731153220536687_168_328.jpg";
arrADCenterBanner[8]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_FB_eC_1508_gm_bb_c,RTRK_FB_eC_1508_gm_bb_c.html";
arrADCenterBanner[8]['BANNER_TEXT'] = "페브리즈 차량용 지금 구매시 사은품 100% 증정";
arrADCenterBanner[8]['IMG_GUBUN'] = "M";
arrADCenterBanner[8]['IMG_WIDTH'] = "168";
arrADCenterBanner[8]['IMG_HEIGHT'] = "328";
arrADCenterBanner[8]['BANNER_KIND'] = "G";
arrADCenterBanner[9]['BANNER_AD_NO'] = "47975";
arrADCenterBanner[9]['AD_NO'] = "97471";
arrADCenterBanner[9]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/07/20150807100853388116_168_328.jpg";
arrADCenterBanner[9]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=112802";
arrADCenterBanner[9]['BANNER_TEXT'] = "항공권 싸게 사는법 아시아나 항공 타면 10만원 추가 할인";
arrADCenterBanner[9]['IMG_GUBUN'] = "M";
arrADCenterBanner[9]['IMG_WIDTH'] = "168";
arrADCenterBanner[9]['IMG_HEIGHT'] = "328";
arrADCenterBanner[9]['BANNER_KIND'] = "G";


var sADRndNum = Math.floor(Math.random() * sAdcnt);

if (arrADCenterBanner[sADRndNum]['IMG_GUBUN'] == "S"){
  document.write("<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"");
  document.write("codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+arrADCenterBanner[sADRndNum]['IMG_WIDTH']+"\" HEIGHT=\""+arrADCenterBanner[sADRndNum]['IMG_HEIGHT']+"\" id=\"mx\" ALIGN=\"\">");
  document.write("<PARAM NAME=movie VALUE=\""+arrADCenterBanner[sADRndNum]['IMG']+"\">");
  document.write("<PARAM NAME=quality VALUE=high><PARAM NAME=wmode VALUE=transparent><PARAM NAME=bgcolor VALUE=#FFFFFF><param name=allowScriptAccess value=always>");
  document.write("<EMBED src=\""+arrADCenterBanner[sADRndNum]['IMG']+"\"");
  document.write("quality=high wmode=transparent bgcolor=\"#FFFFFF\" allowScriptAccess=\"always\" NAME=\"mx\" ALIGN=\"\" WIDTH=\""+arrADCenterBanner[sADRndNum]['IMG_WIDTH']+"\" HEIGHT=\""+arrADCenterBanner[sADRndNum]['IMG_HEIGHT']+"\" TYPE=\"application/x-shockwave-flash\"");
  document.write("PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>");
  
    function link_go()
    {
        check_ad_link(arrADCenterBanner[sADRndNum]['BANNER_AD_NO'],arrADCenterBanner[sADRndNum]['AD_NO'],arrADCenterBanner[sADRndNum]['URL']);  
    }
    
    function link2_go()
    {
        check_ad_link(arrADCenterBannerSub[sADRndNum]['BANNER_AD_NO'],arrADCenterBannerSub[sADRndNum]['AD_NO'],arrADCenterBannerSub[sADRndNum]['URL']);  
    }
    
    function BrandAdClose()
    {
	    document.getElementById('AdBrandingBoard').style.display ="none";
	    document.getElementById("AdBrandingBoardDiv").style.zIndex = "7";
    }

    function BrandAdView()
    {
	    var adbrandingflash= arrADCenterBannerSub[sADRndNum]['IMG'];
	    document.getElementById("ad_check_img").src = "http://adlog.gmarket.co.kr/adcheck.html?bid_ad_no="+arrADCenterBannerSub[sADRndNum]['AD_NO']+"&bid_banner_ad_no="+arrADCenterBannerSub[sADRndNum]['BANNER_AD_NO']+"&ad_type=1"
	    document.getElementById("AdBrandingBoardDiv").style.zIndex = "1007";
	    document.getElementById("AdBrandingBoard").style.display = "";
	    document.getElementById("AdBrandingBoard").innerHTML = getflashPlayerHTML(adbrandingflash, adbrandingflash, arrADCenterBannerSub[sADRndNum]['IMG_WIDTH'], arrADCenterBannerSub[sADRndNum]['IMG_HEIGHT'], "AdBrandingBoard");
    }
}else{		
	
		// 상단광고 표시  2
		if(arrADCenterBanner[sADRndNum]['BANNER_KIND'] != "H")
			document.write("<div class=\"ad_bnr_wrap type2\"><a href=\"#link_none\" class=\"ad_bnr_btn\">광고배너 자세히보기</a><div class=\"ad_bnr_layer\"style=\"z-index:9000;display: none;\"><em></em><p>광고배너</p><a href=\"#\" onclick=\"this.parentNode.style.display = 'none'; return false;\"class=\"ad_bnr_close\">닫기</a></div></div>");
	
    document.write("<A href=\"javascript:check_ad_link('"+arrADCenterBanner[sADRndNum]['BANNER_AD_NO']+"','"+arrADCenterBanner[sADRndNum]['AD_NO']+"','"+arrADCenterBanner[sADRndNum]['URL']+"')\"><img src=\""+arrADCenterBanner[sADRndNum]['IMG']+"\" width=\""+arrADCenterBanner[sADRndNum]['IMG_WIDTH']+"\" height=\""+arrADCenterBanner[sADRndNum]['IMG_HEIGHT']+"\" border=\"0\" alt=\""+arrADCenterBanner[sADRndNum]['BANNER_TEXT']+"\" ></a>");
	
}

document.write("<div style=\"display:none;\"><img id=\"ad_check_img\" name=\"ad_check_img\" src=\"http://adlog.gmarket.co.kr/adcheck.html?bid_ad_no="+arrADCenterBanner[sADRndNum]['AD_NO']+"&bid_banner_ad_no="+arrADCenterBanner[sADRndNum]['BANNER_AD_NO']+"&ad_type=1\" width=\"0\" height=\"0\" border=\"0\" alt=\"빈이미지\"></div>");

function check_ad_link(sBidBannerAdNo,sBidAdNo,sLinkUrl) //2
{
    document.getElementById("ad_check_img").src = "http://adlog.gmarket.co.kr/adcheck.html?bid_ad_no="+sBidAdNo+"&bid_banner_ad_no="+sBidBannerAdNo+"&ad_type=2" ;
    window.open(sLinkUrl);
}


<!--2015-08-20 13:03:01-->