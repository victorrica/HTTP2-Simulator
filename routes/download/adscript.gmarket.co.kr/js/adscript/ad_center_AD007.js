
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
	

var sAdcnt = "12";
var arrADCenterBanner = new Array(sAdcnt);
for(var i=0; i<sAdcnt;  i++)
{
    arrADCenterBanner[i] = new Array(8);
}    
arrADCenterBanner[0]['BANNER_AD_NO'] = "47504";
arrADCenterBanner[0]['AD_NO'] = "97036";
arrADCenterBanner[0]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/19/20150819180926921296_190_107.jpg";
arrADCenterBanner[0]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=138449";
arrADCenterBanner[0]['BANNER_TEXT'] = "이니스프리 빅세일 광고 캠페인";
arrADCenterBanner[0]['IMG_GUBUN'] = "M";
arrADCenterBanner[0]['IMG_WIDTH'] = "190";
arrADCenterBanner[0]['IMG_HEIGHT'] = "107";
arrADCenterBanner[0]['BANNER_KIND'] = "G";
arrADCenterBanner[1]['BANNER_AD_NO'] = "47660";
arrADCenterBanner[1]['AD_NO'] = "97176";
arrADCenterBanner[1]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/17/20150817092150972471_190_107.jpg";
arrADCenterBanner[1]['URL'] = "http://item2.gmarket.co.kr/Item/detailview/Item.aspx?goodscode=485210704";
arrADCenterBanner[1]['BANNER_TEXT'] = "샤프란 섬유유연제";
arrADCenterBanner[1]['IMG_GUBUN'] = "M";
arrADCenterBanner[1]['IMG_WIDTH'] = "190";
arrADCenterBanner[1]['IMG_HEIGHT'] = "107";
arrADCenterBanner[1]['BANNER_KIND'] = "G";
arrADCenterBanner[2]['BANNER_AD_NO'] = "47661";
arrADCenterBanner[2]['AD_NO'] = "97177";
arrADCenterBanner[2]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/17/20150817092130579262_190_107.jpg";
arrADCenterBanner[2]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=138373";
arrADCenterBanner[2]['BANNER_TEXT'] = "LG PC 그램";
arrADCenterBanner[2]['IMG_GUBUN'] = "M";
arrADCenterBanner[2]['IMG_WIDTH'] = "190";
arrADCenterBanner[2]['IMG_HEIGHT'] = "107";
arrADCenterBanner[2]['BANNER_KIND'] = "G";
arrADCenterBanner[3]['BANNER_AD_NO'] = "47723";
arrADCenterBanner[3]['AD_NO'] = "97232";
arrADCenterBanner[3]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/17/20150817140938344489_190_107.jpg";
arrADCenterBanner[3]['URL'] = "http://event.okpoint.co.kr/event/gateway?c_code=c00000007&e_code=e00000121&s_code=s00000122";
arrADCenterBanner[3]['BANNER_TEXT'] = "최선 포인트몰 15년";
arrADCenterBanner[3]['IMG_GUBUN'] = "M";
arrADCenterBanner[3]['IMG_WIDTH'] = "190";
arrADCenterBanner[3]['IMG_HEIGHT'] = "107";
arrADCenterBanner[3]['BANNER_KIND'] = "G";
arrADCenterBanner[4]['BANNER_AD_NO'] = "47769";
arrADCenterBanner[4]['AD_NO'] = "97275";
arrADCenterBanner[4]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/11/20150811110500953971_190_107.jpg";
arrADCenterBanner[4]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=138340";
arrADCenterBanner[4]['BANNER_TEXT'] = "LG포켓포토 8월 캠페인";
arrADCenterBanner[4]['IMG_GUBUN'] = "M";
arrADCenterBanner[4]['IMG_WIDTH'] = "190";
arrADCenterBanner[4]['IMG_HEIGHT'] = "107";
arrADCenterBanner[4]['BANNER_KIND'] = "G";
arrADCenterBanner[5]['BANNER_AD_NO'] = "47856";
arrADCenterBanner[5]['AD_NO'] = "97358";
arrADCenterBanner[5]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/12/20150812182028644826_190_107.jpg";
arrADCenterBanner[5]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=138133";
arrADCenterBanner[5]['BANNER_TEXT'] = "코리아테크 8월 캠페인";
arrADCenterBanner[5]['IMG_GUBUN'] = "M";
arrADCenterBanner[5]['IMG_WIDTH'] = "190";
arrADCenterBanner[5]['IMG_HEIGHT'] = "107";
arrADCenterBanner[5]['BANNER_KIND'] = "G";
arrADCenterBanner[6]['BANNER_AD_NO'] = "47973";
arrADCenterBanner[6]['AD_NO'] = "97469";
arrADCenterBanner[6]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/07/20150807095528735760_190_107.jpg";
arrADCenterBanner[6]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=112802";
arrADCenterBanner[6]['BANNER_TEXT'] = "항공권 싸게 사는법 아시아나 항공 타면 10만원 추가 할인";
arrADCenterBanner[6]['IMG_GUBUN'] = "M";
arrADCenterBanner[6]['IMG_WIDTH'] = "190";
arrADCenterBanner[6]['IMG_HEIGHT'] = "107";
arrADCenterBanner[6]['BANNER_KIND'] = "G";
arrADCenterBanner[7]['BANNER_AD_NO'] = "48029";
arrADCenterBanner[7]['AD_NO'] = "97517";
arrADCenterBanner[7]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/13/20150813135558848347_190_107.jpg";
arrADCenterBanner[7]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=138193";
arrADCenterBanner[7]['BANNER_TEXT'] = "삼성TV모니터 힘내라, 대한민국";
arrADCenterBanner[7]['IMG_GUBUN'] = "M";
arrADCenterBanner[7]['IMG_WIDTH'] = "190";
arrADCenterBanner[7]['IMG_HEIGHT'] = "107";
arrADCenterBanner[7]['BANNER_KIND'] = "G";
arrADCenterBanner[8]['BANNER_AD_NO'] = "48087";
arrADCenterBanner[8]['AD_NO'] = "97568";
arrADCenterBanner[8]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/17/20150817182034936340_190_107.jpg";
arrADCenterBanner[8]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_PT_eC_1508_gm_190107,RTRK_PT_eC_1508_gm_190107.html";
arrADCenterBanner[8]['BANNER_TEXT'] = "팬틴 무실리콘 샴푸로 여름 헤어 고민을 씻자!";
arrADCenterBanner[8]['IMG_GUBUN'] = "M";
arrADCenterBanner[8]['IMG_WIDTH'] = "190";
arrADCenterBanner[8]['IMG_HEIGHT'] = "107";
arrADCenterBanner[8]['BANNER_KIND'] = "G";
arrADCenterBanner[9]['BANNER_AD_NO'] = "48206";
arrADCenterBanner[9]['AD_NO'] = "97674";
arrADCenterBanner[9]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/13/20150813143756121755_190_107.jpg";
arrADCenterBanner[9]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_MB_EC_1507_gm_mtop,RTRK_MB_EC_1507_gm_mtop.html";
arrADCenterBanner[9]['BANNER_TEXT'] = "썸머 구조대 출동! 여름을 구하라!";
arrADCenterBanner[9]['IMG_GUBUN'] = "M";
arrADCenterBanner[9]['IMG_WIDTH'] = "190";
arrADCenterBanner[9]['IMG_HEIGHT'] = "107";
arrADCenterBanner[9]['BANNER_KIND'] = "G";
arrADCenterBanner[10]['BANNER_AD_NO'] = "48207";
arrADCenterBanner[10]['AD_NO'] = "97675";
arrADCenterBanner[10]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/13/20150813143806758764_190_107.jpg";
arrADCenterBanner[10]['URL'] = "http://c1.247realmedia.co.kr/RealMedia/ads/adstream.clk/gmarket/main@BottomLeft,MediaCom/RTRK_MB_EC_1507_gm_mtop,RTRK_MB_EC_1507_gm_mtop.html";
arrADCenterBanner[10]['BANNER_TEXT'] = "썸머 구조대 출동! 여름을 구하라!";
arrADCenterBanner[10]['IMG_GUBUN'] = "M";
arrADCenterBanner[10]['IMG_WIDTH'] = "190";
arrADCenterBanner[10]['IMG_HEIGHT'] = "107";
arrADCenterBanner[10]['BANNER_KIND'] = "G";
arrADCenterBanner[11]['BANNER_AD_NO'] = "48266";
arrADCenterBanner[11]['AD_NO'] = "97731";
arrADCenterBanner[11]['IMG'] = "http://image.gmarket.co.kr/ad_seller/2015/08/17/20150817152400632669_190_107.jpg";
arrADCenterBanner[11]['URL'] = "http://promotion.gmarket.co.kr/planview/plan.asp?sid=126780";
arrADCenterBanner[11]['BANNER_TEXT'] = "홍콩 디즈니랜드 한달 간 빅 세일";
arrADCenterBanner[11]['IMG_GUBUN'] = "M";
arrADCenterBanner[11]['IMG_WIDTH'] = "190";
arrADCenterBanner[11]['IMG_HEIGHT'] = "107";
arrADCenterBanner[11]['BANNER_KIND'] = "G";


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