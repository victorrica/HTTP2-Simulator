// ie6 png24 
function setPng24(obj) {
	obj.width = obj.height = 1;
	obj.className = obj.className.replace(/\bpng24\b/i, '');
	obj.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + obj.src + '",sizingMethod="image");';
	obj.src = 'http://image.gmarket.co.kr/challenge/neo_image/1pixel.gif';
	return '';
}

//layer
function openLay(id) {
	var layer = document.getElementById(id);
	layer.style.display = 'block';
}

function closeLay(id) {
	var layer = document.getElementById(id);
	layer.style.display = 'none';
}

function closeStartPageLay(id) {

	if ((id == "startPageAfter") && (document.getElementById("startPageClose").checked)) {
		setCookie("startPageY", "Y", 1);
	}
	var layer = document.getElementById(id);
	layer.style.display = 'none';
}

function showBottomBanner() {
	var rNum = Math.floor(Math.random() * 3);
	var rstr, rhref, rhtml
	if (rNum == 0) {
		rstr = "link4";
		rhref = "http://www.kcp.co.kr/";
		rhtml = "KCP";
	} else if (rNum == 1) {
		rstr = "link5";
		rhref = "http://www.nicevan.co.kr/";
		rhtml = "NICE";
	} else {
		rstr = "link6";
		rhref = "http://www.ksnet.co.kr/";
		rhtml = "KSNET";
	}

	$j("#BottomBan22").attr('class', rstr);
	$j("#BottomBan22").attr('href', rhref);

}

var awardSeq = 1;
function showAward(seq) {

	$htmlStr = "";
	var awardNM1 = "국가고객만족지수 <br>1위 (2011, 2014)";
	var awardNM2 = "한국산업의 브랜드파워<br>5년 연속 1위 (2011~2015)";
	var awardNM3 = "국가브랜드 경쟁력지수<br>8년 연속 1위 (2007~2014)";
	var awardNM4 = "최고의 브랜드대상<br>4년 연속 1위 (2012~2015)";
	var awardNM5 = "Smart Brand<br>온라인유통 부문 1위(2014)";
	var awardNM6 = "퍼스트 브랜드대상<br>6년 연속 1위 (2009~2014)";
	var awardNM7 = "가장 존경받는 기업<br>4년 연속 1위 (2010~2013)";
	var awardNM8 = "고객감동브랜드지수<br>3년 연속 1위 (2012~2014)";
	var awardNM9 = "사회공헌대상<br>3년 연속 1위 (2012~2014)";
	var awardNM10 = "행복더함 사회공헌 대상<br>(2014)";
	var awardNM11 = "올해의 미래창조 경영대상<br>(2013)";
	var awardNM12 = "대한민국 사회공헌 대상<br>(2013)";

	if ((seq == -1) && (awardSeq != 1)) {
		awardSeq = awardSeq - 1;
		$htmlStr += "<li class='link" + awardSeq + "'>" + eval("awardNM" + awardSeq) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 1) + "'>" + eval("awardNM" + (awardSeq + 1)) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 2) + "'>" + eval("awardNM" + (awardSeq + 2)) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 3) + "'>" + eval("awardNM" + (awardSeq + 3)) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 4) + "'>" + eval("awardNM" + (awardSeq + 4)) + "</li>";
		$j("#awardList").html($htmlStr);
	} else if ((seq == 1) && (awardSeq < 8)) {
		awardSeq = awardSeq + 1;
		$htmlStr += "<li class='link" + awardSeq + "'>" + eval("awardNM" + awardSeq) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 1) + "'>" + eval("awardNM" + (awardSeq + 1)) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 2) + "'>" + eval("awardNM" + (awardSeq + 2)) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 3) + "'>" + eval("awardNM" + (awardSeq + 3)) + "</li>";
		$htmlStr += "<li class='link" + (awardSeq + 4) + "'>" + eval("awardNM" + (awardSeq + 4)) + "</li>";
		$j("#awardList").html($htmlStr);
	}

	if (awardSeq == 1) $j("#prevAward").attr('class', "prev");
	else $j("#prevAward").attr('class', "prev_on");

	if (awardSeq == 8) $j("#nextAward").attr('class', "next");
	else $j("#nextAward").attr('class', "next_on");

}

function openBottomWin(oUrl, oWidth, oHeight, winName) {
	var bwin = window.open(oUrl, winName, 'width=' + oWidth + ',height=' + oHeight + ',toolbar=no,status=no,resizable=no,scrollbars=no');
	bwin.focus();
}

function openHelpKind() {
	openBottomWin("http://www.gmarket.co.kr/challenge/neo_bbs/help_kind.asp", 544, 304, "bKind");
}

function openCcms() {
	jQuery("#company_mark_ftc div.pop_cont").html("<img src=\"http://image.gmarket.co.kr/_Net/core/common/layout/img_company_mark1.png\" alt=\"소비자중심경영 우수기업 인증서\" />");
	jQuery("#company_mark_ftc").toggle();
}

function openServiceCorp() {
	openBottomWin('http://www.gmarket.co.kr/challenge/neo_include/popup.asp', 500, 704, "bCorp");
}

function openGoodSite() {
	jQuery("#company_mark_opa div.pop_cont").html("<img src=\"http://image.gmarket.co.kr/_Net/core/common/layout/img_company_mark2.png\" alt=\"개인정보보호 우수사이트 인증서\" />");
	jQuery("#company_mark_opa").toggle();
}

function openReportCenter() {
	window.open('http://www.gmarket.co.kr/gmap/default.asp', 'gmap_popup');
}

function openCustHelp() {
	window.open('http://www.gmarket.co.kr/cust_help2.htm', 'cust_help', 'width=668, height=600,scrollbars=yes');
}

function getCookie(name) {
	var cname = name + "=";
	var dc = document.cookie;
	if (dc.length > 0) {
		start = dc.indexOf(cname);
		if (start != -1) {
			start += cname.length;
			end = dc.indexOf(";", start);
			if (end == -1) end = dc.length;
			return unescape(dc.substring(start, end));
		}
	}
	return null;
}

function setCookieExpire(cookieName, cookieValue, expireDate) {
	document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + expireDate.toGMTString() + ";";
}

function setCookie(cookieName, cookieValue, expireDate) {
	var today = new Date();
	today.setDate(today.getDate() + parseInt(expireDate));
	document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + today.toGMTString() + ";";
}

function deleteCookie(cookieName) {
	var expireDate = new Date();

	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

function setComma(n) {
	var reg = /(^[+-]?\d+)(\d{3})/;
	n += '';
	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');
	return n;
}

function showMyCouponPopupLayer() {
	var w = 800;
	var h = 670;
	var wParam = url_www + 'challenge/coupon/my_coupon_list.asp#' + document.domain;
	GmktPopLayerAdd(wParam, w, h);
}

function setGlobalCookie(cookieName, cookieValue, expireDate) {
	var today = new Date();
	today.setDate(today.getDate() + parseInt(expireDate));
	document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; domain=gmarket.co.kr ;expires=" + today.toGMTString() + ";";
}

function GoGlobal(type) {
	if (type == "english") {
		setGlobalCookie("charset", "enUS", 90);
		GoSNAChannel("CHM1A019", 'http://global.gmarket.co.kr/', '_blank');
	} else if (type == "china") {
		setGlobalCookie("charset", "zhCN", 90);
		GoSNAChannel("CHM1A025", 'http://global.gmarket.co.kr/', '_blank');
	}
}

function baro() { };

baro.Setting = function () {
	var result = top.window.open('http://www.gmarket.co.kr/challenge/neo_app/popupDesktopEvent.asp?gb=1', 'baro', 'width=396,height=183,left=480,top=50,toolbar=no,status=no,resizable=no,scrollbars=no,target=_top');
};

baro.SetCookie = function (cookieName, cookieValue) {
	document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/;domain=gmarket.co.kr;";
};

//main에서만 사용
baro.CookieSetRedirect = function (cookieName, cookieValue, expireDate) {
	baro.SetCookie(cookieName, cookieValue);
	baro.Redirect();
};

//main에서만 사용
baro.Redirect = function () {
	location.href = "http://www.gmarket.co.kr/?redirect=1";
};

/* rpm */
rpmAjaxCall = function (eventId) {

	var pdsUrl = "http://pds.gmarket.co.kr/scriptBrokerMsgJsonp";
	var params = { id: eventId };
	if (eventId == "l" && !!window.performance) {

		var t = window.performance.timing;

		if (!!t) {

			var paramO = {
				id: eventId,
				NaviStTick: t.navigationStart,
				LookupStTick: t.domainLookupStart,
				RequestStTick: t.requestStart,
				ResponseEdTick: t.responseEnd,
				DomLoadedStTick: t.domContentLoadedEventStart,
				LoadStTick: t.loadEventStart
			}
			if (paramO != null)
				params = paramO;
		}
	}

	$j.ajax({
		url: pdsUrl,
		data: params,
		type: "GET",
		contentType: "application/javascript; charset=utf-8",
		scriptCharset: "utf-8",
		dataType: "jsonp",
		crossdomain: true,
		error: function (request, error) {
		}
	});
}

/*UI Functions*/
$j(window).load(function () {

	rpmAjaxCall('l');  //RPM    

	if (randomTimely(12) == 0) {
		$j("#ifrmHeaderAD").attr("src", "http://ad.about.co.kr/mad/html/gmaket_pilot/main05/top_left");
	} else {
		$j("#ifrmHeaderAD").attr("src", "http://adscript.gmarket.co.kr/asp/adscript/ad_center_iframe_AD007.asp");
	}

	$j.getScript("http://www.googleadservices.com/pagead/conversion.js", function () {
		var s = ""
		s += "<noscript><div style=\"display:inline;\"><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\" src=\"http://www.googleadservices.com/pagead/conversion/1002883803/?label=_nokCLWuxAIQ25Wb3gM&amp;guid=ON&amp;script=0\"/></div></noscript>";
		$j("body").append(s);
	});

	CheckIPadSafari();
	fnHomepageYN();
	wn_so_pid(2);
	showBottomBanner();
	gmktMain_init(); //헤더 검색어 자동완성 부분
	
	fnGLOBALPageInit();

	timerB = window.setInterval("startBestSellerRoll()", 4000);

	noticePop();

	if (IsMobileBrowser() || IsMobilePadBrowser()) {
		$j(".floating").css("overflow", "hidden");
		$j(".mobile-go").show();
	}
});

// 0 ~ (n-1) 중 하나를 초 단위로 돌아가며 돌려줍니다.
function randomTimely(n) {
	var current = new Date();
	var elapsedSeconds = current.getHours() * 60 * 60 + current.getMinutes() * 60 + current.getSeconds();
	return elapsedSeconds % n;
}

$j(document).ready(function () {
	if (isSfc) {
		$j("#favicon").attr("href", url_pics + "favicon/sfcmall/favicon.ico");
	}

	rpmAjaxCall("r"); //RPM

	if (gmktMainIsIE) {
		$j(".startpage").css("display", "");
	}

	//바로접속 레이어
	jQuery(jQuery(".utill li").has(".layer")).each(function (index) {

		jQuery(this).find("> a").bind("click keyup", function () {
			if (jQuery(this).attr("class") !== undefined) {
				if (jQuery(this).hasClass("active")) {
					jQuery(".utill li a").removeClass("active").next(".layer").css("top", "-1000em").css("display", "none");
				} else {
					jQuery(".utill li a").removeClass("active").next(".layer").css("top", "-1000em");
					jQuery(this).addClass("active").next(".layer").css("top", "30px").css("display", "block");
				}
			}
		});

		jQuery(this).find("> .layer").bind("focusin", function () {
			jQuery(this).css("top", "30px");
		}).bind("focusout", function () {
			jQuery(this).css("top", "-1000em");
		});

		jQuery("div.layer a.button_close").bind("click keyup", function (e) {
			e.preventDefault();
			jQuery(this).parent("div.layer").css("top", "-1000em").prev("a").removeClass("active");
		});

	});

	//skipnavi
	jQuery(window).bind("hashchange", function () {
		var element = document.location.hash;
		if (element) {
			if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
				jQuery(element).tabIndex = -1;
			}
			jQuery(element).attr("tabindex", "0").focus();
		}
		jQuery(element).bind("focusout", function () {
			jQuery(this).removeAttr("tabindex");
		});
	});

	jQuery('#all_category .allCateCont .button_close').bind({
		'click keyup': function (e) {
			e.preventDefault();
			jQuery('#all_category .allCateCont').hide();
			jQuery('#all_category h2 a').removeClass('selected');
		}
	});

	//main_gnb
	$j("#main #main_gnb div.menu li").has("div.smenu").each(function (index) {
		$j(this).each(function (ind) {
			$j(this).bind("mouseenter focusin", function () {
				$j("#main_gnb div.menu li").removeClass("active");
				$j(this).addClass("active").find(".smenu").addClass('gnb_block');
			}).bind("mouseleave", function () {
				$j("#main_gnb div.menu li").removeClass("active");
				$j("#main_gnb div.menu li div.smenu").removeClass('gnb_block');
			});
		});
	});

	$j('#main .smenu a.close').each(function (index) {
		$j(this).bind("click focusout", function () {
			$j("#main_gnb div.menu li").removeClass("active");
			$j("#main_gnb div.menu li div.smenu").removeClass('gnb_block');
		});
	});

	$j("#main a.btn").each(function (index) {
		$j(this).bind("focusout", function () {
			$j(this).parents().removeClass("active");
			$j(this).parents().find('div.smenu').removeClass('gnb_block');
		});
	});
	//main_gnb

	try {
		$j.each(BigBannerTitle, function (index, item) {
			var tap = $j("#bigBanTab > li > a > img");
			tap[index].src = this["img"];
			if (index == 3 || index == 4) tap[index].alt = this["title"] + "광고 배너 보기";
			else tap[index].alt = this["title"] + "관련 이벤트 배너 보기";
		});
	} catch (e) { }

	ShowMainLeftTopLogo();
	showTopBanner();
	GmarketHeaderTopLink();
	SetSearchBoxAdBanner();

	ShowBigBan("L", "R");
	ShowMarkettingBan("");
	ShowBestSeller(0);
	ShowTodaySP("");
	ExtendTodaySP("#main .oteuk");

	ShowGService();
	ExtendGService('#main .service .inner');
	ShowGBrandHtml("");

	ShowSupderDeal();
	ShowG9();

	ShowFocusItem(0);
	ShowTodayPower("");
	ShowPowerMinishop("");
	ShowSpecialMarket("");

	showBottomGSpecialBenefit();
	showBottomNotice("");

	ShowMainWingG9Banner();

	showSfcBanner();
	showSfcPopup();

	//스마트배송 레이어
	$j('.smart-delivery-layer').hide();
	$j('.smart_delivery').bind({
		click: function () {
			$j(this).siblings().find('.smart-delivery-layer').toggle();
		}
	});
	$j('.smart-delivery-layer .smart_close').bind({
		click: function (e) {
			e.preventDefault();
			$j(this).parent().hide();
		}
	});

	if ($j("#bnr_main_super").length > 0) {
		if (getCookie("mainSuperBannerYN") == null) {
			$j("#bnr_main_super").show();
		}
	}

});

var ShowCategoryLayer = function (idx) {
	try {
		var item = $j("div.cate-bn-list:eq(" + idx + ")");
		var brand = $j("div.favo_wrap:eq(" + idx + ")");
		var idxVal = (idx + 1);
		var catData = CateLayerData["cat" + idxVal];

		if (typeof catData !== "undefined") {
			var ciIndex = 0;
			var ceIndex = 0;
			var cpIndex = 0;

			$j.each(catData, function (ind, catItem) {
				if (catItem.disc == "CE") { // 카테고리 레이어-제한

					var objDiv = $j("<div>");
					objDiv.html("<h4 class='brd" + ((ceIndex == 0 && idxVal != 7) ? " first" : "") + "'><a href=\"javascript:GoSNAChannel('CHM2A001', '" + catItem.linkUrl + "');\"><span>" + catItem.title + "</span></a></h4>");

					if (idxVal == 7) {
						var clsName = (ceIndex == 0) ? "fir2" : "fir2 last";
						objDiv.addClass(clsName);
					}

					ceIndex++;
					if ($j("#divCateCE" + idxVal + ">div").length < ceIndex)
						$j("#divCateCE" + idxVal).append(objDiv);
				} else if (catItem.disc == "CI") {    // 카테고리 레이어-운영
					var strHtml = "<a href=\"javascript:GoSNAChannel('CHM2A002', '" + catItem.linkUrl + "');\"><img src='" + catItem.imageUrl + "' alt='" + catItem.title + "' /></a>";
					$j(item).html(strHtml);
				} else if (catItem.disc == "CP") {    // 카테고리 레이어-인기브랜드
					if (cpIndex == 0) {
						brand.html("<div><h4>인기브랜드</h4><ul></ul></div>");
					}
					if (cpIndex < 7) {
						var objList = brand.find("ul");
						var strHtml = "<li><a href=\"javascript:GoSNAChannel('CHM2A003', '" + catItem.linkUrl + "');\">" + catItem.title + "</a></li>";
						$j(objList).append(strHtml);
					}
					cpIndex++;
				}
			});
		}
	}
	catch (e) { }
}

var bigBanChannelCode = new Array("CHM2B001", "CHM2B002", "CHM2B003", "CHM2B004", "CHM2B005", "CHM2B006");
var bigBanCurTab = 0;
var bigBanCurNum = 0;
var adBanCurTab = 0;
function ShowBigBanDot(selTab) {
	var sb = "";
	var target = "";
	try {
		$j.each(BigBanData[selTab], function (index, item) {
			if (this["adYN"] == "Y") {
				url = this["url"] + ";GoSNAChannel('" + bigBanChannelCode[selTab] + "_" + (index + 1) + "','','stat');";

			} else {
				if (selTab == 5) {
					target = "_blank";
				} else {
					target = "";
				}
				url = "javascript:GoSNAChannel('" + bigBanChannelCode[selTab] + "_" + (index + 1) + "','" + this["url"] + "', '" + target + "');";
			}

			if ((selTab == 3 || selTab == 4) && (index >= (adBanCurTab * 5) && index <= (adBanCurTab * 5) + 4)) {
				sb += "<li><a href=\"" + url + "\" onmouseover=\"ShowBigBan(" + selTab + "," + index + ");\" onfocus=\"ShowBigBan(" + selTab + "," + index + ");\" id=\"dotSeq" + selTab + "_" + index + "\" >" + this["thumb1"] + "</a></li>";
			} else if (selTab != 3 && selTab != 4) {
				sb += "<li><a href=\"" + url + "\" onmouseover=\"ShowBigBan(" + selTab + "," + index + ");\" onfocus=\"ShowBigBan(" + selTab + "," + index + ");\" id=\"dotSeq" + selTab + "_" + index + "\">" + this["thumb1"] + "</a></li>";
			}
		});

		$j(".rolling_tab > li").removeClass("active");
		$j(".rolling_tab .tab" + (selTab + 1)).addClass("active");
		$j("#tabIcon" + (selTab + 1)).html(sb);
	} catch (e) { }

}

function BigBanTab(selTab) {
	try {
		$j(".rolling_tab > li").removeClass("active");
		$j(".rolling_tab .tab" + (selTab + 1)).addClass("active");

		if (selTab == 3 || selTab == 4) {
			ShowBigBanAd(selTab, "R");
		} else {
			ShowBigBanDot(selTab);
			ShowBigBan(selTab, "R");
		}
	} catch (e) { }
}

function ShowBigBan(selTab, selNum) {
	try {
		var banLen = 0;

		if (selTab == "L") {
			bigBanCurTab = Math.floor(Math.random() * 9); //random
			if (bigBanCurTab == 6) { bigBanCurTab = 0 };
			if (bigBanCurTab == 7) { bigBanCurTab = 4 };
			if (bigBanCurTab == 8) { bigBanCurTab = 5 };
		} else {
			bigBanCurTab = selTab;
		}
		banLen = BigBanData[bigBanCurTab].length;

		if (selNum == "R") {
			bigBanCurNum = Math.floor(Math.random() * banLen); //random
		} else {
			bigBanCurNum = selNum;
		}

		if (bigBanCurTab == 3 || bigBanCurTab == 4) {
			adBanCurTab = parseInt(bigBanCurNum / 5);
		}

		if (selTab == "L") {
			ShowBigBanDot(bigBanCurTab);
		}

		var sb = "";
		$j("#tabIcon" + (bigBanCurTab + 1) + " > li > a").removeClass("active");
		$j.each(BigBanData[bigBanCurTab], function (index, item) {
			if (index == bigBanCurNum) {
				var imgHtml = "";
				var target = "";
				if (this["adYN"] == "Y") {
					imgHtml = this["img"];
				} else {
					var url = "javascript:GoSNAChannel(\"" + bigBanChannelCode[bigBanCurTab] + "\",\"" + this["url"] + "\"" + ((bigBanCurTab == 5) ? ",\"_blank\"" : "") + ");"
					imgHtml = "<a href='" + url + "'><img src='" + this["img"] + "' alt='" + this["thumb1"] + "' width='785px' height='295px' /></a>";
				}

				if (selTab == 3 || selTab == 4) {
					var randomNo = Math.floor(Math.random() * 20);
					if (randomNo == 0) {
						if (selTab == 3)
							imgHtml = '<iframe name="adbayAds" id="adbayAds" width="785" height="295" frameborder="0" scrolling="no" src="http://ad.about.co.kr/mad/html/gmaket_pilot/main01/top_left"></iframe>';
						if (selTab == 4)
							imgHtml = '<iframe name="adbayAds" id="adbayAds" width="785" height="295" frameborder="0" scrolling="no" src="http://ad.about.co.kr/mad/html/gmaket_pilot/main02/top_left"></iframe>';
					}
				}

				$j("#bigBanImg").html(imgHtml);
				$j("#aTabIcon" + bigBanCurNum).addClass("active");

				if (this["adYN"] == "N") {
					var MWForm = $j("#MainWiseLogForm");
					MWForm.attr("target", "ifrMainWiseLogForm");
					MWForm.attr("action", url_promotion + "challenge/neo_sangsul/plan_display_wiselog.asp?" + this["sid"]);
					MWForm.submit();
				}
				$j("#dotSeq" + bigBanCurTab + "_" + bigBanCurNum).addClass("active");
			}
		});
	} catch (e) { }
}

function ShowBigBanAd(selTab, selNum) {
	try {
		bigBanCurTab = selTab;
		var adBanTabLen = Math.ceil(BigBanData[bigBanCurTab].length / 5);

		if (selNum == "R") adBanCurTab = Math.floor(Math.random() * adBanTabLen);
		else adBanCurTab = adBanCurTab + selNum;

		if (adBanCurTab >= adBanTabLen) adBanCurTab = 0;
		if (adBanCurTab < 0) adBanCurTab = adBanTabLen - 1;

		bigBanCurNum = (adBanCurTab * 5) + Math.floor(Math.random() * 5);
		if (bigBanCurNum >= BigBanData[bigBanCurTab].length) bigBanCurNum = BigBanData[bigBanCurTab].length - 1;

		ShowBigBanDot(selTab);
		ShowBigBan(selTab, bigBanCurNum);
	} catch (e) { }

}

function ShowBigBanMove(selNum) {
	try {
		var banLen = BigBanData[bigBanCurTab].length;
		bigBanCurNum = bigBanCurNum + selNum;

		if (bigBanCurNum >= banLen) {
			bigBanCurTab = bigBanCurTab + 1;
			if (bigBanCurTab >= 6) {
				bigBanCurTab = 0;
			}
			bigBanCurNum = 0;
		} else if (bigBanCurNum < 0) {

			bigBanCurTab = bigBanCurTab - 1;
			if (bigBanCurTab < 0) {
				bigBanCurTab = 5;
			}
			banLen = BigBanData[bigBanCurTab].length;
			bigBanCurNum = banLen - 1;
		}

		if (bigBanCurTab == 3 || bigBanCurTab == 4) {
			adBanCurTab = parseInt(bigBanCurNum / 5);
		}

		ShowBigBanDot(bigBanCurTab);
		ShowBigBan(bigBanCurTab, bigBanCurNum);
	} catch (e) { }

}

var mktBanCurNo = 0;
var ccGubun;
function ShowMarkettingBan(selNo) {
	try {

		var rndNo = 0;

		if (typeof (selNo) == "string") {
			mktBanCurNo = Math.floor(Math.random() * markettingBanCnt);
		} else {
			mktBanCurNo = mktBanCurNo + selNo;
		}

		if (mktBanCurNo >= markettingBanCnt) { mktBanCurNo = 0 }
		if (mktBanCurNo < 0) { mktBanCurNo = markettingBanCnt - 1 }

		ccGubun = mktBanCurNo + 1;

		$j("#markettingBanLink").attr('href', "javascript:GoSNAChannel('CHM2D001_" + ccGubun + "','" + markettingBanLink[mktBanCurNo] + "');");
		$j("#markettingBanLink > img").attr('src', markettingBanImg[mktBanCurNo]);
		$j("#markettingBanLink > img").attr('alt', markettingBanAlt[mktBanCurNo]);

	} catch (e) { }
}

//Best Seller
var rollBest;
var bestCurTab = 0;
function stopBestSellerRoll() {
	window.clearTimeout(rollBest);
}

function startBestSellerRoll() {
	try {
		window.clearInterval(timerB);
		rollBest = window.setTimeout("startBestSellerRoll()", 4000);
		ShowBestSeller(1);
	} catch (e) { }
}

function pauseBestSellerRoll() {
	if ($j(".best .play").hasClass("pause")) { // 멈춤
		$j(".best .play").removeClass("pause");
		stopBestSellerRoll();
	} else { //동작
		$j(".best .play").addClass("pause");
		startBestSellerRoll();
	}
}

function ShowBestSeller(selTab) {

	try {
		var tabLen = Math.ceil(BestCnt / 4);
		if (selTab != 0) { bestCurTab = bestCurTab + selTab; }
		else { bestCurTab = selTab; }

		var rank = 0;
		var sb = "";

		if (bestCurTab >= tabLen) { bestCurTab = 0; }
		if (bestCurTab < 0) { bestCurTab = tabLen - 1; }

		var startIdx = bestCurTab * 4;
		var endIdx = startIdx + 3;
		for (var i = startIdx; i <= endIdx && i < BestCnt; i++) {
			sb += " <li>"
			sb += " 	<span class='num num" + (i + 1) + "'>" + (i + 1) + "</span>"
			sb += "	<div class='prd'>"
			sb += "		<a href=\"javascript:GoSNAChannel('CHM2E002_" + (i + 1) + "', '" + url_corners + "Bestsellers?ItemId=" + BestGdNo[i] + "#" + BestGdNo[i] + "');\"><img src='" + BestImg[i] + "' alt='' width='120px' height='120px'><span>" + BestGdNm[i] + "</span></a>"
			sb += "			<strong><span>" + BestPrice[i] + "</span>원</strong>"
			sb += "	</div>"
			sb += "</li>"

			$j("#bestRollingFrame").html(sb);

		}
	} catch (e) { }
}

//오늘만 특가
var todaySPCurTab = 0;
function ShowTodaySP(selTab) {
	try {
		var tabLen = Math.ceil(TodaySPCnt / 4);

		if (selTab == "") { selTab = Math.floor(Math.random() * tabLen); }
		if (selTab != 0) { todaySPCurTab = todaySPCurTab + selTab; }

		if (todaySPCurTab >= tabLen) { todaySPCurTab = 0 }
		if (todaySPCurTab < 0) { todaySPCurTab = tabLen - 1 }

		var startIdx = todaySPCurTab * 4;
		var endIdx = startIdx + 3;
		var sb = "";
		for (var i = startIdx; i <= endIdx && i < TodaySPCnt; i++) {

			var sellPrice, discount, discountPrice, discountRate, tempUrl, linkUrl;

			sellPrice = parseInt(TodaySPPrice1[i]);
			discountPrice = parseInt(TodaySPPrice2[i]);
			discountRate = TodaySPDisPercent[i];
			var banner_no = (TodaySPSpriceType[i] == "9") ? 0 : TodaySPRank[i];
			tempUrl = url_corners + "TodaySale?banner_no=" + banner_no + "&pos_class_cd=900000004&pos_class_kind=T&pos_shop_cd=EC";
			linkUrl = "javascript:GoSNAChannel('CHM2F002_" + (i + 1) + "', '" + tempUrl + "', '', '4');";

			sb += "<li><div class='bnr'><a href=\"" + linkUrl + "\" ><img src='" + TodaySPImg[i] + "' alt='" + TodaySPAlt[i] + "' width='120px' height='120px'><span>" + TodaySPAlt[i] + "</span><span>" + TodaySPGdNm[i] + "</span></a>";
			sb += "<div class='price-info'>";

			if ((sellPrice > 0) && (sellPrice < 10)) {
				sb += "<span class='sale-per'></span><strong>무료</strong>";
			} else if (sellPrice == 0) {
				sb += "<span class='sale-per'></span><strong>SOLD OUT</strong>";
			} else if (discountRate == 0) {
				sb += "<span class='sale-per'></span><strong>" + setComma(discountPrice) + "원</strong>";
			} else {
				sb += "<span class='sale-per'><strong>" + discountRate + "</strong>%<img src='http://image.gmarket.co.kr/_Net/corecom/main/bl_arrow1.png' alt='할인' width='5px' height='8px' /></span><strong><span>" + setComma(discountPrice) + "</span>원</strong>";
			}
			sb += "</div></div></li>";
		}
		$j("#divTodaySP").html(sb);
	} catch (e) { }

}

function ExtendTodaySP(selector) {

	var $this = $j(selector),
$more = $this.find('.more a'),
$opt = true,
$target = $j('.section .best');
	$target_button = $target.find('.more a');
	$more.click(function (e) {
		if ($opt) {
			$this.addClass('extend');
			$target.addClass('extend');
			$more.addClass('active');
			$opt = false;
			stopBestSellerRoll();
		} else {
			$this.removeClass('extend');
			$target.removeClass('extend');
			$more.removeClass('active');
			$opt = true;
			startBestSellerRoll();
		}
		e.preventDefault();
	});
	$target_button.click(function (e) {
		$opt = true;
		$this.removeClass('extend');
		$target.removeClass('extend');
		$more.removeClass('active');
		e.preventDefault();
		startBestSellerRoll();
	});
}

//G 서비스
function ShowGService() {
	try {
		var sna = 0;
		var sb = "";
		sb += "<ul>";
		for (var i = 0; i < GServiceCnt; i++) {
			sna = i + 1;
			sb += "<li><a href=\"javascript:GoSNAChannel('CHM2G001_" + sna + "','" + GServiceLink[i] + "','','" + sna + "');\" ><img src='" + GServiceImg[i] + "' alt='" + GServiceAlt[i] + "'  /></a>";
			if (GServiceNew[i] == "Y") sb += "<span class='new'>NEW</span>";
			sb += "</li>";
		}
		sb += "</ul>";
		$j(".service .inner .sprite_title").after(sb);
	} catch (e) { }
}

// G마켓 서비스
function ExtendGService(selector) {
	var $this = $j(selector),
$more = $this.find('.more a'),
$icon = $this.children('ul.icon'),
$opt = true;
	$more.click(function (e) {
		if ($opt) {
			$this.addClass('extend');
			$icon.show();
			$more.addClass('active');
			$opt = false;
		} else {
			$this.removeClass('extend');
			$more.removeClass('active');
			$icon.hide();
			$opt = true;
		}
		e.preventDefault();
	});
}

//G브랜드Html
var arrGBrandChCd = new Array("CHM2H001", "CHM2H002", "CHM2H003", "CHM2H004");
function ShowGBrandHtml(selTab) {
	try {
		var tabLen = HtmlBannerTab.length;
		var rndTab;
		if (tabLen > 0) {
			if (selTab == "") {
				rndTab = Math.floor(Math.random() * tabLen);
			} else {
				rndTab = selTab;
			}

			if (selTab == "") {
				var sb = "";
				for (var i = 0; i < tabLen; i++) {
					alt = HtmlBannerTab[i].TabName;
					sb += "<li class='tab" + (i + 1) + "' onmouseover=\"ShowGBrandHtml('" + i + "');GoSNAChannel(\'" + arrGBrandChCd[i] + "\',\'\',\'stat\');\"><a href='#' onclick=\"ShowGBrandHtml('" + i + "');GoSNAChannel(\'" + arrGBrandChCd[i] + "\',\'\',\'stat\');return false;\" ><img src='" + HtmlBannerTab[i].TabImg + "' alt='" + alt + "'  /></a></li>";
				}
				$j(".fashion_tab").html(sb);

				// fashion 이벤트 임시 스크립트
				$j('.fashion_tab a').bind({
					'mouseover keyup': function (e) {
						e.preventDefault();
						$j('.fashion_tab li').removeClass('active');
						$j(this).parent().addClass('active');
					}
				});
			}

			var pCd;
			var chCode;
			switch (parseInt(rndTab)) {
				case 1:
					pCd = "11";
					chCode = "CHM2H002_";
					break;
				case 2:
					pCd = "12";
					chCode = "CHM2H003_";
					break;
				case 3:
					pCd = "13";
					chCode = "CHM2H004_";
					break;
				case 0:
				default:
					pCd = "10";
					chCode = "CHM2H001_";
					break;
			}

			var banHtml = ""
			$j.each(HtmlBannerTab[rndTab].Banners, function (index, item) {
				var code = item.Type.replace("H", "");
				banHtml += "<li class='bnr" + code + "'><a href=\"javascript:GoSNAChannel('" + chCode + code + "','" + item.Url + "');\"><img src='" + item.Image + "' alt=\"" + item.Title + "\"></a></li>";
			});

			$j("div.fashion_cont ul").empty();
			$j("div.fashion_cont ul").html(banHtml);

			$j(".fashion_tab .tab" + (rndTab + 1)).addClass("active");
		}

	} catch (e) { }

}

//슈퍼딜
var supderDealCss = new Array("type1", "type2", "type2", "type2", "type2", "type1", "type3", "type3", "type3", "type3", "type6", "type6", "type5", "type5", "type6", "type6", "type4", "type4_1");
function ShowSupderDeal() {
	try {
		var sb = "";
		sb += "<ul>"
		sb += SupderDealDraw(0);
		sb += "<li class='group'><ul>"
		for (var i = 1; i < 3 && i < SuperDealCnt; i++) { sb += SupderDealDraw(i); }
		sb += "</ul></li></ul>";

		sb += "<ul><li class='group1'><ul>";
		for (var i = 3; i < 5 && i < SuperDealCnt; i++) { sb += SupderDealDraw(i); }
		sb += "</ul></li>";
		sb += SupderDealDraw(5);
		sb += "</ul>";

		sb += "<ul class='mini'>";
		for (var i = 6; i < 10 && i < SuperDealCnt; i++) { sb += SupderDealDraw(i); }
		sb += "</ul>";

		sb += "<ul class='mini1'>";
		for (var i = 10; i < 12 && i < SuperDealCnt; i++) { sb += SupderDealDraw(i); }
		sb += "</ul>";

		sb += "<ul class='mini2'>";
		sb += SupderDealDraw(12);
		sb += "</ul>";
		sb += "<ul class='mini2_1'>";
		sb += SupderDealDraw(13);
		sb += "</ul>";

		sb += "<ul class='mini1_1'>";
		for (var i = 14; i < 16 && i < SuperDealCnt; i++) { sb += SupderDealDraw(i); }
		sb += "</ul>";

		sb += "<ul class='larg2'>";
		for (var i = 16; i < 18 && i < SuperDealCnt; i++) { sb += SupderDealDraw(i); }
		sb += "</ul>";

		$j(".section .superdeal").append(sb);
	} catch (e) { }

}

function SupderDealDraw(idx) {
	try {
		var sellPrice, resultPrice, discountRate, unitPrice, isTpl, templinkUrl, linkUrl;

		sellPrice = parseInt(SuperDealSellPrice[idx]);
		discountPrice = parseInt(SuperDealDiscountPrice[idx]);
		discountRate = SuperDealDiscountRate[idx];
		unitPrice = SuperDealUnitPrice[idx];
		isTpl = SuperDealIsTpl[idx];

		channelCd = "CHM2J0" + ((idx + 2 < 10) ? "0" + (idx + 2) : (idx + 2));
		templinkUrl = url_item + "detailview/item.asp?goodscode=" + parseInt(SuperDealGdNo[idx]);
		linkUrl = "javascript:GoSNAChannel('" + channelCd + "', '" + templinkUrl + "', '', '4');";

		var price = "";
		var soldOutClass = "", commonSoonClass = "";
		if ((sellPrice > 0) && (sellPrice < 10)) {
			price = "<strong class='nomoney'><img src='http://image.gmarket.co.kr/_Net/core/main/txt_register_products.png' alt='가입상품'></strong>";
		} else if (sellPrice == 0) {
			price = "<strong>SOLD OUT</strong>";
			soldOutClass = "soldout";
		} else if (discountRate == 0) {
			price = "<strong>" + setComma(discountPrice) + "</strong>";
		} else {
			price = "<del>" + setComma(sellPrice) + "</del><strong>" + setComma(discountPrice) + "</strong>";
		}

		if (discountRate > 0) {
			discountRate = "<strong>" + discountRate + "</strong>%";
		} else {
			discountRate = "";
		}

		if (sellPrice >= 10 && unitPrice != "") {
			unitPrice = "(" + unitPrice + ")";
		} else {
			unitPrice = "";
		}

		var sb = "";
		sb += "<li id='sd" + (idx + 1) + "' class='deal " + supderDealCss[idx] + " " + soldOutClass + " " + commonSoonClass + "'>";
		if (soldOutClass != "") { sb += " <div class='icon_soldout'><span>품절되었습니다. SOLD OUT</span><div class='bg_soldout'></div></div>"; }
		if (commonSoonClass != "") { sb += " <div class='icon_commingsoon'><span>상품 준비중 comming soon</span><div class='bg_commingsoon'></div></div>"; }
		sb += " <div class='prd'>";
		if (isTpl == "TL") {
			sb += "		<a class=\"smart_delivery\"><em>스마트배송</em></a>";
			sb += "		<div class=\"layer\">";
			sb += "			<div class=\"smart-delivery-layer\" style=\"display:none;\">";
			sb += "				<p>";
			sb += "					<img src=\"http://image.gmarket.co.kr/_Net/core/item/list/text_smart_delivery.png\" alt=\"스마트배송 판매자가 달라도 배송비는 한번만! 오후 6시까지 주문은 당일발송!\">";
			sb += "					<a href=\"http://event.gmarket.co.kr/html/201407/140703_smartDelivery/smartDelivery.asp\" class=\"btn_detail\" target=\"_blank\" title=\"새창열림\"><img src=\"http://image.gmarket.co.kr/_Net/core/item/list/btn/btn_more.png\" alt=\"자세히보기\"></a>";
			sb += "				</p>";
			sb += "				<a href=\"javascript:;\" class=\"smart_close\"><img src=\"http://image.gmarket.co.kr/_Net/core/item/list/btn/btn_close.png\" alt=\"닫기\"></a>";
			sb += "			</div>";
			sb += "		</div>";
		}
		sb += "			<a href=\"" + linkUrl + "\">";
		if (idx == 0 || idx == 5 || idx == 12 || idx == 13) {
			sb += "			<img src='" + SuperDealImg[idx] + "' alt='" + SuperDealGdNm[idx] + SuperDealGdNm2[idx] + "' />";
			sb += "			<div class='price-info'>";
			if (discountRate != "") sb += "<span class='sale-per'>" + discountRate + "<span>SALE</span></span>";
			sb += "				<span class='title'><strong>" + SuperDealGdNm[idx] + "</strong><strong>" + SuperDealGdNm2[idx] + "</strong></span>";
			sb += "				<span class='money'>" + price + "</span>";
			if (unitPrice != "") sb += "<span class='persale'>" + unitPrice + "</span>";
			sb += "			</div>";
		} else if ((idx >= 6 && idx <= 11) || (idx >= 14 && idx <= 17)) {
			sb += "			<img src='" + SuperDealImg[idx] + "' alt='" + SuperDealGdNm[idx] + SuperDealGdNm2[idx] + "' />";
			sb += "			<div class='price-info'>";
			sb += "				<span class='title'><strong>" + SuperDealGdNm[idx] + "</strong><strong>" + SuperDealGdNm2[idx] + "</strong></span>";
			if (discountRate != "") sb += "<span class='sale-per'>" + discountRate + "</span>";
			sb += "				<span class='money'>" + price + "</span>";
			if (unitPrice != "") sb += "<span class='persale'>" + unitPrice + "</span>";
			sb += "			</div>";
		} else {
			sb += "			<div class='price-info'>";
			sb += "				<span class='title'><strong>" + SuperDealGdNm[idx] + "</strong><strong>" + SuperDealGdNm2[idx] + "</strong></span>";
			if (discountRate != "") sb += "<span class='sale-per'>" + discountRate + "</span>";
			sb += "				<span class='money'>" + price + "</span>";
			if (unitPrice != "") sb += "<span class='persale'>" + unitPrice + "</span>";
			sb += "			</div>";
			sb += "			<img src='" + SuperDealImg[idx] + "' alt='" + SuperDealGdNm[idx] + SuperDealGdNm2[idx] + "' />";
		}
		if (SuperDealTagFree[idx] == "True") {
			var freeCss = "";
			if ((idx >= 6 && idx <= 11) || idx == 14 || idx == 15) freeCss = "freedelev1";
			else if (idx >= 16 && idx <= 17) freeCss = "freedelev2";
			else freeCss = "freedelev";

			sb += "			<em class='" + freeCss + "'>무료배송</em>";
		}

		sb += "			</a>";
		sb += "		</div>";
		sb += "	</li>";
		return sb;
	} catch (e) { }
}

//G9
function ShowG9() {
	try {
		var adReportNum = "";
		var sb = "<ul class='mini'>";
		sb += "<li class='deal type3_1'><div class='prd'><a href=\"javascript:GoSNAChannel('CHM2L001','" + G9EventBan[1] + "','_blank');\" title='새창열림'><img src='" + G9EventBan[0] + "' alt='" + G9EventBan[2] + "' /></a></div></li>";

		for (var i = 0; i < 3 && i < G9ItemCnt; i++) {
			var sellPrice, resultPrice, discountRate, templinkUrl, linkUrl;

			sellPrice = parseInt(G9ItemPrice1[i]);
			discountPrice = parseInt(G9ItemPrice2[i]);
			stockQty = parseInt(G9ItemStockQty[i]);

			discount = sellPrice - discountPrice;
			discountRate = (discount / sellPrice) * 100;
			discountRate = Math.floor(discountRate);

			templinkUrl = url_g9 + "Display/VIP/Index/" + parseInt(G9ItemGdNo[i]);
			templinkUrl = "http://www.gmarket.co.kr/challenge/neo_include/login/redirect_gateway.asp?site=G9&redir=" + templinkUrl;
			linkUrl = "javascript:GoSNAChannel('CHM2L002_" + (i + 1) + "', '" + templinkUrl + "','_blank');";

			var price = "";
			var soldOutClass = "";

			if (stockQty <= 0) {
				price = "<strong>SOLD OUT</strong>";
				soldOutClass = "soldout";
				discountRate = 0;
			} else if (discountRate == 0) {
				price = "<strong>" + setComma(discountPrice) + "</strong>";
			} else {
				price = "<del>" + setComma(sellPrice) + "</del><strong>" + setComma(discountPrice) + "</strong>";
			}

			if (discountRate > 0) {
				discountRate = "<strong>" + discountRate + "</strong>%";
			} else {
				discountRate = "";
			}

			var tmpCss = "type3";
			if (i == 0) tmpCss = "type3_2";

			sb += "<li class='deal " + tmpCss + " " + soldOutClass + "'>";
			if (soldOutClass != "") {
				sb += " <div class='icon_soldout'><span>품절되었습니다. SOLD OUT</span><div class='bg_soldout'></div></div>";
			}
			sb += " <div class='prd'>";
			sb += "		<a href=\"" + linkUrl + "\" title='새창열림'>";
			sb += "			<img src='" + G9ItemImg[i] + "' alt='" + G9ItemGdNm[i] + "' />";
			sb += "			<div class='price-info'>";
			sb += "				<span class='title'>" + G9ItemGdNm[i] + "</span>";
			if (discountRate != "") sb += "<span class='sale-per'>" + discountRate + "</span>";
			sb += "				<span class='money'>" + price + "</span>";
			if (G9ItemTags[i].indexOf('1') >= 0 && stockQty > 0) sb += "<span class='btn_freeD'>무료배송</span>";
			sb += "			</div>";
			sb += "		</a>";
			sb += "	</div>";
			sb += "	</li>";

			//-- impression start            
			if (i > 0) adReportNum += ",";
			adReportNum += "A18R0S_" + i;
			//-- impression End
		}
		sb += "</ul>";
		//-- impression start
		if (adReportNum != "") {
			adReportImg = "<img src='http://pds.gmarket.co.kr/ub/add/1/impression/ad/1?ids=" + adReportNum + "' style='display:none;' width='0' height='0' alt='빈이미지' />";
			sb += adReportImg;
		}
		//-- impression End
		$j(".g9section").append(sb);
	} catch (e) { }
}
//포커스 아이템
var focusCurTab = 0;
var rollFocus
function stopFocusRoll() {
	window.clearTimeout(rollFocus);
}

function startFocusRoll() {
	try {
		rollFocus = window.setTimeout("startFocusRoll()", 4000);
		ShowFocusItem(1);
	} catch (e) { }
}

function pauseFocusRoll() {
	if ($j(".focus .play").hasClass("pause")) { // 멈춤
		$j(".focus .play").removeClass("pause");
		stopFocusRoll();

	} else { //동작
		$j(".focus .play").addClass("pause");
		startFocusRoll();
	}
}

function ShowFocusItem(selTab) {

	try {
		var sb = "";
		var tabLen = Math.ceil(FocusCnt / 4);
		var adImg = "";
		var adReportNum = "";
		var adReportImg = "";

		focusCurTab = focusCurTab + selTab;
		if (focusCurTab >= tabLen) { focusCurTab = 0 }
		if (focusCurTab < 0) { focusCurTab = tabLen - 1 }

		var startIdx = focusCurTab * 4;
		var endIdx = startIdx + 3;
		if (FocusCnt > 0) {
			for (var i = startIdx; i <= endIdx && i < FocusCnt; i++) {

				if (FocusBidNo[i] != "") {
					url = url_item + "detailview/item.asp?goodscode=" + FocusGdNo[i];
					url = "javascript:checkAdLink('" + FocusBidNo[i] + "','" + url + "','','2','AdCheckForm');adReport('A20R0S" + FocusBidNo[i] + "');GoSNAChannel('CHM2K001_" + (i + 1) + "','','stat');";

					if (i > startIdx) adReportNum += ",";
					adReportNum += "A20R0S" + FocusBidNo[i];

				} else {
					url = "javascript:GoSNAChannel('CHM2K001_" + (i + 1) + "','" + FocusUrl[i] + "');";
				}
				sb += "<li><div class='prd'><a href=" + url + "><img src='" + FocusImg[i] + "' alt='' width='200' height='200' ><span class='name'>" + FocusTxt[i] + "</span></a></div></li>";
				sb += adImg;
			}

			if (adReportNum != "") {
				adReportImg = "<img src='http://pds.gmarket.co.kr/ub/add/1/impression/ad/1?ids=" + adReportNum + "' style='display:none;' width='0' height='0' alt='빈이미지' />";
				sb += adReportImg;
			}
		}
		$j("div.focus ul").html(sb);
		$j("div.focus .page").html("<strong>" + (focusCurTab + 1) + "</strong>/" + tabLen);

	} catch (e) { }
}

//오늘의 파워 상품
var TodayPowerCurTab = 0;
function ShowTodayPower(selTab) {
	try {
		var sb = "";
		var tabLen = Math.ceil(TodayPowerCnt / 6);
		var adImg = "";
		var adReportNum = "";
		var adReportImg = "";

		if (selTab == "") { selTab = Math.floor(Math.random() * tabLen); }
		if (selTab != 0) { TodayPowerCurTab = TodayPowerCurTab + selTab; }

		if (TodayPowerCurTab >= tabLen) { TodayPowerCurTab = 0 }
		if (TodayPowerCurTab < 0) { TodayPowerCurTab = tabLen - 1 }

		var startIdx = TodayPowerCurTab * 6;
		var endIdx = startIdx + 5;
		if (TodayPowerCnt > 0) {
			for (var i = startIdx; i <= endIdx && i < TodayPowerCnt; i++) {
				url = url_item + "detailview/item.asp?goodscode=" + TodayPowerGdNo[i];
				if (TodayPowerBidNo[i] != "") {
					url = "javascript:checkAdLink('" + TodayPowerBidNo[i] + "','" + url + "','','2','AdCheckForm');adReport('A21R0S" + TodayPowerBidNo[i] + "');GoSNAChannel('CHM2K002_" + (i + 1) + "','','stat');";

					if (i > startIdx) adReportNum += ",";
					adReportNum += "A21R0S" + TodayPowerBidNo[i];
				} else {
					url = "javascript:GoSNAChannel('CHM2K002_" + (i + 1) + "','" + url + "');";
				}
				sb += " <li><div class='prd'><a href=" + url + "><img src='" + TodayPowerImg[i] + "' alt='' width='120' height='120'><span>" + TodayPowerTxt[i] + "</span></a><strong><span>" + TodayPowerPrice[i] + "</span></strong></div></li>"
				sb += adImg;
			}
			if (adReportNum != "") {
				adReportImg = "<img src='http://pds.gmarket.co.kr/ub/add/1/impression/ad/1?ids=" + adReportNum + "' style='display:none;' width='0' height='0' alt='빈이미지' />";
				sb += adReportImg;
			}
		}
		$j("div.power ul").html(sb);
		$j("div.power .page").html("<strong>" + (TodayPowerCurTab + 1) + "</strong>/" + tabLen);
	} catch (e) { }

}

//파워미니샵
var PowerMiniShopCurTab = 0;
function ShowPowerMinishop(selTab) {
	try {
		var sb = "";
		var tabLen = PowerMinishopCnt;
		var adImg = "";

		if (selTab == "") { selTab = Math.floor(Math.random() * tabLen); }
		if (selTab != 0) { PowerMiniShopCurTab = PowerMiniShopCurTab + selTab; }

		if (PowerMiniShopCurTab >= tabLen) { PowerMiniShopCurTab = 0 }
		if (PowerMiniShopCurTab < 0) { PowerMiniShopCurTab = tabLen - 1 }
		var i = PowerMiniShopCurTab;

		sb += "<li>";
		if (PowerMinishopBidNo[i] != "") {
			url = "javascript:checkAdLink('" + PowerMinishopBidNo[i] + "','" + PowerMinishopUrl[i] + "','','2','AdCheckForm');adReport('A19R0S" + PowerMinishopBidNo[i] + "');GoSNAChannel('CHM2K003_" + (i + 1) + "','','stat');";
			adImg = "<img src='http://pds.gmarket.co.kr/ub/add/1/impression/ad/A19R0S" + PowerMinishopBidNo[i] + "' style='display:none;' width='0' height='0' alt='빈이미지' />";
		} else {
			url = "javascript:GoSNAChannel('CHM2K003_" + (i + 1) + "','" + PowerMinishopUrl[i] + "');";
		}
		sb += "<a href=" + url + "><img src='" + PowerMinishopImg[i] + "' alt='파워미니샵 배너' width='490' height='213'></a>";
		sb += adImg;    //Ad report
		sb += "</li>";
		$j("div.minishop ul").html(sb);
		$j("div.minishop .page").html("<strong>" + (PowerMiniShopCurTab + 1) + "</strong>/" + tabLen);
	} catch (e) { }

}

//특가마켓
var SpecialMarketCurTab = 0;
function ShowSpecialMarket(selTab) {
	try {
		var sb = "";
		var tabLen = Math.ceil(SpecialMarketCnt / 3);
		var adReportNum = "";
		var adReportImg = "";

		if (selTab == "") { selTab = Math.floor(Math.random() * tabLen); }
		if (selTab != 0) { SpecialMarketCurTab = SpecialMarketCurTab + selTab; }

		if (SpecialMarketCurTab >= tabLen) { SpecialMarketCurTab = 0 }
		if (SpecialMarketCurTab < 0) { SpecialMarketCurTab = tabLen - 1 }

		var startIdx = SpecialMarketCurTab * 3;
		var endIdx = startIdx + 2;
		var j = 1;

		if (SpecialMarketCnt > 0) {
			for (var i = startIdx; i <= endIdx && i < SpecialMarketCnt; i++) {
				url = url_shop + "specialprice/SpecialPriceMain.asp?maingoodscode=" + SpecialMarketGdNo[i];
				if (SpecialMarketBidNo[i] != "") {
					url = "javascript:checkAdLink('" + SpecialMarketBidNo[i] + "','" + url + "','','2','AdCheckForm');adReport('A22R" + j + "S" + SpecialMarketBidNo[i] + "');GoSNAChannel('CHM2K004_" + (i + 1) + "','','stat');";

					if (i > startIdx) adReportNum += ",";
					adReportNum += "A22R" + j + "S" + SpecialMarketBidNo[i];
				} else {
					url = "javascript:GoSNAChannel('CHM2K004_" + (i + 1) + "','" + url + "');";
				}
				sb += " <li><div class='prd'><a href=" + url + "><img src='" + SpecialMarketImg[i] + "' alt='' width='120' height='120'><span>" + SpecialMarketTxt[i] + "</span></a><strong><span>" + SpecialMarketPrice[i] + "</span></strong></div></li>"
				j++;
			}

			if (adReportNum != "") {
				adReportImg = "<img src='http://pds.gmarket.co.kr/ub/add/1/impression/ad/1?ids=" + adReportNum + "' style='display:none;' width='0' height='0' alt='빈이미지' />";
				sb += adReportImg;
			}
		}
		$j("div.market ul").html(sb);
		$j("div.market .page").html("<strong>" + (SpecialMarketCurTab + 1) + "</strong>/" + tabLen);
	} catch (e) { }
}

var bottomNoticeCurTab = 0;
function showBottomNotice(selTab) {

	var ItemLen = notice.length - 1;
	var rndNoNotice = 0;

	if (selTab != 0) {
		bottomNoticeCurTab = bottomNoticeCurTab + selTab;
	} else if (selTab == "" || selTab == "undefined") {
		bottomNoticeCurTab = rndNoNotice = Math.floor(Math.random() * (ItemLen))
	}
	if (bottomNoticeCurTab > ItemLen) { bottomNoticeCurTab = 0 }
	if (bottomNoticeCurTab < 0) { bottomNoticeCurTab = ItemLen }

	var linkUrl = "";
	if (notice[bottomNoticeCurTab].link_kind == "L") linkUrl = "javascript:GoSNA('126000005','','" + notice[bottomNoticeCurTab].link + "','');"
	else if (notice[bottomNoticeCurTab].link_kind == "N") linkUrl = "javascript:GoSNAD('126000005','','" + notice[bottomNoticeCurTab].link + "','_blank');"
	else linkUrl = "javascript:GoSNAD('126000005','','" + url_www + "challenge/neo_notice/notice_list.asp?gubun=all&iid=" + notice[bottomNoticeCurTab].iid + "','_blank');"

	document.getElementById("bottomNotice").innerHTML = "<li><a href=\"" + linkUrl + "\" onclick=\"GoSNAChannelNoUrl('CHM1Z017');\">" + notice[bottomNoticeCurTab].title + "</a><span>" + notice[bottomNoticeCurTab].date.substring(0, 10) + "</span></li>";

}

function showBottomGSpecialBenefit() {
	try {
		var sb = "";
		var channelCode;
		for (var i = 0; i < SpecialBenefit.length && i < 12; i++) {
			channelCode = "CHM2L00" + (3 + i);
			sb += "<li><a href=\"javascript:GoSNAChannel('" + channelCode + "','" + SpecialBenefit[i].link + "');\"><img src='" + SpecialBenefit[i].img + "' alt='" + SpecialBenefit[i].title + "'></a></li>";
		}
		$j("#specialBenefit").append(sb);
	} catch (e) { }

}

function ShowMainLeftTopLogo() {
	try {
		if (isSfc) {
			$j("#aMLogo").attr("href", url_www).bind("click", function () {
				GoSNAChannel("CSF1A005", this.href);
				return false;
			});
			$j("#hMainLogo").removeClass().addClass("sfc").show();
		} else {
			$j("#hMainLogo").show();
			$j.each(MLBanner, function () {

				$j("#aMLogo").html("<img id='imgMLogo' name='imgMLogo' alt='Gmarket' src='" + this["img"] + "'>");
				var logoUrl = this['url'].toLowerCase();
				if (logoUrl.indexOf("&url=") > 0)
					logoUrl = logoUrl.substring(logoUrl.indexOf("&url=") + 5);

				$j("#aMLogo").attr("href", "javascript:GoSNAChannel('CHM1B001','" + logoUrl + "');");
				$j("#hMainLogo").removeClass();

				if (this['type'] == "") {
					$j("#imgMLogo").width("179");
					$j("#imgMLogo").height("44");
				} else if (this['type'] == "A") {
					$j("#imgMLogo").width("230");
					$j("#imgMLogo").height("109");
					$j("#hMainLogo").addClass("type3");
				} else if (this['type'] == "B") {
					$j("#imgMLogo").width("325");
					$j("#imgMLogo").height("109");
					$j("#hMainLogo").addClass("type2");
				} else {
					$j("#imgMLogo").width("179");
					$j("#imgMLogo").height("44");
				}

			});
		}
	} catch (e) { }
}

function showTopBanner() {
	try {
		if (MTBanner[0]['ismtbanner'] == "0") {
			$j("#topbanner").hide();
			$j("#IndexMainLineBanner").height("0");
			return;
		}

		if (getCookie("mainTopBannerYN") != null) return;

		$j("#IndexMainLineBanner").attr("src", url_www + "homepage/HomeTopLineBanner.html");
		$j("#IndexMainLineBanner").height("70");
		$j("#topbanner").show();
	} catch (e) {
		var safeConsole = window.console || { log: function () { } };
		safeConsole.log(e);
	}
}

function topBannerClose() {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + parseInt(1));
	expireDate.setHours(0, 0, 0);
	setCookieExpire("mainTopBannerYN", "Y", expireDate);
	$j("#topbanner").hide();
}

//G9 날개
function ShowMainWingG9Banner() {
	var bannerLen = 0;
	var bannerNo = 0;

	bannerLen = WingG9Banner.length;
	bannerNo = Math.floor(Math.random() * (bannerLen));

	$j.each(WingG9Banner, function (index, item) {
		if (index == bannerNo) {
			$j("#mainWingG9BannerHtml").html("<a href=\"javascript:GoSNAChannel('CHM1O008','" + this["url"] + "', '_blank');\" class=\"banner_main\"><img src=\"" + this["img"] + "\" alt=\"" + this["alt"] + "\"></a>");
		}
	});
	$j("#mainWingG9BannerHtml").css("display", "");
}

//2013-03-12 [시작페이지 판별 작업] 
function fnHomepageYN() {
	if (gmktMainIsIE) {
		if (GMKTHomePage.isHomePage("http://gmarket.co.kr/") || GMKTHomePage.isHomePage("http://www.gmarket.co.kr/")) {
			document.getElementById("ifrHomePageForm").src = "http://sna.gmarket.co.kr/?fcd=601000105";
		} else {
			if ((document.getElementById("startPage")) && (getCookie("startPageYN") == null)) {
				setCookie("startPageYN", "Y", 1);
				setTimeout("startLayerSlide('layer2')", 800);
			}
		}
	}
}

function startLayerSlide(layercase) {
	if (layercase == "layer1") {
		$j("#startPageAfter").stop(true, true).slideDown(1000);
		setTimeout("closeLay('startPageAfter')", 10000);
	} else if (layercase == "layer2") {
		$j("#startPage").stop(true, true).slideDown(1000);
		setTimeout("closeLay('startPage')", 10000);
	}
}

function CheckIPadSafari() {
	if (navigator.userAgent.indexOf('iPad') > -1) {
		if (navigator.userAgent.toLowerCase().indexOf('safari') != -1) {
			if (getCookie("iPadBannerYN") == null) {

				document.getElementById("ipadAppBanner").style.display = "block";
				$j("body").animate({ "padding-top": "58px" })
			}
		}
	}
}

function closeiPadBanner() {
	if (getCookie("iPadBannerYN") == null) {
		setCookie("iPadBannerYN", "Y", 1);
		document.getElementById("ipadAppBanner").style.display = "none";
		$j("body").animate({ "padding-top": "0px" })
	}
}


function noticePop() {

	if ($j.browser.msie && parseInt($j.browser.version, 10) <= 6) {
		window.open("/popup/indexPopunderIE6.html", "noticePopup", "width=600,height=476,top=400,left=350,title=no,menubar=no,location=no,toolbars=no,scroll=no,status=no,scrollbars=no,resizable=no");
	}
}

function GoLoginPromotion(url) {
	hmRedirect = "http://www.gmarket.co.kr/?redirect=1";

	if (typeof url === "undefined") document.location.href = url_signin + "login/login?prmtdisp=Y&url=" + location.href;
	else document.location.href = url_signin + "login/login?prmtdisp=Y&url=" + url + "&referURL=" + hmRedirect;
}

function SetSearchBoxAdBanner() {
	var tnum;
	var adReportImg;

	if (typeof (shBanners) != "undefined") {
		tnum = Math.floor(Math.random() * shBanners.length);
		document.menusearchform.action = shBanners[tnum][0];
		document.menusearchform.keyword.value = shBanners[tnum][2];
		jQuery("keyword").className = "sch ad";
		eval(shBanners[tnum][3]);

		if (typeof (shBanners[tnum][4]) != "undefined") {
			adReportImg = "<img src=\"http://pds.gmarket.co.kr/ub/add/1/impression/ad/1?ids=" + shBanners[tnum][4] + "\" style=\"display:none;\" width=\"0\" height=\"0\" alt='빈이미지' />";
			jQuery("#search").after(adReportImg);
		}
	}
}

function GmarketHeaderTopLink() {
	if (isSfc) GmarketHeaderTopLinkSfc();
	else GmarketHeaderTopLinkGeneral();
}

function GmarketHeaderTopLinkGeneral() {
	var sb = "";

	if (typeof (sHeaderServices) != "undefined") {
		var max = sHeaderServices.length;
		sb += "<div class='link'>\n";
		for (var i = 0; i < max; i++) {
			if (i == 0) sb += "<span class='first'><a href=\"javascript:GoSNAChannel('" + sHeaderServices[i].main_cc + "', '" + sHeaderServices[i].link + "')\")><img src='" + sHeaderServices[i].img + "' alt='" + sHeaderServices[i].text + "' /></a></span>\n";
			else sb += "<span><a href=\"javascript:GoSNAChannel('" + sHeaderServices[i].main_cc + "', '" + sHeaderServices[i].link + "')\"><img src='" + sHeaderServices[i].img + "' alt='" + sHeaderServices[i].text + "' /></a></span>\n";
		}
		sb += "</div>\n";
		jQuery("#headerInner").append(sb);
	} else {
		sb += "<div class='link'>\n";
		sb += "</div>\n";
		jQuery("#headerInner").append(sb);
	}
}

function GmarketHeaderTopLinkSfc() {
	jQuery("#headerInner").append(
		"<div class=\"sfc_link\">" +
		"<span class=\"sfc\"><a href=\"" + url_promotion + "planview/plan.asp?sid=137981" + "\" class=\"a_sfc\" onclick=\"GoSNAChannel(&quot;CSF1A007&quot;, this.href); return false;\">삼성임직원 혜택</a></span>" +
		"<span class=\"superdeal\"><a href=\"" + url_corners + "SuperDeals" + "\" class=\"a_superdeal\" onclick=\"GoSNAChannel(&quot;CSF1A008&quot;, &quot;, this.href); return false;\">슈퍼딜</a></span>" +
		"<span class=\"pluszone\"><a href=\"" + url_promotion + "Event/pluszone.asp" + "\" class=\"a_pluszone\" onclick=\"GoSNAChannel(&quot;CSF1A009&quot;, &quot;, this.href); return false;\">플러스존</a></span>" +
		"<span class=\"couponzone\"><a href=\"" + url_promotion + "Event/CouponZone.asp" + "\" class=\"a_couponzone\" onclick=\"GoSNAChannel(&quot;CSF1A010&quot;, this.href); return false;\">쿠폰존</a></span>" +
		"<span class=\"dutyfree\"><a href=\"https://www.shilladfs.com/member/samsungNoSingle.dfs?affl_id=010235\" class=\"a_dutyfree\">임직원면세점</a></span>" +
		"</div>");
}

function adReport(adcc) {
	if (typeof ubprofiler !== 'undefined' && typeof ubprofiler.send === 'function') {
		ubprofiler.send('click', 'ad', adcc);
	}
}

function bannerMainSuperClose() {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + parseInt(1));
	expireDate.setHours(0, 0, 0);
	setCookieExpire("mainSuperBannerYN", "Y", expireDate);
	$j("#bnr_main_super").hide();
}

/**
SFC배너 출력
*/
function showSfcBanner() {
	// sfcBanner는 /homepage/HomeData.js에 정의되어 있음.
	if (typeof sfcBanners == "undefined") return;
	if (getCookie("isSFC") != "Y") return;

	$j.each(sfcBanners, function (i, v) {
		var section = null;
		switch (v.Category2) {
			case "1": section = $j("#sfc-banner1"); break;
			case "21": section = $j("#sfc-banner21"); break;
			case "22": section = $j("#sfc-banner22"); break;
			case "31": section = $j("#sfc-banner31"); break;
			case "32": section = $j("#sfc-banner32"); break;
			case "33": section = $j("#sfc-banner33"); break;
		}
		if (section != null) section.append("<a href='javascript:void(0)' onclick='GoSNAChannel(\"CSF1A026\", \"" + v.LinkUrl1 + "\")'><img src='" + v.ImageUrl1 + "' alt='" + v.ImageText + "' /></a>");
	});

	// 1단이 유효하면 1단만 출력 (유효: 데이터 있음)
	if ($j("#sfc-banner1 a").length == 1) {
		$j("#sfc-banner1").show();
		return;
	}

	// 1단 무효, 2단이 유효하면 2단만 출력. (유효: 좌측, 우측 모두 데이터 있음)
	if ($j("#sfc-banner2 a").length == 2) {
		$j("#sfc-banner2").show();
		return;
	}

	// 1,2단 무효, 3단이 유효하면 3단만 출력. (유효: 좌측, 중앙, 우측 모두 데이터 있음)
	if ($j("#sfc-banner3 a").length == 3) {
		$j("#sfc-banner3").show();
	}

	// 1,2,3단 모두 유효하지 않으면 아무 배너도 출력하지 않음.
}

function showSfcPopup() {
	// sfcPopup은 /homepage/HomeData.js에 정의되어 있음.
	if (typeof sfcPopup == "undefined") return;

	var sfcPopupSection = $j(".sfc_layer_popup_img");
	if (sfcPopupSection == null) return;

	if (getCookie("isSFC") != "Y") return;

	if (getCookie("hideSfcPopup") == "Y") return;

	var popup = "<a href='" + sfcPopup.LinkUrl1 + "' onclick='GoSNAChannel(\"CSF1A025\", this.href)'><img id='sfc-popup-img' src='" + sfcPopup.ImageUrl1 + "' alt='" + sfcPopup.ImageText + "' /></a>";
	sfcPopupSection.append(popup);

	$j("#sfc-popup-img").load(function () {
		$j("#sfc_layer_popup").show();
	});
}

function hideSfcPopup() {
	if ($j("#sfc-popup-hide-until-today").prop("checked")) {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + parseInt(1));
		expireDate.setHours(0, 0, 0);
		setCookieExpire("hideSfcPopup", "Y", expireDate);
	}
	$j("#sfc_layer_popup").hide();
}
