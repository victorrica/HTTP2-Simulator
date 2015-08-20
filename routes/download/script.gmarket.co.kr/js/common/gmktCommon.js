/*
¾Æ·¡ µÎ ÆÄÀÏ merge
/challenge/neo_include/neverdie.js
/challenge/neo_include/gmkt.js
*/

//var url, NeverdieEventUrl, NeverdieItemUrl, NeverdiePromotionUrl;
//if (location.hostname.indexOf("dev") >= 0 ){
//	url = 'http://dev.gmarket.co.kr/';
//	NeverdieEventUrl = 'http://eventdev.gmarket.co.kr/';
//	NeverdieItemUrl = 'http://itemdev.gmarket.co.kr/';
//	NeverdiePromotionUrl = 'http://promotiondev.gmarket.co.kr/';
//}
//else {
//	url = 'http://www.gmarket.co.kr/';
//	NeverdieEventUrl = 'http://event.gmarket.co.kr/';
//	NeverdieItemUrl = 'http://item.gmarket.co.kr/';
//	NeverdiePromotionUrl = 'http://promotion.gmarket.co.kr/';
//}

// 2008-12-03 ³» ÄíÆùÇÔ °¡·Î ¼¼·Î Å©±â
//var fixed_coupon_box_width	= 574
//var fixed_coupon_box_height	= 570
function isSpace(inChar)
{
	return (inChar == ' ' || inChar == '\t' || inChar == '\n');
}
function trim(tmpStr)
{
	var atChar;
	if (tmpStr.length > 0)
	atChar = tmpStr.charAt(0);
	while (isSpace(atChar))
	{
		tmpStr = tmpStr.substring(1, tmpStr.length);
		atChar = tmpStr.charAt(0);
	}
	if (tmpStr.length > 0)
		atChar = tmpStr.charAt(tmpStr.length-1);
	while (isSpace(atChar))
	{
		tmpStr = tmpStr.substring(0,( tmpStr.length-1));
		atChar = tmpStr.charAt(tmpStr.length-1);
	}
	return tmpStr;
}
function MM_findObj(n, d)
{ //v3.0
	var p,i,x;

	if(!d)
		d=document;
	if((p=n.indexOf("?"))>0&&parent.frames.length)
	{
		d=parent.frames[n.substring(p+1)].document;
		n=n.substring(0,p);
	}
	if(!(x=d[n])&&d.all)
		x=d.all[n];
	for (i=0;!x&&i<d.forms.length;i++)
	{
		x=d.forms[i][n];
	}
	for (i=0;!x&&d.layers&&i<d.layers.length;i++)
	{
		x=MM_findObj(n,d.layers[i].document);
		return x;
	}
}
function MM_swapImage()
{ //v3.0
	var i,j=0,x,a=MM_swapImage.arguments;
	document.MM_sr=new Array;

	for(i=0;i<(a.length-2);i+=3)
	{
		if ((x=MM_findObj(a[i]))!=null)
		{
			document.MM_sr[j++]=x;
			if(!x.oSrc)
			{
				x.oSrc=x.src;
				x.src=a[i+2];
			}
		}
	}
}
function MM_swapImgRestore()
{ //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
//function show(name)
//{
//	var id = document.all[name]
//	id.style.display = "none" == id.style.display ? "" : "none";
//}
//function selectwidget(name)
//{
//	var id = document.all[name]
//	id.style.display = "";
//}
//function hiden(name)
//{
//	var id = document.all[name]
//	id.style.display = "none"
//}
//function js_money(x)
//{
//	var i,ii,y
//	y=""
//	x=String(x)
//	for (i=x.length-1;i >= 0 ;i--)
//	{
//		ii=x.length-1-i
//		flag=(ii+1) % 3

//		if ((flag == 0) && ( ii != x.length-1 ))
//			y=","+x.charAt(i)+y
//		else
//			y=x.charAt(i)+y
//	}
//	return y
//}
//function choose_one(sSel,sValue)
//{
//	for(i=0;i < sSel.length;i++)
//	{
//		if (sSel.options[i].value == sValue)
//		{
//			sSel.selectedIndex=i
//			return true
//		}
//		else
//		{
//			sSel.selectedIndex=0
//		}
//	}
//}
//function isempty(obj,isNumber,sMsg,obj_type)
//{
//	//obj ÀÇ À¯Çü¿¡ µû¶ó ´Ù¸£´Ù. ¸¸¾à ¶óµð¿À ¹öÆ°ÀÌ¸é ÄÃ·º¼ÇÀÌ ³Ñ¾î¿Í¾ß ÇÑ´Ù.
//	if (typeof(obj_type) == "undefined")
//	{
//		obj_type = "TEXT"
//	}

//	if (obj_type.toUpperCase() == "RADIO")
//	{
//		var isChecked = false;
//		for (i = 0; i < obj.length; i++)
//		{
//			if (obj[i].checked)
//			{
//				isChecked = true;
//				return false;
//			}
//		}
//		if (!isChecked)
//		{
//			window.alert(sMsg+" ¼±ÅÃÇÏ¼Å¾ß ÇÕ´Ï´Ù.")
//			obj[0].focus();
//			return true;
//		}
//	}
//	else
//	{
//		//°ªÀÌ ºñ¾îÀÖ´ÂÁö Ã¼Å©
//		if (obj.value == "")
//		{
//			window.alert(sMsg+" ÀÔ·ÂÇÏ¼¼¿ä.")
//			obj.focus()
//			obj.select()
//			return true
//		}
//		//¼ýÀÚÀÎÁö Ã¼Å©
//		if (isNumber)
//		{
//			if (isNaN(Number(obj.value)))
//			{
//				window.alert("¼ýÀÚ¸¸ °¡´ÉÇÕ´Ï´Ù.")
//				obj.focus()
//				obj.select()
//				return true
//			}
//		}
//		else
//		{
//			return false
//		}
//	}
//}
//function set_radio_btn(which, value)
//{
//	var target = document.getElementsByName(which)

//	if (target == null)
//		return
//	else
//	{
//		for (i=0; i< target.length; i++)
//		{
//			if (target[i].value.toUpperCase() == value.toUpperCase())
//			{
//				target[i].checked = true;
//			}
//		}
//	}
//}
//function make_number(sInput)
//{
//	//¼ýÀÚ·Î ¸¸µé¾îº¸ÀÚ.
//	var i=0

//	for (i=0;isNaN(sInput) && (i <= 10);i++)
//	{
//		sInput=sInput.replace(",","")
//	}
//	if (isNaN(sInput))
//	{
//		window.alert("ÄÞ¸¶(,) ¸¦ Á¦¿ÜÇÑ ¹®ÀÚ¸¦ ³ÖÁö ¸¶¼¼¿ä.")
//		return false
//	}
//	else
//	{
//		return Number(sInput)
//	}
//}
// Create a cookie with the specified name and value.
// The cookie expires at the end of the 20th century.
function SetCookie(sName, sValue)
{
	document.cookie = sName + "=" + escape(sValue) + ";"
}
function SetCookie_PathRoot(sName, sValue)
{
	document.cookie = sName + "=" + escape(sValue) + "; path=/;"
}
// Retrieve the value of the cookie with the specified name.
function GetCookie(sName)
{
	// cookies are separated by semicolons
	var aCookie = document.cookie.split("; ");

	for (var i=0; i < aCookie.length; i++)
	{
		// a name/value pair (a crumb) is separated by an equal sign
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
		return unescape(aCrumb[1]);
	}

	// a cookie with the requested name does not exist
	return null;
}
//ÀÌ¸ÞÀÏ Ã¼Å©
function isValidEmail(s) {
	if (s.indexOf(" ") >=0)
	{
		window.alert("°ø¹éÀ» Æ÷ÇÔÇÒ ¼ö´Â ¾ø½À´Ï´Ù.")
		return false;
	}
	var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return (re.test(s));
}
// '<', '>' °¡ ÀÖ´ÂÁö È®ÀÎÇÑ´Ù.
function hasTagSymbol(str) {
	var re = /<|>/g;
	return (re.test(str));
}
// »ç¿ëÇÒ ¼ö ¾ø´Â Å°¿öµå Ã¼Å© - ¹Ì´Ï¼¥¸í
//function hasInvalidShopName(str) {
//	var re = /(G¸¶ÄÏ|Áö¸¶ÄÏ|Áã¸¶ÄÏ|G-mall|G_mall|Áö¸ô|ÆÄ¿öµô·¯|¿ì¼öµô·¯)/gi;
//	return (re.test(str));
//}
// stringÀÇ byte ¼ö¸¦ ±¸ÇÑ´Ù.
function getStringByteLength(pStr)
{
    var c;
    var nLength = 0;
    var sStr = new String(pStr);
    for(i=0; i < sStr.length; i++)
    {
        c = sStr.charAt(i);
        if(escape(c).length > 4 )   // ÇÑ±Û
            nLength += 2;
        else
            nLength++;
    }
    return nLength;
}
// stringÀ» byte ¸¸Å­ ÀÚ¸¥´Ù.
function cutStringByteLength(pStr, iLength)
{
	if (iLength == 0) return ("");
	var c;
    var nLength = 0;
    var sStr = new String(pStr);
	var sResultStr = "";

    for(i=0; i < sStr.length; i++)
    {
        c = sStr.charAt(i);
        if(escape(c).length > 4 )   // ÇÑ±Û
		{
			if (nLength + 2 > iLength)
				return sResultStr;
			else
				nLength += 2;
		}
        else
		{
			if (nLength + 1 > iLength)
				return sResultStr;
			else
	            nLength++;
		}
		sResultStr += c;
    }
    return sResultStr;
}
// ¹®ÀÚ¿­ Ã¼Å© ÇÔ¼ö
// ÇÑ±Û, ¾ËÆÄºª, ¼ýÀÚ, °ø¹é, Çã¿ëÇÏ·ÁÇÏ´Â Æ¯¼ö ¹®ÀÚÀÇ Á¶ÇÕÀ¸·Î »ç¿ë °¡´É.
function hasInvalidSymbol(text, symbol, allowKorean, allowAlpha, allowNum, allowSpace) {
	if (text == "")
		return false;

	var expression = "/[^";
	expression += (allowKorean) ? "¤¡-ÆR" : "";
	expression += (allowAlpha) ? "a-zA-Z" : "";
	expression += (allowNum) ? "0-9" : "";
	expression += (allowSpace) ? " " : "";
	if (symbol != "") {
		symbol = symbol.replace(/(.)/g, "\\$1");
		expression += symbol;
	}
	expression += "]/";
	var re = eval(expression);
	return (re.test(text));
}
//function goSimplePage(sGoodsCode)
//{
//    var clientHeight;
//    var obj;
//    if(navigator.appVersion.indexOf("Windows NT 5.1")!=-1) {
//        clientHeight = 395;
//    }else {
//        clientHeight = 395;
//    }
//	GmktPopLayerAdd(NeverdieItemUrl + 'detailminiview/ItemMini.asp?goodscode=' + sGoodsCode+'#'+document.domain, 919, 603 )
//}
//function goEtcSimplePage(sGoodsCode, sSid, sInterGrpNo)
//{
//// ±âÈ¹Àü°ú °ü½É»óÇ°¿¡¼­ ³Ñ°ÜÁÙ¶§ »ç¿ëÇÏ´Â ÇÔ¼ö´Ù
//    var clientHeight;
//    var obj;
//    if(navigator.appVersion.indexOf("Windows NT 5.1")!=-1) {
//        clientHeight = 395;
//    }else {
//        clientHeight = 395;
//    }
//	obj=window.open(url+"challenge/neo_simple_goods/simple_goods_frame.asp?goodscode=" + sGoodsCode + "&sid=" + sSid + "&interest_group_no=" + sInterGrpNo, "SimpleGoodsPage", "width=755, height="+clientHeight+", scrollbars=no, toolbar=no , status=no");
//	obj.focus();
//}
//function goGmsServicePop(){
//	var w = 800;
//	var h = 600;
//	var gms_main_pop = window.open(url + 'challenge/neo_gms/gms_main.asp', 'gms_main', 'top='+(screen.height-h)/3+',left='+(screen.width-w)/2+',toolbar=no, history=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, width='+w+', height='+h);
//	gms_main_pop.focus();
//}
// ÆäÀÌÁö ·Îµù Ã¼Å© ³¡
// string prototype definition, common functions
String.prototype.byte = function(){
	var cnt = 0;
	var chr = "";
	for( var i = 0; i < this.length; i++)
	{
		chr = this.charAt(i);
		if( escape( chr ).length > 4 ){
			cnt += 2;
		}else{
			cnt++;
		}
	}
	return cnt;
}
String.prototype.ltrim = function() {
	var re = /\s*((\S+\s*)*)/;
	return this.replace(re, "$1");
}
String.prototype.rtrim = function() {
	var re = /((\s*\S+)*)\s*/;
	return this.replace(re, "$1");
}
String.prototype.trim = function() {
	return this.ltrim().rtrim();
}
//function getObjInnerText(obj) {
//    return (obj.innerText) ? obj.innerText : (obj.textContent) ? obj.textContent : "";
//}
//function setObjInnerText(obj, str) {
//    if (obj.innerText) {
//        obj.innerText = str;
//        return 0;
//    }
//    else {
//        if (obj.textContent) {
//            obj.textContent = str;
//            return 0;
//        }
//        else {
//            return -1;
//        }
//    }
//}
function getUserAgentName()
{
	var agent = navigator.userAgent;
	var agentName = "";

	if( /Firefox[\/\s](\d+\.\d+)/.test(agent) ){//test for Firefox
		agentName = "FF";
	}else if( /MSIE (\d+\.\d+);/.test(agent) ){
		agentName = "IE";
	}else if( /Opera[\/\s](\d+\.\d+)/.test(agent) ){
		agentName = "OP";
	}else{
		agentName = "NA";
	}
	return agentName;
}
//function CommonApplyEvent2(Str, encStr, reloadYn){
//	SetCookie_PathRoot("Cif", Str);
//	SetCookie_PathRoot("CSif", encStr);

//	if (typeof(reloadYn) == "undefined")
//	{
//		reloadYn = "N"
//	}
//	window.open("/challenge/neo_event_platform/event_common_apply.asp?sif="+Str+"&reload="+reloadYn, "eventpop", "width=350, height=185, left=500, top=400, scrollbars=no,status=no,toolbar=no");
//	return;
//}
function CommonApplyEventPlatform(Str, encStr, reloadYn, password, groupYn) {
	document.cookie = "ECif" + "=" + escape(encStr) + "; path=/;domain=gmarket.co.kr";
	if (typeof (reloadYn) == "undefined") {
		reloadYn = "N";
	}
	if (typeof (password) == "undefined") {
		password = "";
	}
	if (typeof (groupYn) == "undefined") {
		groupYn = "N";
	}
	var openerURL = document.URL;
	window.open(NeverdieEventUrl + "eventplatform/EventPlatformApply.asp?epif="+Str+"&reload="+reloadYn+"&groupYn="+groupYn+"&password="+password + "&openerURL=" + openerURL , "eventpop", "width=350, height=185, left=500, top=400, scrollbars=no,status=no,toolbar=no");
	return;
}
//function goBasketCommon(pObjName) {
//	var listform;
//	for(i=0; i<document.forms.length; i++){
//		if (document.forms[i].name == pObjName)
//		{
//			listform = document.forms[i];
//		}
//	}
//	if (listform.goodscode == null) {
//		alert ("Àå¹Ù±¸´Ï¿¡ ´ãÀ» »óÇ°ÀÌ ¾ø½À´Ï´Ù.\n\n¿øÇÏ´Â »óÇ°À» °Ë»öÇÏ½Å ÈÄ, Àå¹Ù±¸´Ï¿¡ ´ãÀ» »óÇ°À» ¼±ÅÃÇÏ¼¼¿ä.");
//		return;
//	}
//	var iCheckedCnt = listform.goodscode.length;
//	var bAlert = false;
//	var bChecked = false;
//	var bChkCnt = 0;
//	var aChkCnt = 0;
//	var bChkArr = new Array();
//	var alertMsg = "";
//	if (iCheckedCnt == null) { // Search Result Only 1
//		if (!listform.goodscode.checked) {
//			alert ("Àå¹Ù±¸´Ï¿¡ ´ãÀ» »óÇ°À» ¼±ÅÃÇÏ¼¼¿ä.");
//			return;
//		}
//		if (listform.check_value.value != "") {
//			bAlert = true;
//			bChkCnt = -1;
//		}
//	}else{ // Sesarch Result More 2
//		for (i = 0; i < iCheckedCnt; i++) {
//			if (listform.goodscode[i].checked) {
//				bChecked = true;

//				if (listform.check_value[i].value != "") {
//					alertMsg = alertMsg + "\n - " + listform.gd_nm[i].value;
//					bAlert = true;
//					bChkCnt++;
//					bChkArr.push(i);
//				}
//				aChkCnt++;
//			}
//		}
//		if (!bChecked) {
//			alert ("Àå¹Ù±¸´Ï¿¡ ´ãÀ» »óÇ°À» ¼±ÅÃÇÏ¼¼¿ä.");
//			return;
//		}
//	}
//	if (bAlert) {
//		if (bChkCnt == -1){  // Search Result Only 1
//			var alertMsgDefault = "¼±ÅÃÇÏ½Å »óÇ°Àº [¼±ÅÃÁ¤º¸(¿É¼Ç¼±ÅÃ)] ¶Ç´Â [°æ¸ÅÁ¤º¸],[¿©Çà/¿¹¾àÁ¤º¸],[C2 »óÇ°Á¤º¸]°¡\nÇÊ¿äÇÑ »óÇ°ÀÌ Æ÷ÇÔµÇ¾îÀÖ½À´Ï´Ù. [Àå¹Ù±¸´Ï ´ã±â]´Â »óÇ° »ó¼¼ ÆäÀÌÁö¿¡¼­ °¡´ÉÇÕ´Ï´Ù.\n";
//			alert (alertMsgDefault);
//			listform.goodscode.checked = false;
//		}else if (aChkCnt == 1 && bChkCnt == 1){
//			var alertMsgDefault = "¼±ÅÃÇÏ½Å »óÇ°Àº [¼±ÅÃÁ¤º¸(¿É¼Ç¼±ÅÃ)] ¶Ç´Â [°æ¸ÅÁ¤º¸],[¿©Çà/¿¹¾àÁ¤º¸],[C2 »óÇ°Á¤º¸]°¡\nÇÊ¿äÇÑ »óÇ°ÀÌ Æ÷ÇÔµÇ¾îÀÖ½À´Ï´Ù. [Àå¹Ù±¸´Ï ´ã±â]´Â »óÇ° »ó¼¼ ÆäÀÌÁö¿¡¼­ °¡´ÉÇÕ´Ï´Ù.\n";
//			alert (alertMsgDefault);
//			listform.goodscode[bChkArr[0]].checked = false;
//		}else{
//			var alertMsgDefault = "¼±ÅÃÇÏ½Å »óÇ° Áß [¼±ÅÃÁ¤º¸(¿É¼Ç¼±ÅÃ)] ¶Ç´Â [°æ¸ÅÁ¤º¸],[¿©Çà/¿¹¾àÁ¤º¸],[C2 »óÇ°Á¤º¸]°¡\nÇÊ¿äÇÑ »óÇ°ÀÌ Æ÷ÇÔµÇ¾îÀÖ½À´Ï´Ù. [Àå¹Ù±¸´Ï ´ã±â]´Â »óÇ° »ó¼¼ ÆäÀÌÁö¿¡¼­ °¡´ÉÇÕ´Ï´Ù.\n\n* Ãß°¡Á¤º¸ ÇÊ¿äÇÑ »óÇ° List\n";
//			alert (alertMsgDefault + alertMsg);
//			for (var icnt = 0; icnt < bChkArr.length; icnt ++) {
//				listform.goodscode[bChkArr[icnt]].checked = false;
//			}
//		}
//		return;
//	}
//	var top, left
//	try{
//		top = screen.availHeight/2 - 180/2;
//		left = screen.availWidth/2 - 458/2;
//	}catch (e){
//		top = 100;
//		left = 100;
//	}
//	var goBasketWin = window.open(url+"challenge/neo_include/dummy.asp", "goBasketWin", "width=458, height=180, scrollbars=yes, status=no, resizable=no left="+ left +", top="+ top +"");
//	listform.target = "goBasketWin";
//	listform.action = url+"challenge/neo_order/gmktGoBasket.asp";
//	listform.submit();
//	goBasketWin.focus();
//}
function getKeyValue()
{
	var regexResult = /key=(\d+)+/.exec(window.location.hash);
	if (regexResult && regexResult.length > 1)
	{
		return parseInt(regexResult[1]);
	}
	return 0;
}
function checkHistoryBack( limitTime )
{
	var keyValue = getKeyValue();
	var currentDate = new Date();
	if (keyValue == 0)
	{
		window.location.hash = "key=" + currentDate.valueOf();
	}
	else
	{
		var delta = currentDate.valueOf() - keyValue
		if (delta > limitTime)
		{
            location.replace(url+"error_log/expired.asp");
		}
	}
}
function checkHistoryBackAlertAndGo( limitTime, pAlertMsg, pURL)
{
	var keyValue = getKeyValue();
	var currentDate = new Date();
	if (keyValue == 0)
	{
		window.location.hash = "key=" + currentDate.valueOf();
	}
	else
	{
		var delta = currentDate.valueOf() - keyValue
		if (delta > limitTime)
		{
			alert(pAlertMsg);
			location.replace(pURL);
		}
	}
}
function checkHistoryBackNoAlertAndGo( limitTime, pURL)
{
	var keyValue = getKeyValue();
	var currentDate = new Date();
	if (keyValue == 0)
	{
		window.location.hash = "key=" + currentDate.valueOf();
	}
	else
	{
		var delta = currentDate.valueOf() - keyValue
		if (delta > limitTime)
		{
			location.replace(pURL);
		}
	}
}
function checkAdLink(sSuccBidNo,sLinkUrl,sAdTarget,sAdType,sDivForm)
{
	if (document.getElementById(sDivForm))
	{
		if (sSuccBidNo > 100000)
		{
			document.getElementById(sDivForm).src = "http://bidadlog.gmarket.co.kr/adcheck.html?succ_bid_no="+sSuccBidNo+"&ad_type="+sAdType ;
		}

	}
	if (sAdType == 2)
	{
		if (sAdTarget == "_blank")
		{
			window.open(sLinkUrl);
		}
		else
		{
			location.href = 	sLinkUrl;
		}
	}
}
function GmktIframeReload( sIdStr )
{
	var IframeLayer     = document.getElementById(sIdStr);
	if ( IframeLayer ) IframeLayer.contentWindow.location.reload();
}
var GMKTpopLayerIndex = 0;
var GMKTpopLayerParentReload = "N";
function GmktTopLeft(){
    var T, L;
	if (window.pageYOffset){T = window.pageYOffset }
	else if(document.documentElement && document.documentElement.scrollTop){T = document.documentElement.scrollTop; }
	else if(document.body){ T = document.body.scrollTop; }
	if(window.pageXOffset){ L=window.pageXOffset }
	else if(document.documentElement && document.documentElement.scrollLeft){L=document.documentElement.scrollLeft; }
	else if(document.body){ L=document.body.scrollLeft; }
	arrTopLeft = new Array( T, L );
	return arrTopLeft;
}
function GmktPageSize() {
	var W1,W2,H1,H2;
	var pageWidth,pageHeight;
	if(window.innerHeight&&window.scrollMaxY){
		W2=document.body.scrollWidth;
		H1=window.innerHeight+window.scrollMaxY
	}else{
		if(document.body.scrollHeight>document.body.offsetHeight){
			H1=document.body.scrollHeight
		}else{
			H1=document.body.offsetHeight
		}
		if(document.body.scrollWidth>document.body.offsetWidth){
			W2=document.body.scrollWidth;
		}else{
			W2=document.body.offsetWidth;
		}
	}
	if(self.innerHeight){
		W1=self.innerWidth;
		H2=self.innerHeight
	}else{
		if(document.documentElement&&document.documentElement.clientHeight){
			W1=document.documentElement.clientWidth;
			H2=document.documentElement.clientHeight
		}else{
			if(document.body){
				W1=document.body.clientWidth;
				H2=document.body.clientHeight
			}
		}
	}
	if(H1<H2){
		pageHeight=H2
	}else{
		pageHeight=H1
	}
	if(W2<W1){
		pageWidth=W1
	}else{
		pageWidth=W2
	}
	arrPageSize=new Array(pageWidth,pageHeight,W1, H2);
	return arrPageSize;
}
function GmktPopLayerSetParentReload( str ) {
	GMKTpopLayerParentReload = str ;
}
function GmktPopLayerInit(callback, sUrl, sWidth, sHeight, sClickYn ) {
    var fileref= document.createElement('link');
		var tmpUrl = location.href ;
		var tmpCss;
		if (tmpUrl.indexOf("dev") < 0 )
		{
			if ( tmpUrl.indexOf("https://") < 0 )
				tmpCss = "http://script.gmarket.co.kr/css/common/dimmed.css";
			else
				tmpCss = "https://script.gmarket.co.kr/css/common/dimmed.css";
		} else {
			if ( tmpUrl.indexOf("https://") < 0 )
				tmpCss = "http://scriptdev.gmarket.co.kr/css/common/dimmed.css";
			else
				tmpCss = "https://scriptdev.gmarket.co.kr/css/common/dimmed.css";
		}
		// add poplayer css
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", tmpCss );
	if ( navigator.appVersion.indexOf("MSIE") > -1 )
	{
		var loaded = false;
		fileref.onreadystatechange= function () {
			if (this.readyState == 'loaded' || this.readyState == 'complete') {
				if (loaded) {
					return;
				}
				loaded = true;
				callback(sUrl, sWidth, sHeight, sClickYn );
			}
		}
	}
	else {
		callback(sUrl, sWidth, sHeight, sClickYn );
	}
		if (typeof fileref!="undefined")
		  document.getElementsByTagName("head")[0].appendChild(fileref);
}
function GmktPopLayerAddOrigin(sUrl, sWidth, sHeight, sClickYn )
{
	var popLayer     = document.getElementById("GmktPopLayer");
	if ( !popLayer )
	{
		// create poplayer
		var newPopLayer = document.createElement("div");
		newPopLayer.setAttribute('id','GmktPopLayer');
		newPopLayer.className ="poplayer";
		document.body.appendChild(newPopLayer);
		popLayer = newPopLayer;
	}
	var arrPageSize, arrTopLeft;
	arrPageSize = GmktPageSize();
	arrTopLeft = GmktTopLeft();
	
	popLayer.style.height = arrPageSize[1] + "px";
	popLayer.style.width = arrPageSize[0]+ "px";

	GMKTpopLayerIndex++;
	var element      = document.createElement("div");
	element.setAttribute('id','popLayer' + GMKTpopLayerIndex );

	element.className ="poplayer";
	element.style.height = arrPageSize[1] + "px";
	element.style.width = arrPageSize[0]+ "px";
	element.style.zIndex = 99998 +  GMKTpopLayerIndex ;

	var dimmed =  document.createElement("div");
	dimmed.setAttribute('id','popLayerDimmed' + GMKTpopLayerIndex );
	dimmed.className ="dimmed";
	if (navigator.userAgent.indexOf("Opera") != -1) dimmed.className = "dimmed_sub";
	if ( sClickYn == "Y" ) dimmed.onclick = GmktPopLayerDelete;
	else dimmed.onclick = GmktPopLayerNull;

	dimmed.style.width = arrPageSize[0]+ "px";
	if ( navigator.appVersion.indexOf("MSIE") > -1 &&  arrPageSize[1] > 4096 )
	{
		var dTop = document.body.scrollTop || document.documentElement.scrollTop;
		dimmed.style.height = 4096 + "px";
		if ( ( dTop + 4096 ) <  arrPageSize[1] ) dimmed.style.top = dTop - 1500;
		else dimmed.style.top = ( arrPageSize[1] - 4096 ) + "px";
	} else
		dimmed.style.height = arrPageSize[1] + "px";

	if ( (/MSIE (6)/).test(navigator.userAgent) )
	{
		var dIframe = document.createElement('iframe');
		dIframe.setAttribute('id', 'popLayerDimmedIframe' + GMKTpopLayerIndex  );
		dIframe.className = "blocker";
		if (sClickYn == "Y" )
			dIframe.src = "/challenge/neo_include/GmktPopLayerEvent.asp";
		else
			dIframe.src = 'about:blank';
		dimmed.appendChild(dIframe);

	}
	element.appendChild(dimmed);

	var contents = document.createElement("div");
	contents.setAttribute('id','popLayerContents' + GMKTpopLayerIndex );
	contents.className = "frame_setting";
	if ( sClickYn == "Y" ) contents.onclick = GmktPopLayerDelete;
	else contents.onclick = GmktPopLayerNull;
	var iTempTop = (arrPageSize[3] / 2) -  ( sHeight / 2) + ( arrTopLeft[0] )
	iTempTop = iTempTop < 0 ? 0 : iTempTop;
	contents.style.top = iTempTop  + "px";
	contents.style.left = (arrPageSize[2] / 2) -  ( sWidth / 2) + ( arrTopLeft[1] )  +"px";
	contents.style.width = sWidth + "px";

	var cIframe;
	try{    
	cIframe = (/MSIE (6|7|8)/).test(navigator.userAgent) ? document.createElement('<iframe name="' + 'popLayerIframe' + GMKTpopLayerIndex + '">') : document.createElement('iframe');
	}
	catch(e){cIframe = document.createElement('iframe');}
	cIframe.setAttribute('name', 'popLayerIframe' + GMKTpopLayerIndex  );
	cIframe.setAttribute('id', 'popLayerIframe' + GMKTpopLayerIndex  );
	cIframe.src = sUrl;
	cIframe.width = sWidth + 'px';
	cIframe.height = sHeight + 'px';
	cIframe.frameBorder = 'no';
	cIframe.scrolling = 'no';

	contents.appendChild(cIframe);

	element.appendChild(contents);

	for ( var i= 0 ; i < popLayer.childNodes.length ; i++ ) popLayer.childNodes[i].childNodes[0].style.display = "none";
	popLayer.appendChild(element);
}
function GmktPopLayerAdd( sUrl, sWidth, sHeight, sClickYn )
{
	GmktPopLayerInit(GmktPopLayerAddOrigin, sUrl, sWidth, sHeight, sClickYn);
}
function GmktPopLayerDelete()
{
	var popLayer = document.getElementById("GmktPopLayer");
	if ( popLayer )
	{
		if(popLayer.lastChild)
		{
			popLayer.removeChild(popLayer.lastChild);
			GMKTpopLayerIndex--;
			if ( GMKTpopLayerIndex == 0 )
				popLayer.style.height = "0px";
		}
		if (popLayer.lastChild)
			popLayer.lastChild.childNodes[0].style.display = "";
	}
	if ( GMKTpopLayerParentReload == "Y" )
		location.reload();
}
function GmktPopLayerDeleteAll()
{
	var popLayer = document.getElementById("GmktPopLayer");
	if ( popLayer)
	{
		while (popLayer.lastChild)
			popLayer.removeChild(popLayer.lastChild);
		GMKTpopLayerIndex = 0;
		popLayer.style.height = "0px";
	}
	if ( GMKTpopLayerParentReload == "Y" )
		location.reload();
}
function GmktPopLayerNull() {}
function GmktPopLayerModify(sUrl, sWidth, sHeight, sClickYn ){
	var IframeLayer     = document.getElementById("popLayerIframe" + GMKTpopLayerIndex );
	var contents = 	document.getElementById("popLayerContents" + GMKTpopLayerIndex );
	if ( contents ) {
		var dimmed = document.getElementById("popLayerDimmed" + GMKTpopLayerIndex );
		var dIframe = document.getElementById("popLayerDimmedIframe" + GMKTpopLayerIndex );
		if ( sClickYn == "Y") {
			dimmed.onclick = GmktPopLayerDelete;
			contents.onclick = GmktPopLayerDelete;
			if ( dIframe ) dIframe.src = "/challenge/neo_include/GmktPopLayerEvent.asp";
		} else {
			dimmed.onclick = GmktPopLayerNull;
			contents.onclick = GmktPopLayerNull;
			if ( dIframe ) dIframe.src = 'about:blank';
		}
	}
	if ( IframeLayer ) {
		if ( sUrl.length > 0 ) IframeLayer.src = sUrl;
		if ( sWidth.length > 0 )IframeLayer.width = sWidth + "px";
		if ( sHeight.length > 0 ) IframeLayer.height = sHeight + "px";
		GmktPopLayerResize("modify");
	}
}
function GmktPopLayerReload()
{
	var IframeLayer     = document.getElementById("popLayerIframe" + GMKTpopLayerIndex );
	if ( IframeLayer ) IframeLayer.contentWindow.location.reload();
}
function GmktPopLayerReloadAll()
{
	var IframeLayer;
	for ( var i= 1 ; i <=GMKTpopLayerIndex ; i++ )
	{
		IframeLayer = document.getElementById("popLayerIframe" + i );
		if ( IframeLayer )
			IframeLayer.contentWindow.location.reload();
	}
}
function GmktPopLayerSetInnerIframe(sUrl){
	var iframe = document.getElementById( 'GmktPopupLayerInnerIframe' );
	if ( !iframe )
	{
		iframe = document.createElement("IFRAME");
		iframe.setAttribute('id', 'GmktPopupLayerInnerIframe' );
		iframe.width = '0px';
		iframe.height = '0px';
		document.body.appendChild(iframe);
	}
	iframe.src = sUrl;
}
function GmktPopLayerAddInner(sUrl, sWidth, sHeight, sClickYn ){
     var iframeDomain = "";
	 if ( document.location.href.split("#").length == 2 )iframeDomain = 'http://' + document.location.href.split("#")[1];
     var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=add&c=' + sClickYn  + '&h='+sHeight + '&w=' + sWidth + '&url=' + escape(sUrl);
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerDeleteInner(){
    var iframeDomain = "";
	if ( document.location.href.split("#").length == 2 )iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=delete';
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerModifyInner( sUrl, sWidth, sHeight, sClickYn ){
	var iframeDomain = "";
	if ( document.location.href.split("#").length == 2 )iframeDomain = 'http://' + document.location.href.split("#")[1];
    var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=modify&c=' + sClickYn  + '&h=' +sHeight + "&w=" + sWidth + "&url=" + escape(sUrl);
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerReplaceParentInner( sUrl )
{
    var iframeDomain = "";
	if ( document.location.href.split("#").length == 2 )iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=replaceparent&url=' + escape(sUrl);
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerReloadParentInner()
{
	var iframeDomain = "";
	if ( document.location.href.split("#").length == 2 )iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=reloadparent';
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerAddInnerNet(sUrl, sWidth, sHeight, sClickYn ){
	parent.GmktPopLayerAdd(sUrl, sWidth, sHeight, sClickYn );
}
function GmktPopLayerDeleteInnerNet(){
	parent.GmktPopLayerDelete();
}
function GmktPopLayerModifyInnerNet( sUrl, sWidth, sHeight, sClickYn ){
	parent.GmktPopLayerModify( sUrl, sWidth, sHeight, sClickYn );
}
function GmktPopLayerReplaceParentInnerNet( sUrl )
{
	parent.location.href =  sUrl;
}
function GmktPopLayerReloadParentInnerNet()
{
	parent.window.location.reload();
}
function GmktPopLayerEtcInner( fname, fparam, fscript )
{
	var iframeDomain = "";
	if ( document.location.href.split("#").length == 2 )iframeDomain = 'http://' + document.location.href.split("#")[1];
	var iframeUrl = iframeDomain +'/challenge/neo_include/GmktPopLayerGate.asp?mode=etc&fname=' + fname + '&fscript=' + escape(fscript) + '&fparam=' + fparam;
	GmktPopLayerSetInnerIframe(iframeUrl);
}
function GmktPopLayerScroll()
{
	var popLayer     = document.getElementById("GmktPopLayer");
	if ( popLayer && GMKTpopLayerIndex > 0 )
	{
		var element, dimmed, contents ;

		var arrPageSize, arrTopLeft;
		arrPageSize = GmktPageSize();
		arrTopLeft = GmktTopLeft();
		popLayer.style.height = arrPageSize[1] + "px";
		popLayer.style.width = arrPageSize[0]+ "px";

		for ( var i= 1 ; i <=GMKTpopLayerIndex ; i++ )
		{
			element = document.getElementById("popLayer" + i );
			if (element)
			{
				element.style.height = arrPageSize[1] + "px";
				element.style.width = arrPageSize[0]+ "px";
			}
			dimmed =  document.getElementById("popLayerDimmed"+ i );
			if ( dimmed )
			{
				dimmed.style.width = arrPageSize[0]+ "px";
				if ( navigator.appVersion.indexOf("MSIE") > -1 &&  arrPageSize[1] > 4096 ) 
				{
					var dTop = document.body.scrollTop || document.documentElement.scrollTop;
					dimmed.style.height = 4096 + "px";
					if ( ( dTop + 4096 ) <  arrPageSize[1] ) dimmed.style.top = dTop - 1500;
					else dimmed.style.top = ( arrPageSize[1] - 4096 ) + "px";
				} else
					dimmed.style.height = arrPageSize[1] + "px";
			}
		}
	}
}
function GmktPopLayerResize( sMode)
{
	var popLayer     = document.getElementById("GmktPopLayer");
	if ( popLayer && GMKTpopLayerIndex > 0 )
	{
		var arrPageSize,  element, dimmed, contents , ciframe;
		arrPageSize = GmktPageSize();
		arrTopLeft = GmktTopLeft();
		popLayer.style.height = arrPageSize[1] + "px";
		popLayer.style.width = arrPageSize[0]+ "px";

		for ( var i= 1 ; i <=GMKTpopLayerIndex ; i++ )
		{
			element = document.getElementById("popLayer" + i );
			if (element)
			{
				element.style.height = arrPageSize[1] + "px";
				element.style.width = arrPageSize[0]+ "px";
			}
			dimmed =  document.getElementById("popLayerDimmed"+ i );
			if ( dimmed )
			{
				dimmed.style.width = arrPageSize[0]+ "px";
				if ( navigator.appVersion.indexOf("MSIE") > -1 &&  arrPageSize[1] > 4096 )
				{
					var dTop = document.body.scrollTop || document.documentElement.scrollTop;
					dimmed.style.height = 4096 + "px";
					if ( ( dTop + 4096 ) <  arrPageSize[1] ) dimmed.style.top = dTop - 1500;
					else dimmed.style.top = ( arrPageSize[1] - 4096 ) + "px";
				} else
					dimmed.style.height = arrPageSize[1] + "px";
			}
			contents =  document.getElementById('popLayerContents' + i );
			ciframe = document.getElementById("popLayerIframe" + i );
			if ( contents && ciframe )
			{
				if ( sMode == "modify" ) {
					var iTempTop = (arrPageSize[3] / 2) -  (parseInt(ciframe.height) / 2) + ( document.documentElement.scrollTop ||  document.body.scrollTop ) ;
					iTempTop = iTempTop < 0 ? 0 : iTempTop;
					contents.style.top = iTempTop +"px";
				}
				contents.style.left = (arrPageSize[2] / 2) -  (parseInt(ciframe.width) / 2) + ( arrTopLeft[1] )  +"px";
				contents.style.width = parseInt(ciframe.width) + "px";
			}
		}
	}
}
function GmktAddEvent(o, evtName, fun) {
	var oldFun = o[evtName];
	if (typeof oldFun != "function") {
		o[evtName] = fun;
	}else {
		o[evtName] = function() {
			oldFun.call(this);
			fun();
		}
	}
}
GmktAddEvent(window, 'onresize', GmktPopLayerResize);
GmktAddEvent(window, 'onscroll', GmktPopLayerScroll);

//gmkt.js ºÎºÐ

/*  Gmarket JavaScript Library, web real version
/*--------------------------------------------------------------------------*/
function GMKT() {
	this.version = 'web real version';
}

GMKT.prototype.onload = function (_func) {
	var _oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = _func;
	} else {
		window.onload = function () {
			_oldonload();
			_func();
		}
	}
}

GMKT.prototype.onresize = function (_func) {
	var _oldresize = window.onresize;
	if (typeof window.onresize != 'function') {
		window.onresize = _func;
	} else {
		window.onresize = function () {
			_oldresize();
			_func();
		}
	}
}

GMKT.prototype.onscroll = function (_func) {
	var _oldscroll = window.onscroll;
	if (typeof window.onscroll != 'function') {
		window.onscroll = _func;
	} else {
		window.onscroll = function () {
			_oldscroll();
			_func();
		}
	}
}

/*
gmkt Class

gmkt.onload()
gmkt.onresize()
*/
var gmkt = new GMKT();

//if (!$) {
//	var $ = function () {
//		var results = [], element;
//		for (var i = 0; i < arguments.length; i++) {
//			element = arguments[i];
//			if (typeof element == 'string')
//				element = document.getElementById(element);
//			results.push(element);
//		}
//		return results.length < 2 ? results[0] : results;
//	}
//};

/*
browser check
*/
var browser = {
	version: parseInt(navigator.appVersion),
	isNetscape: navigator.appName.indexOf("Netscape") != -1,
	isMicrosoft: navigator.appName.indexOf("Microsoft") != -1
};

var objPosition = function (obj) {
	var results = { top: 0, left: 0 };
	while (obj.offsetParent) {
		results.top = results.top + obj.offsetTop;
		results.left = results.left + obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return results;
};


/* standard table offsetTop, offserLeft  */
//function fnStandardPosition() {
//	var standard_table = document.getElementById("standard_table").lastChild;
//	return objPosition(standard_table);
//}

/*
getElementsByName alternative
1 parameter
*/

var $n = function () {
	var element;
	element = document.getElementsByName(arguments[0]);
	return element;
};


//String.prototype.byte = function () {

//	var cnt = 0;
//	var chr = "";

//	for (var i = 0; i < this.length; i++) {
//		chr = this.charAt(i);
//		if (escape(chr).length > 4) {
//			cnt += 2;
//		} else {
//			cnt++;
//		}
//	}

//	return cnt;
//}

//String.prototype.ltrim = function () {
//	var re = /\s*((\S+\s*)*)/;
//	return this.replace(re, "$1");
//}

//String.prototype.rtrim = function () {
//	var re = /((\s*\S+)*)\s*/;
//	return this.replace(re, "$1");
//}

//String.prototype.trim = function () {
//	return this.ltrim().rtrim();
//}

function autoNextTextFocus(beforeText, sLength, afterText) {
	if (beforeText.value.length == sLength) {
		document.getElementsByName(afterText)[0].focus();
	}
}

function changeFormatToNum(sValue) {
	return sValue.replace(/,/gi, "");
}

function changeFormatToComma(num) {
	var isNegative, i, strNum, strReturn;

	strNum = num.toString();
	strReturn = "";

	isNegative = false;

	if (strNum.substr(0, 1) == "-") {
		isNegative = true;
		strNum = strNum.substr(1);
	}

	if (strNum.length >= 3) {
		for (i = parseInt((strNum.length - 1) / 3); i >= 0; i--) {

			if (strNum.length >= 3) {
				strReturn = "," + strNum.substr(strNum.length - 3) + strReturn;
				strNum = strNum.substring(0, strNum.length - 3);
			}
			else {
				strReturn = "," + strNum + strReturn;
				strNum = "";
			}
		}
		strReturn = strReturn.substr(1);
	}
	else {
		strReturn = strNum;
	}

	if (isNegative) {
		strReturn = "-" + strReturn;
	}

	return strReturn;
}

/* Add Bookmarkt(IE, FF, Opera) */
function addBookmark(title, url) {
	if (window.sidebar) // firefox 
		window.sidebar.addPanel(title, url, "");
	else if (document.all) // ie
		window.external.AddFavorite(url, title);
	else
		alert("Press Ctrl - D to bookmark");
}

/* dynamic resizing for popup window */
function popupWindowResize() {
	var clientAgent = getUserAgentName();
	/* for IE */
	/*@cc_on@*/
	/*@if (@_win32)
	var winBody = self.document.body;
	var marginHeight = parseInt(winBody.topMargin) + parseInt(winBody.bottomMargin);
	var marginWidth = parseInt(winBody.leftMargin) + parseInt(winBody.rightMargin);
	var thisWidth = winBody.scrollWidth + (winBody.offsetWidth - winBody.clientWidth) + marginWidth - 2;
	var thisHeight = winBody.scrollHeight + (winBody.offsetHeight - winBody.clientHeight) + marginHeight + 20;

	@else @*/
		if( clientAgent == "FF" ){
			var marginHeight = 0;
			var marginWidth = 0;
			var thisWidth = self.document.documentElement.childNodes.item(1).scrollWidth + 9;//window.screen.availHeight;
			var thisHeight = self.document.documentElement.childNodes.item(1).scrollHeight;
		}else if( clientAgent == "OP" ){
			var marginHeight = 0;
			var marginWidth = 0;
			var thisWidth = self.document.documentElement.scrollWidth + 25;//window.screen.availHeight;
			var thisHeight = self.document.documentElement.scrollHeight + 30;
		}
	/*@end
	@*/

	self.resizeTo(thisWidth, thisHeight);
}

/*--------------------------------------------------------------------------*/
// gInitHelper Class (for onload event queuing)
/*
(example)

gInitHelper().addHandler(function()
{
document.getElementById("test").innerText = "document loading completed...";
});
*/
/*--------------------------------------------------------------------------*/
(function (window, undefined) {
	// Define a local copy of gInitHelper
	var gInitHelper = function () {
		return gInitHelper.fn.init();
	},

	document = window.document,

	_singleton,

	// Has the ready events already been bound?
		readyBound = false,

	// The functions to execute on DOM ready
		readyList = [],

	// The ready event handler
	DOMContentLoaded;

	gInitHelper.fn = gInitHelper.prototype =
	{
		init: function () {
			return this;
		},

		addHandler: function (fn) {
			// Attach the listeners
			this.bindReady();

			// If the DOM is already ready
			if (_singleton.isReady) {
				// Execute the function immediately
				fn.call(document);

				// Otherwise, remember the function for later
			} else if (readyList) {
				// Add the function to the wait list
				readyList.push(fn);
			}

			return this;
		},

		// Handle when the DOM is ready
		ready: function () {
			// Make sure that the DOM is not already loaded
			if (!_singleton.isReady) {
				// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
				if (!document.body) {
					return setTimeout(_singleton.ready, 13);
				}

				// Remember that the DOM is ready
				_singleton.isReady = true;

				// If there are functions bound, to execute
				if (readyList) {
					// Execute all of them
					var fn, i = 0;
					while ((fn = readyList[i++])) {
						fn.call(document);
					}

					// Reset the list of functions
					readyList = null;
				}
			}
		},

		bindReady: function () {
			if (readyBound) {
				return;
			}

			readyBound = true;

			// Catch cases where $(document).ready() is called after the
			// browser event has already occurred.
			if (document.readyState === "complete") {
				return _singleton.ready();
			}

			// Mozilla, Opera and webkit nightlies currently support this event
			if (document.addEventListener) {
				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

				// A fallback to window.onload, that will always work
				window.addEventListener("load", _singleton.ready, false);

				// If IE event model is used
			}
			else if (document.attachEvent) {
				// ensure firing before onload,
				// maybe late but safe also for iframes
				document.attachEvent("onreadystatechange", DOMContentLoaded);

				// A fallback to window.onload, that will always work
				window.attachEvent("onload", _singleton.ready);

				// If IE and not a frame
				// continually check to see if the document is ready
				var toplevel = false;

				try {
					toplevel = window.frameElement == null;
				} catch (e) { }
			}
		}
	};

	// All gInitHelper objects should point back to these
	_singleton = gInitHelper();

	// Cleanup functions for the document ready method
	if (document.addEventListener) {
		DOMContentLoaded = function () {
			document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
			_singleton.ready();
		};

	} else if (document.attachEvent) {
		DOMContentLoaded = function () {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if (document.readyState === "complete") {
				document.detachEvent("onreadystatechange", DOMContentLoaded);
				_singleton.ready();
			}
		};
	}

	window.gInitHelper = gInitHelper;

})(window);

// Image Error Loader
var httpheadertag;
if (document.location.href.indexOf("https:") >= 0) {
	httpheadertag = "https://sslimage.";
} else {
	httpheadertag = "http://image.";
}
NoImage = new Image();
NoImage.src = httpheadertag + 'gmarket.co.kr/challenge/neo_image/no_image.gif';

NoImage2 = new Image();
NoImage2.src = httpheadertag + 'gmarket.co.kr/challenge/neo_image/shopping_guide_img/image.gif';


function ImgLoadFirst(obj, simg) {
	if (simg == undefined) {
		if (NoImage.complete) {
			obj.src = NoImage.src;
		}
		else {
			obj.style.display = 'none';
		}
	} else {
		if (NoImage2.complete) {
			obj.src = NoImage2.src;
		}
		else {
			obj.style.display = 'none';
		}
	}

}

function imgLoadFirst(obj, simg) {
	ImgLoadFirst(obj, simg);
}

// GUID Generation & Page View Logging Script for GMKT PC (1.0)
/*
* Guid Profiler
*/
if (typeof guidProfiler === 'undefined') {
	var guidProfiler = {
		__pdsUrl: ((location.protocol.toLowerCase() == 'https:') ? 'https://pdsssl.gmarket.co.kr' : 'http://pds.gmarket.co.kr'), 	// prod

		SETGUIDS_URL: '/cookiemanager/setguids/1/P1',
		SETLOGIN_URL: '/cookiemanager/setlogin/1',

		SSGuid_EXPIRE_TIME: 1800000, // 30min in millisec		
		SSGuid_TEN_MIN: 600000, 		// 10min in millisec				
		PERSISTENT_COOKIE_EXPIRE_TIME: 31536000000,
		SSGuid_COOKIE_NAME: 'ssguid',
		SSGuid_FIX_GUID_LENGTH: 23,
		SSGuid_FIX_DIFF_LENGTH: 3,

		isSSGuidReset: false,

		setGUID: function () {
			var self = guidProfiler;

			var ssguid = self._getCookie(self.SSGuid_COOKIE_NAME);
			var ssguid_new = ssguid;

			var sguid = self._getCookie("sguid");
			var pguid = self._getCookie("pguid");
			var cguid = self._getCookie("cguid");

			ssguid_new = self._upsertCheckSSGuid(ssguid);
			if (self.isSSGuidReset == true) {
				self._removeCookie(self.SSGuid_COOKIE_NAME);
				self._send(self.__pdsUrl + self.SETGUIDS_URL);
			}
			else {
				if (self._getCookie(self.SSGuid_COOKIE_NAME).length < 1 || self._getCookie("sguid").length < 1 || self._getCookie("pguid").length < 1 || self._getCookie("cguid").length < 1) {
					self._send(self.__pdsUrl + self.SETGUIDS_URL);
				}
				if (ssguid_new != '' && ssguid_new != ssguid) {
					var expireTime = new Date(new Date().getTime() + self.PERSISTENT_COOKIE_EXPIRE_TIME);
					self._setGlobalCookie(self.SSGuid_COOKIE_NAME, ssguid_new, expireTime, "/", ".gmarket.co.kr");
				}
			}
			if (self._getCookie("pds") == '1') {
				self._setGlobalCookie("pds", "2", null, "/", ".gmarket.co.kr");
				self._send(self.__pdsUrl + self.SETLOGIN_URL);
			}
		},

		_upsertCheckSSGuid: function (currentSSGuid) {
			var self = guidProfiler;

			if (currentSSGuid == null || currentSSGuid == '') {
				self.isSSGuidReset = true;
				return '';
			}
			else {
				var now = new Date();
				var nowTime = now.getTime();

				var SSGuidTimeDiff = currentSSGuid.substr(self.SSGuid_FIX_GUID_LENGTH, self.SSGuid_FIX_DIFF_LENGTH);
				var SSGuidSeqNo = currentSSGuid.substr(self.SSGuid_FIX_GUID_LENGTH + self.SSGuid_FIX_DIFF_LENGTH);
				var firstAccTime = currentSSGuid.substr(1, 13) * 1;

				if (!isNaN(firstAccTime) && !isNaN(SSGuidTimeDiff) && !isNaN(SSGuidSeqNo)) {

					var LastAccTime = firstAccTime + SSGuidTimeDiff * self.SSGuid_TEN_MIN;
					if (nowTime - LastAccTime < self.SSGuid_EXPIRE_TIME) {
						SSGuidSeqNo = SSGuidSeqNo * (1) + 1;
						SSGuidTimeDiff = "00" + Math.floor(((nowTime - firstAccTime) / self.SSGuid_TEN_MIN)).toString();
						SSGuidTimeDiff = SSGuidTimeDiff.substr(SSGuidTimeDiff.length - self.SSGuid_FIX_DIFF_LENGTH);

						self.isSSGuidReset = false;
						return currentSSGuid.substr(0, self.SSGuid_FIX_GUID_LENGTH) + SSGuidTimeDiff + SSGuidSeqNo.toString();
					}
				}
				self.isSSGuidReset = true;
				return '';
			}
		},
		_getCookie: function (name) {
			var cookieName = name + '=';
			var docCookie = document.cookie;
			var start = docCookie.indexOf(cookieName);
			var retCookie = '';

			if (start > 0 && docCookie[start - 1] != ' ' && docCookie[start - 1] != ';') {
				start = docCookie.indexOf(cookieName, start + 1);
			}
			if (start != -1) {
				start += cookieName.length;
				var end = docCookie.indexOf(';', start);
				if (end == -1) end = docCookie.length;
				retCookie = docCookie.substring(start, end);
			}
			return retCookie;
		},
		_removeCookie: function (cookieName) {
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() - 1); 	// ¾îÁ¦ ³¯Â¥¸¦ ÄíÅ° ¼Ò¸ê ³¯Â¥·Î ¼³Á¤ÇÑ´Ù.
			document.cookie = cookieName + "=; expires=" + expireDate.toGMTString() + "; path=/;domain=gmarket.co.kr;";
		},
		_setGlobalCookie: function (name, value, expires, path, domain, secure) {
			var curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
			if ((name + "=" + escape(value)).length <= 4000) {
				document.cookie = curCookie;
			}
		},
		_send: function (url) {
			var imgTag = document.createElement('img');
			imgTag.src = url;
		}
	};
	setTimeout(guidProfiler.setGUID, 25);
}

/*
* Page View & User Behavior Profiler
*/
// User Behavior Profiler from ubprofiler_gmkt.js (ubprofiler_gmkt.js will be deprecated)
if (typeof ubprofiler === 'undefined') {
	var ubprofiler = {
		__pdsUrl: ((location.protocol.toLowerCase() == 'https:') ? 'https://pdsssl.gmarket.co.kr' : 'http://pds.gmarket.co.kr'), 	// prod

		send: function (behavior, src, ids, query) {
			var self = ubprofiler;

			var idStr = (typeof ids === 'object' && typeof ids.join === 'function') ? ids.join(',') : ids;
			var querystring = self._param(query);
			var url = self.__pdsUrl
				+ '/ub/add/1/' + self._encodeUri(behavior)
				+ '/' + self._encodeUri(src)
				+ '/' + self._encodeUri(idStr)
				+ (querystring ? '?' + querystring : '');
			self._send(url);
		},
		sendDirect: function (path, query) {
			var self = ubprofiler;

			var querystring = self._param(query);
			var url = self.__pdsUrl + path + (querystring ? (path.indexOf('?') === -1 ? '?' : '&') + querystring : '');
			self._send(url);
		},

		_send: function (url) {
			var imgTag = document.createElement('img');
			//var imgTag = new Image();		// Image() can be overwritten by other script
			imgTag.src = url;
		},
		_param: function (obj) {
			var self = ubprofiler;

			var ret = '';
			var tList = [];
			if (typeof obj === 'object') {
				for (var e in obj) {
					tList.push(e + '=' + self._encodeUri(obj[e]));
				}
				ret = tList.join('&');
			}
			return ret;
		},
		_encodeUri: function (value) {
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
		}
	};
}

if (typeof pvprofiler === 'undefined' && typeof ubprofiler !== 'undefined') {
	var pvprofiler = {							// page view profiler 
		// alias
		_windowAlias: window,
		_ubprofilerAlias: ubprofiler,
		_version: '1.2',

		send: function () {
			var self = pvprofiler;

			self._ubprofilerAlias.send(			// page view logging
				'view',
				'page',
				'1.0', 						// script version
				{
				'url': self._windowAlias.document.location.href,
				'ref': self._windowAlias.document.referrer,
				'lang': self._windowAlias.navigator.language || self._windowAlias.navigator.userLanguage || self._windowAlias.navigator.browserLanguage,
				'hlen': self._windowAlias.history.length,
				'sw': self._windowAlias.screen.width,
				'sh': self._windowAlias.screen.height
			}
			);
		},
		/* send page event 
		* @param string action required
		* @param string code required
		* @param string type optional
		* @param object/string value optional
		*/
		sendEvt: function (action, code, type, value) {
			var self = pvprofiler;

			if (action && code) {
				self._ubprofilerAlias.send(
		            'event'         // behavior
		            , 'page'        // src
		            , self._version
		            , {
		            	'url': document.location.href, 	// url, required
		            	'ref': document.referrer,       	// referrer url, optional
		            	'act': action,
		            	'acode': code,
		            	'atype': type || '',
		            	'avalue': ((typeof value === 'object') ? JSON.stringify(value) : value) || ''
		            }
		        );
			}
		}
	};
	setTimeout(pvprofiler.send, 25);
}
