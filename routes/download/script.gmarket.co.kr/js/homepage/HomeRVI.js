var WingGoodsDomain = "http://item.gmarket.co.kr/";
var WingWWWDomain = "http://www.gmarket.co.kr/";
var startFloatFlag;
var standardTop = 0;

// PDS webservice
var PdsService = {
    __pdsUrl: ((location.protocol.toLowerCase() == 'https:') ? 'https://pdsssl.gmarket.co.kr' : 'http://pds.gmarket.co.kr'), 	// prod
    /*
    Private Functions
    */
    _send: function(url) {
        var imgTag = document.createElement('img');
        imgTag.src = url;
    },
    _sendJsonp: function(url, data, callback, altJsonpCallback) {
        var xhr = jQuery.ajax({
            url: url
			, data: data
			, type: "GET"
			, jsonpCallback: altJsonpCallback
			, scriptCharset: "UTF-8"
			, contentType: "application/javascript; charset=utf-8"
			, dataType: "jsonp"
			, async: false
			, crossdomain: true
			, error: function(req, err) {
			    if (typeof Logger !== 'undefined') {
			        Logger.LoggingMsg(err.error);
			    }
			}
			, success: function(replies) {
			    if (callback) {
			        callback(replies);
			    }
			}
        });
    },
    _param: function(obj) {
        var ret = '';
        var tList = [];
        if (typeof obj === 'object') {
            for (var e in obj) {
                tList.push(e + '=' + PdsService._encodeUri(obj[e]));
            }
            ret = tList.join('&');
        }
        return ret;
    },
    _encodeUri: function(value) {
        // There are six possible values that typeof returns: "number," "string," "boolean," "object," "function," and "undefined."
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return encodeURIComponent(
				value.toString()
					.replace(/ /g, ';WS')
					.replace(/\+/g, ';PL')
					.replace(/\?/g, ';QU')
					.replace(/\//g, ';SL')
					.replace(/\#/g, ';SP')
					.replace(/\&/g, ';AD')
			);
        }
        return '';
    },

    /*
    Public Functions
    */
    /*
    Get Rvi Version 1
    @param {function} callback
    @return {list}
    */
    getRvi: function(callback) {
        PdsService._sendJsonp(
			PdsService.__pdsUrl + '/rvi/get/1',
			{},
			callback,
			'getRvi'
		);
    },
    /*
    Get Rvi Version 2
    @param {function} callback
    @param {object} optionalData
    @return {list}
    */
    getRviV2: function(callback, optionalData) {
        var data = {};
        if (typeof optionalData === 'object') {
            data = optionalData;
        }
        PdsService._sendJsonp(
			PdsService.__pdsUrl + '/rvi/get/2',
			data,
			callback,
			'getRviV2'
		);
    },
    /*
    Add one Rvi
    @param {string or number} itemNo
    */
    addRvi: function(itemNo, optional) {
        PdsService._send(PdsService.__pdsUrl + "/rvi/add/1/" + itemNo + '?' + PdsService._param(optional));
    },
    /*
    Remove one or multiple Rvi
    @param {list or string or number} itemNos
    */
    removeRvi: function(itemNos) {
        PdsService._send(PdsService.__pdsUrl + '/rvi/remove/1/' + ((typeof itemNos === 'object' && itemNos.join) ? PdsService._encodeUri(itemNos.join(',')) : itemNos));
    },
    /*
    Remove all rvi
    @param {string or number} itemNo
    */
    removeAllRvi: function() {
        PdsService._send(PdsService.__pdsUrl + '/rvi/removeall/1/');
    }
};


//RVI
function GGoods(goodsCode, goodsName, goodsImgPath, goodsPrice, goodsKind, adultYn) {
    this.code = goodsCode;
    this.name = goodsName;
    this.img = goodsImgPath;
    this.price = goodsPrice;
    this.regdate = "";
    this.adultyn = adultYn;
    this.kind = goodsKind;
}

function RVI() { }
RVI.maxCount = 50;
RVI.retryCount = 0;
RVI.totalCount = 0;
RVI.currPage = 1;
RVI.totalPage = 1;
RVI.isDisplayToIac = false;
RVI.isItempage = false;
RVI.GoodsArr = new Array();

RVI.wingCallback = function() { };

RVI.getRviV2Callback = function(data) {
    try {

        RVI.GoodsArr = new Array();

        for (var i = 0; i < data.ItemList.length; i++) {
            var retGoods = new GGoods();
            retGoods.code = data.ItemList[i].gdno;
            retGoods.name = "";
            retGoods.img = RVI.getImagePathImageTypeSS(data.ItemList[i].gdno, data.ItemList[i].isAdult);
            retGoods.price = "";
            retGoods.adultyn = data.ItemList[i].isAdult;
            retGoods.kind = "1";
            RVI.GoodsArr[i] = retGoods;
        }

        if (typeof (RVI.wingCallback) != "undefined") {
            RVI.wingCallback();
        }
    }
    catch (e) { }
}

RVI.loadGoods = function(wingCallback) {
    //if (RVI.IsLoadedGoods()) return;
    RVI.wingCallback = wingCallback;
    PdsService.getRviV2(RVI.getRviV2Callback, { rtype: 'obj' });
}

RVI.getGoodsCount = function() {
    return RVI.GoodsArr.length;
}

RVI.IsLoadedGoods = function() {
    if (RVI.GoodsArr.length > 0) return true;
    return false;
}

RVI.addGoods = function(goodsCode, adultYN) {
    var isAdult = (adultYN == "Y") ? 1 : 0;
    PdsService.addRvi(goodsCode, { adt: isAdult }); 	// adult product
}

RVI.modifyGoods = function(goodsCode, goodsName, price) {
    var goods = new GGoods();
    goods.code = goodsCode;
    goodsName = goodsName.replace(/\=/g, "").replace(/\"/g, "").replace(/\'/g, "").replace(/\″/g, "");  // =  '  " ″ 문자 제거
    goods.name = (goodsName.length > 20) ? goodsName.substring(0, 20) : goodsName;
    goods.price = price + '';

    for (var i = 0; i < RVI.GoodsArr.length; i++) {
        if (RVI.GoodsArr[i].code == goods.code) {
            if (goods.name.length > 0)
                RVI.GoodsArr[i].name = goods.name;
            if (goods.price.length > 0)
                RVI.GoodsArr[i].price = goods.price;
            break;
        }
    }
}

RVI.deleteGoods = function(goodsCode) {

    PdsService.removeRvi(goodsCode);

    var tmpGoodsArr = RVI.GoodsArr;
    var j = 0;
    RVI.GoodsArr = new Array();
    for (var i = 0; i < tmpGoodsArr.length; i++) {
        if (goodsCode != tmpGoodsArr[i].code) {
            var retGoods = new GGoods();
            retGoods.code = tmpGoodsArr[i].code;
            retGoods.name = tmpGoodsArr[i].name;
            retGoods.img = tmpGoodsArr[i].img;
            retGoods.price = tmpGoodsArr[i].price;
            retGoods.adultyn = tmpGoodsArr[i].adultyn;
            retGoods.kind = tmpGoodsArr[i].kind;
            RVI.GoodsArr[j] = retGoods;
            j++;
        }
    }
}

RVI.getPageGoodsArr = function(pageNo, pageSize) {
    try {
        var ret = new Array();

        if (!RVI.IsLoadedGoods())
            RVI.loadGoods();

        var totalGoodsCount = RVI.getGoodsCount();
        RVI.totalPage = (totalGoodsCount % pageSize) == 0 ? parseInt(totalGoodsCount / pageSize) : parseInt(totalGoodsCount / pageSize) + 1;
        if (pageNo > RVI.totalPage) {
            pageNo = RVI.totalPage;
            RVI.currPage = RVI.totalPage;
        }
        var tStartPoint = Math.min(parseInt((pageNo - 1) * pageSize), totalGoodsCount);
        var tEndPoint = Math.min(parseInt(pageNo * pageSize), totalGoodsCount);

        for (i = 0; i < (tEndPoint - tStartPoint); i++) {
            if (RVI.GoodsArr[(tStartPoint + i)] != null)
                ret[i] = RVI.GoodsArr[(tStartPoint + i)];
        }
        return ret;
    } catch (e) { }
}

RVI.getNextPageGoodsArr = function(pageSize) {
    try {
        if (!RVI.IsLoadedGoods())
            RVI.loadGoods();

        var totalGoodsCount = RVI.getGoodsCount();
        RVI.totalPage = (totalGoodsCount % pageSize) == 0 ? parseInt(totalGoodsCount / pageSize) : parseInt(totalGoodsCount / pageSize) + 1;

        if (RVI.currPage == RVI.totalPage)
            RVI.currPage = 1;
        else
            RVI.currPage = RVI.currPage + 1;

        var ret = RVI.getPageGoodsArr(RVI.currPage, pageSize);
        return ret;
    } catch (e) { }
}

RVI.getPrevPageGoodsArr = function(pageSize) {
    try {
        if (!RVI.IsLoadedGoods())
            RVI.loadGoods();

        var totalGoodsCount = RVI.getGoodsCount();
        RVI.totalPage = (totalGoodsCount % pageSize) == 0 ? parseInt(totalGoodsCount / pageSize) : parseInt(totalGoodsCount / pageSize) + 1;
        if (RVI.currPage == 1)
            RVI.currPage = RVI.totalPage;
        else
            RVI.currPage = RVI.currPage - 1;

        var ret = RVI.getPageGoodsArr(RVI.currPage, pageSize);
        return ret;
    } catch (e) { }
}

RVI.setCookie = function(name, value) {
    document.cookie = name + "=" + escape(value) + "; domain=gmarket.co.kr; path=/;";
}

RVI.getImagePathImageTypeSS = function(sGoodsCode, sAdultYN) {
    try {
        if (sAdultYN == "1")
			return "http://image.gmarket.co.kr/challenge/neo_image/adult_img/n_19_80.gif";
        else {
         	var temp = "";
         	var NAS_SERVER_URL = "";

         	if (sGoodsCode == "") {
         		temp = "http://image.gmarket.co.kr/challenge/neo_image/no_image.gif";
         	}
         	else if (sGoodsCode < 115905000) {
         		NAS_SERVER_URL = "http://goodsimg.gmarket.co.kr/";
         		temp = NAS_SERVER_URL + "goods_image2/small_jpgimg/" + sGoodsCode.slice(-2) + "/" + sGoodsCode + ".jpg";
         	}
         	else {
         		NAS_SERVER_URL = "http://gdimg.gmarket.co.kr/";
         		temp = NAS_SERVER_URL + "goods_image2/small_jpgimg/" + sGoodsCode.slice(0, 3) + "/" + sGoodsCode.slice(3, 6) + "/" + sGoodsCode + ".jpg";
         	}

         	return temp;
        }
    } catch (e) { }
}

function showHint(url, divid) {
    var xmlhttp = false;

    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }

    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        try {
            xmlhttp = new XMLHttpRequest();
        } catch (e) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && window.createRequest) {
        try {
            xmlhttp = window.createRequest();
        } catch (e) {
            xmlhttp = false;
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            var box = document.getElementById(divid);
            var a = document.createElement('div');
            a.style.display = "";
            box.appendChild(a);
            a.innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.send(null)
} 

function moveGoodsImg() {
    try {
        var tmpstr;
        allchk = document.getElementsByTagName("IMG");
        for (i = 0; i < allchk.length; i++) {
            if (allchk[i].src.indexOf("gmarket.co.kr/goods_image2/large") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/small") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/middle") > 0) {
                tmpstr = allchk[i].src;
                tmpstr = tmpstr.replace('large_jpgimg', 'large_img');
                tmpstr = tmpstr.replace('middle_jpgimg', 'middle_img');
                tmpstr = tmpstr.replace('small_jpgimg', 'small_img');
                allchk[i].src = tmpstr;
            }
        }
    } catch (e) {
        window.status = "현재 브라우저에서 해당 기능을 지원하지 않습니다.";
    }
}
function stopGoodsImg() {
    try {
        var tmpstr;
        allchk = document.getElementsByTagName("IMG");
        for (i = 0; i < allchk.length; i++) {
            if (allchk[i].src.indexOf("gmarket.co.kr/goods_image2/large") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/small") > 0 || allchk[i].src.indexOf("gmarket.co.kr/goods_image2/middle") > 0) {
                tmpstr = allchk[i].src;
                tmpstr = tmpstr.replace('large_img', 'large_jpgimg');
                tmpstr = tmpstr.replace('middle_img', 'middle_jpgimg');
                tmpstr = tmpstr.replace('small_img', 'small_jpgimg');
                allchk[i].src = tmpstr;
            }
        }
    } catch (e) {
        window.status = "현재 브라우저에서 해당 기능을 지원하지 않습니다.";
    }
}
function animatedImgStatChgMain(stat) {
    if (typeof moveBestTimer != "undefined")
        clearTimeout(moveBestTimer);
    if (stat == "stop") {
        var img_Obj = document.getElementById("animatedImgStat");
        if (document.readyState == "complete") {
            setCookieForWing("ImgStop", "Y", 1);
            stopGoodsImg();
			img_Obj.href = "javascript:animatedImgStatChgMain('move');GoSNA('128000014', '','','stat','CHM1N014');";
			document.getElementById("animatedImgTxt").className = "quick_icon btn_animation";
		}
		document.getElementById("animatedImgTxt").alt = "이미지동작";
		return;
	}
	else if (stat == "move") {
        var img_Obj = document.getElementById("animatedImgStat");
        if (document.readyState == "complete") {
            setCookieForWing("ImgStop", "N", 1);
            moveGoodsImg();
			img_Obj.href = "javascript:animatedImgStatChgMain('stop');GoSNA('128000014', '','','stat','CHM1N014');";
			document.getElementById("animatedImgTxt").className = "quick_icon btn_animation_stop";
		}
		document.getElementById("animatedImgTxt").alt = "이미지정지";
		return;		
	}
}
function animatedImgStatChgStop() {
    if (getCookieForWing("ImgStop") == "Y") {
        setTimeout("animatedImgStatChgMain('stop')", 500);
    }
}
function WindScroll() {
    if (startFloatFlag == true) {
        var start_num = Math.floor(Math.random() * (total_cnt2));
        start_floate(start_num);
    }
}

function goToMessageBoxOpt(opt){
	var wParam = "http://www.gmarket.co.kr/challenge/neo_my_gd/message/my_message_box.asp" + "#" + document.domain;
	GmktPopLayerAdd(wParam, 590, 480);
}

var floatingImgflag = false;

function setMsgCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; domain=gmarket.co.kr; path=/; expires=" + todayDate.toGMTString() + ";"
}

function setBrowserCookie(name, value) {
    document.cookie = name + "=" + escape(value) + "; domain=gmarket.co.kr; path=/;";
}

function getMsgCookie(name) {
    var Found = false;
    var start, end;
    var i = 0;

    while (i <= document.cookie.length) {
        start = i;
        end = start + name.length;

        if (document.cookie.substring(start, end) == name) {
            Found = true;
            break;
        }

        i++
    }
    if (Found == true) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if (end < start)
            end = document.cookie.length;

        return document.cookie.substring(start, end);
    }
    return "";
}

function getCookieForWing(name) {
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

function recentOpen() {
    jQuery("#btnRecentClose").removeClass().addClass("sp_wing button_minus");
    jQuery("#recentListDiv").show();
    jQuery("#btnRecentClose").attr("href", "javascript:recentClose();");
    
}
function recentClose() {
    jQuery("#btnRecentClose").removeClass().addClass("sp_wing button_plus");
    jQuery("#recentListDiv").hide();
    jQuery("#btnRecentClose").attr("href", "javascript:recentOpen();");   
    
}
function plusOpen() {
    jQuery("#btnPlusClose").removeClass().addClass("sp_wing button_minus");
    jQuery("#plusListDiv").show();
    jQuery("#btnPlusClose").attr("href", "javascript:plusClose();");
}
function plusClose() {
    jQuery("#btnPlusClose").removeClass().addClass("sp_wing button_plus");
    jQuery("#plusListDiv").hide();
    jQuery("#btnPlusClose").attr("href", "javascript:plusOpen();");
}
function setCookieForWing(cookieName, cookieValue, expireDate) {
    var today = new Date();
    today.setDate(today.getDate() + parseInt(expireDate));
    document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/;domain=gmarket.co.kr; expires=" + today.toGMTString() + ";";
}
function setCommaForWing(str) {
    str = "" + str + "";
    var retValue = "";
    for (i = 0; i < str.length; i++) {
        if (i > 0 && (i % 3) == 0) {
            retValue = str.charAt(str.length - i - 1) + "," + retValue;
        } else {
            retValue = str.charAt(str.length - i - 1) + retValue;
        }
    }
    if (retValue.length > 0) retValue = retValue + "원";
    return retValue;
}
function setNumberForWing(str) {
    var tmpStr;
    tmpStr = str.replace(",", "");
    tmpStr = tmpStr.replace("원", "");
    return tmpStr;
}

function wingEvent() {
    var obj = {
        $wing: jQuery("div#wing"),
        $adwing: jQuery("div#adwing"),
        $tBanner: jQuery('#topbanner'), // chk
        _winW: jQuery("body").width(),
        _contH: jQuery("#container").height(),
        _footH: jQuery("#footer").height(),
        _footBm: 20,
        _domH: null,
        ieChk: navigator.userAgent.indexOf("MSIE"),
        lenChk: function() {
            if (obj.$tBanner.css('display') == 'none') { var tBannerH = 0 } else { var tBannerH = obj.$tBanner.height() }
            if (jQuery("#myg_header").length) {// myg
                var _hT = tBannerH + jQuery("#utill").height() + jQuery("#header").height() + jQuery("#myg_header").height() + 3;
            } else if (jQuery("#topHeader").length) {
                // ver 2
                var _hT = tBannerH + jQuery("#topHeader").height() + jQuery("#miniHeader").height();
            } else if (jQuery(".biz-h-box").length) { // biz
                var _hT = jQuery("#utill").height() + jQuery(".biz-h-box").height();
            } else {
                // ver 1
                var _hT = tBannerH + jQuery("#utill").height() + jQuery("#header").height();
            }

            if (obj.$wing.length) {
                obj.scrollEvent(obj.$wing, _hT);
            } // wing
            if (obj.$adwing.length) {
                obj.scrollEvent(obj.$adwing, _hT);
            } //adwing

            if (obj._domH == null) {
                obj._domH = jQuery(document).height();
            } else if (obj._domH < jQuery(document).height()) {
                obj._domH = jQuery(document).height();
            } // dom Height
        },
        widthChk: function() { // wing width check function 
            var $body = jQuery('body'),
					 $hW = jQuery('#topHeader .inner'),
					 _winW = jQuery(window).width(),
					 $cW;

            if (jQuery('.transform .wrap').length > 0) {
                $cW = jQuery('.transform .wrap');
                wingPos('transform');
            } else if (jQuery('#container .section').length > 0) {
                $cW = jQuery('#container .section');
                wingPos('basic');
            } else if (jQuery('#container .wrap').length) {
                $cW = jQuery('#container .wrap');
                wingPos('basic');
            } else if (jQuery('#gBestWrap').length) { // 쇼핑기획전
                $cW = jQuery('#gBestWrap');
                wingPos('basic');
            } else {
                $cW = jQuery('#header .inner');
                wingPos('basic');
            }

            function wingPos(type) {
                if (type == 'basic') {
                    if ($cW.width() - jQuery('body').width() > 0) {
                        obj.$wing.css({
                            marginRight: -(jQuery('body').width() / 2) - obj.$wing.width() - 15 - ($cW.width() - jQuery('body').width())
                           });
                    } else if ($cW.width() == 1090) { // vip_minishop width 1090
                        obj.$wing.css({
                          	marginRight: -645
                        });
                    } else if ($cW.width() == 900) { // width 900
                        obj.$wing.css({
                            marginRight: -550
                        });
                    } else {
                        obj.$wing.css({  // width 980
                            marginRight: -590
                        });
                    }
                } else {
                    if (jQuery(window).width() > 1099) {
                        obj.$wing.css({
                            marginRight: Math.round(-($cW.width() / 2) - obj.$wing.width() -8),
                            right: '50%',
                            left: 'auto'
                        });
                    } else {
                        obj.$wing.css({
                            marginRight: 0,
                            right: 'auto',
                            left: 1006
                        });
                    }
                }
            } //wingPos
            ($hW.width() != $cW.width()) ? jQuery('#topHeader').addClass('reset') : jQuery('#topHeader').removeClass('reset');
        },
        scrollEvent: function($target, _hT) { // wing Moving  function

            if ($target.parent().css('position') == 'relative') { var _chT = 0; } else { var _chT = _hT; }

            var _sTop = jQuery(window).scrollTop(),
					_fT = obj._domH - $target.height() - obj._footH - obj._footBm - (jQuery('.mobile-go').height() * jQuery('.mobile-go').length),
					_wingT,
					_mTime;

            $target.css({ top: _chT });
            if (_sTop < _chT) {				// header check
                $target.css({ position: 'absolute' });
                _wingT = _chT;
            } else if (_sTop > _fT) {		// footer check
                $target.css({ position: 'absolute' });
                _wingT = _fT;
            } else {								// other 
                if (obj.ieChk != -1) {
                    $target.css({
                        position: 'fixed',
                        top: 5
                    });
                } else {
                    _wingT = _sTop;
                }
            }

            $target.css({ top: _wingT });
        }
    };    
    obj.widthChk();
    jQuery(window).bind("mousewheel DOMMouseScroll MozMousePixelScroll scroll onmousewheel ", function() {
        obj.lenChk();
    });
    jQuery(window).resize(function() { obj.widthChk(); });
    jQuery(window).load(function() {
        obj.lenChk();
        obj.widthChk();
    });
    jQuery(window).bind("touchmove", function() { obj.lenChk(); });
    jQuery(window).bind("touchend	", function() { obj.lenChk(); });
}	
						
	

//Wing
function wing() { }
wing.GoodsUrl = "";
wing.RecentPageSize = 4;
wing.RecentKind = 1;
wing.totalRecentCount = 0;
wing.flag = "";
wing.retryCount = 0;
function InitWingRecentGoodsOriginal() {
    wing.totalRecentCount = RVI.getGoodsCount();
    if (RVI.currPage > RVI.totalPage) RVI.currPage = RVI.totalPage;
    wing.printRecentGoodsView(0);

    if (wing.totalRecentCount > 0) {
        jQuery("#RecentExistDiv").show();
        jQuery("#RecentNoneDiv").hide();
    } else {
        jQuery("#RecentExistDiv").hide();
        jQuery("#RecentNoneDiv").show();
    }
    if (wing.flag == "R" && wing.totalRecentCount > 0) wing.openTodayGoods();
    else {
        //wing.openPlusGoods();
        jQuery("#WingPlusGoodsDiv").show();
        jQuery("#WingTodayGoodsDiv").hide();

        wing.dispPlusGoodsAdcc();
    }
}

//플러스 상품의 adcc impression 노출
var chkAdcc = 0;
wing.dispPlusGoodsAdcc = function () {

    if (chkAdcc == 0 && adReportNums != "") {
        chkAdcc = 1;
        jQuery("#plusListDiv").after("<img src='http://pds.gmarket.co.kr/ub/add/1/impression/ad/1?ids=" + adReportNums + "' style='display:none;' width='0' height='0' alt='빈이미지' />");
    } 
}
InitWingRecentGoods = function() {    
    RVI.loadGoods(InitWingRecentGoodsOriginal);
}
wing.openPlusGoods = function() {
    setBrowserCookie("WingFlag", "");
    wing.flag = "";
    jQuery("#WingPlusGoodsDiv").show();
    jQuery("#WingTodayGoodsDiv").hide();

    wing.dispPlusGoodsAdcc();
}
wing.openTodayGoods = function() {
    setBrowserCookie("WingFlag", "R");
    wing.flag = "R";
    jQuery("#WingPlusGoodsDiv").hide();
    jQuery("#WingTodayGoodsDiv").show();
}
wing.printRecentGoodsView = function(idx) {
    var recentGoods;
    if (idx == 1)
        recentGoods = RVI.getNextPageGoodsArr(wing.RecentPageSize);
    else if (idx == -1)
        recentGoods = RVI.getPrevPageGoodsArr(wing.RecentPageSize);
    else
        recentGoods = RVI.getPageGoodsArr(RVI.currPage, wing.RecentPageSize);

    for (var i = 0; i < recentGoods.length; i++) {
        jQuery("#RVI" + (i + 1) + "_URL1").attr("href", "javascript:GoSNAChannel('CHM1N004', '" + wing.GoodsUrl + recentGoods[i].code + "&pos_shop_cd=RC&pos_class_cd=111111111&pos_class_kind=T');");
        jQuery("#RVI" + (i + 1) + "_TAG1").attr("href", jQuery("#RVI" + (i + 1) + "_URL1").attr("href"));
        jQuery("#RVI" + (i + 1) + "_IMG1").attr("src", recentGoods[i].img);
        jQuery("#RVI" + (i + 1) + "_IMG1").removeClass("off");
        jQuery("#RVI" + (i + 1) + "_CODE").html(recentGoods[i].code);
        jQuery("#RVI" + (i + 1) + "_TAG1").html(cutStringByteLength(recentGoods[i].name, 44));
        jQuery("#RVI" + (i + 1) + "_TXT1").html(setCommaForWing(recentGoods[i].price));
        jQuery("#RVI" + (i + 1) + "_LI").attr("style", "display:block;");
        jQuery("#RVI" + (i + 1) + "_DIV1").attr("load-check", 0);
    }
    for (var i = recentGoods.length; i < wing.RecentPageSize; i++) {
        jQuery("#RVI" + (i + 1) + "_URL1").attr("href", "#");
        jQuery("#RVI" + (i + 1) + "_TAG1").attr("href", "#");
        jQuery("#RVI" + (i + 1) + "_IMG1").attr("src", "http://image.gmarket.co.kr/challenge/neo_image/no_image.gif");
        jQuery("#RVI" + (i + 1) + "_IMG1").removeClass("off");
        jQuery("#RVI" + (i + 1) + "_CODE").html("");
        jQuery("#RVI" + (i + 1) + "_TAG1").html("");
        jQuery("#RVI" + (i + 1) + "_TXT1").html("");
        jQuery("#RVI" + (i + 1) + "_LI").attr("style", "display:none;");
        jQuery("#RVI" + (i + 1) + "_DIV1").attr("load-check", 0);
    }
    jQuery("#WingRecentPage").html("<strong>" + RVI.currPage + "</strong>/" + RVI.totalPage);
}
wing.resetGoodsDetail = function() {
    for (var i = 1; i <= wing.RecentPageSize; i++) {
        jQuery("#RVI" + i + "_TAG1").html("");
        jQuery("#RVI" + i + "_TXT1").html("");
    }
}
wing.showGoodsDetail = function(idx) {
	var loadCheck;
    if (jQuery("#RVI" + idx + "_CODE").html().length > 0) {
    	var sGoodsCode;
    	if (jQuery("#RVI" + idx + "_DIV1").attr("load-check") !== undefined)
    		loadCheck = jQuery("#RVI" + idx + "_DIV1").attr("load-check");
    	else
    		loadCheck = 0;

    	if (loadCheck == 0 && jQuery("#RVI" + idx + "_TAG1").html().length == 0) {
    		sGoodsCode = jQuery("#RVI" + idx + "_CODE").html();
    		jQuery("#RVI" + idx + "_DIV1").attr("load-check", 1);
            var url = WingWWWDomain + "challenge/neo_include/GetGoodsDetailWing.asp";
            var param = [{ name: 'goodscode', value: sGoodsCode }, { name: 'idx', value: idx}];

            wing.CallAjaxService(url, param, "GET", "jsonp", "wing.ShowGoodsDetailResult");

        }
        jQuery("#RVI" + idx + "_LI").addClass("on");
        jQuery("#RVI" + idx + "_DIV1").attr("style", "display:block");
        //jQuery(".floating").css('zIndex', 10005);
    }
    
}

wing.ShowGoodsDetailResult = function(data) {
    var ret = data.result.split("|");
    var sGoodsCode;
    if (ret.length > 1 && data.result.length < 512) {
        if (ret[0].length < 30) {
            var idx = ret[2];
            sGoodsCode = jQuery("#RVI" + idx + "_CODE").html();
            jQuery("#RVI" + idx + "_TAG1").html(cutStringByteLength(ret[1], 40));
            jQuery("#RVI" + idx + "_TXT1").html(ret[0]);
            RVI.modifyGoods(sGoodsCode, ret[1], setNumberForWing(ret[0]));
        }
    }
}

wing.CallAjaxService = function(requestUrl, argument, ajaxType, ajaxDataType, callBackFunction) {
    var isAsync = true;
    if (callBackFunction == "") {
        isAsync = false;
    }
    return jQuery.ajax({
        type: ajaxType,
        url: requestUrl,
        data: argument,
        dataType: ajaxDataType,
        async: isAsync,
        beforeSend: function(xhr) {

        },
        success: function(msg) {
            if (msg) {
                if (isAsync)
                    eval(callBackFunction)(msg);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    })
}

wing.hideGoodsDetail = function(idx) {

    jQuery("#RVI" + idx + "_LI").removeClass();
    jQuery("#RVI" + idx + "_DIV1").hide();
}
wing.deleteRecentGoods = function(idx) {
    var sGoodsCode;
    if (jQuery("#RVI" + idx + "_CODE").html().length > 0) {
        sGoodsCode = jQuery("#RVI" + idx + "_CODE").html();
        jQuery("#RVI" + idx + "_DIV1").hide();
        RVI.deleteGoods(sGoodsCode);
        InitWingRecentGoodsOriginal();
    }
}
wing.loadRecentGoods = function(loadYN) {
    if (loadYN) {
        wing.flag = getMsgCookie("WingFlag");
    } else {
        setBrowserCookie("WingFlag", "R");
        wing.flag = "R";
    }
    wing.GoodsUrl = WingGoodsDomain + "detailview/Item.asp?goodscode=";
    wing.RecentPageSize = 4;
    wing.RecentKind = 1;
}


function getUserInfo(name) {
	var userInfo = getCookieForWing("user%5Finfo");
	if (userInfo != null) {
   		var arrSplit = userInfo.split("&");
   		for (var i = 0; i < arrSplit.length; i++) {
   			var splitValue = arrSplit[i];
   			if (splitValue.indexOf(name) != -1) {
   				val = splitValue.replace(name + "=", "");
   				return val;
   			}
   		}
	}
	return "";
}



