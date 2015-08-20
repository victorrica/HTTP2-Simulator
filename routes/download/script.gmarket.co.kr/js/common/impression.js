/**
 *  Nethru Script Module
 *  Copyright 2008 nethru, All Rights Reserved.
 **/

var _n_ls = "http://impssllog.gmarket.co.kr:8020/wlo/Logging";		/* logging server */
var _n_uid = "";			/* uid */

/* https logging */
if ( document.location.protocol == "https:" ) {
	_n_ls = "https://impssllog.gmarket.co.kr:8040/wlo/Logging";
}

var _n_sid = "ssllog"; /*logging folder 생성시 필요*/
var _n_pcid_cookie = "PCUID";
var _n_uid_cookie = "PCIDJCN";

var _n_first_logging = false;

var _n_logging_image = new Image();

/* Browser Information */
function CImpression() {}
CImpression.n_getBI = function() {
	var str = "";
	var dt = document;

	var strScreenSize = "";

	var ws = window.screen;
	if ( ws != null && ws != "undefined" ) {
		strScreenSize = screen.width+"x"+screen.height;
	}
	str +="n_ss=" + strScreenSize + "; ";

	var cs = "-";
	var nv = navigator;

	if ( nv.language ) {  
		cs = nv.language.toLowerCase();
	} 
	else if ( nv.userLanguage ) {
		cs = nv.userLanguage.toLowerCase();
	}

	str +="n_cs=" + cs + "; ";

	return str;
}

CImpression.n_getCV = function(offset,escapeFlag){
	var dc = document.cookie;
	var endstr = dc.indexOf (";", offset);
	
	if (endstr == -1) endstr = dc.length;

	if ( escapeFlag )
		return unescape(dc.substring(offset, endstr));
	else
		return dc.substring(offset, endstr);
}

CImpression.n_GetCookie = function(name,escapeFlag){
	var dc = document.cookie;
	var arg = name + "=";
	var alen = arg.length;
	var clen = dc.length;
	var i = 0;

	while (i < clen) 
	{
		var j = i + alen;
		
		if (dc.substring(i, j) == arg) {
			return CImpression.n_getCV (j,escapeFlag);
		}

		i = dc.indexOf(" ", i) + 1;
		
		if (i == 0)
			break;
	}

	return null;
}

CImpression.n_SetGlobalCookie = function(name, value){
	var argv = CImpression.n_SetGlobalCookie.arguments;
	var argc = CImpression.n_SetGlobalCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;

	document.cookie = 
		name + "=" + escape (value)
		+ ((expires == null) ? "" : ("; expires="+expires.toGMTString()))
		+ ((path == null) ? "" : ("; path=" + path))
		+ ((domain == null) ? "" : ("; domain=" + domain))
		+ ((secure == true) ? "; secure" : "");
}

CImpression.n_makePersistentCookie = function(){
	var today = new Date();
	var expiredDate = new Date(2100,1,1);
	var cookie;
	var value;

	cookie = CImpression.n_GetCookie("PCUID",true);
	
	if ( cookie ) {
		_n_first_pcuid = false;
		return cookie;
	}
	_n_first_pcuid = true;

	var values = new Array();

	for ( i=0; i < 10 ; i++ ) {
		values[i] = "" + Math.random();
	}

	value = today.getTime();

	for ( i=0; i < 10 ; i++ ) {
		value += values[i].charAt(2);
	}

	CImpression.n_SetGlobalCookie("PCUID",value,expiredDate,"/",CImpression.n_getDomain());

	return value;
}

CImpression.n_getDomain = function()
{
	var _host   = document.domain;
	var so = _host.split('.');
	var dm  = so[so.length-2] + '.' + so[so.length-1];

	return (so[so.length-1].length == 2) ? so[so.length-3] + '.' + dm : dm;
}

/* String을 URI 로 Encoding */
CImpression.n_encodeStr = function(s)
{
	if (typeof(encodeURI) == 'function') {
		s=encodeURI(s);
		s=s.split("#").join("%23");
		return s;
	}
	else
		return escape(s);
}

CImpression.n_getReferrer = function()
{
	var my_ref = self.document.referrer;

	var parent_href = "";
	var parent_ref = "";

	try {
		parent_href = top.document.location.href;
		parent_ref = top.document.referrer;
	}
	catch(e) {
		return my_ref;
	}

	if ( my_ref == parent_href )
		return parent_ref;

	return my_ref;
}

CImpression.sendWebLog = function() {
	if (CImpression.n_GetCookie("PCUID",true) == null) CImpression.n_makePersistentCookie();
	//웹로그 분석 용: n_makePersistentCookie() 먼저 Call 필수
	
	//웹로그 서버 http 요청은 implog3 https 요청은 implog1으로 변경함.
	if (locationProtocol == "http://") { 		
		document.write("<table cellpadding=0 cellspacing=0 style='display:none;'><tr><td><img src=\"" + _n_ls + "?cu=" + encodeURI(location.href)  + "&referrer=" + CImpression.n_getReferrer() + "\"  width=0 height=0 border=0></td></tr></table>");
	} else {
		document.write("<table cellpadding=0 cellspacing=0 style='display:none;'><tr><td><img src=\"" + _n_ls + "?cu=" + encodeURI(location.href)  + "&referrer=" + CImpression.n_getReferrer() + "\"  width=0 height=0 border=0></td></tr></table>");
	}
}

/* Cookie 정보를 가지고 온다. */
function n_getCookieStr() 
{
	/* PCID */
	var pcid = "";
	
	/* Browser Info */
	var binfo = CImpression.n_getBI();
	var cookies = "";
	
	try {

		if ( (typeof _n_pcid_cookie)!="undefined" && _n_pcid_cookie != "" ) {
			_n_pcid = CImpression.n_GetCookie(_n_pcid_cookie,true);	
			if ( _n_pcid != null && _n_pcid != "" ) {
				cookies += _n_pcid_cookie + "=" + _n_pcid + "; ";
			}
		}

		if ( (typeof _n_uid_cookie)!="undefined" && _n_uid_cookie != "" ) {
			_n_uid = CImpression.n_GetCookie(_n_uid_cookie,true);	
			if ( _n_uid != null && _n_uid != "" ) {
				cookies += _n_uid_cookie + "=" + _n_uid + "; ";
			}
		}

		return cookies + binfo;
	}
	catch(e) {
		return document.cookie + binfo;
	}
}

/* Common Logging : 실제의 Logging 을 담당*/
CImpression.n_common_logging = function(_req, _ref, _title){

	var _n_request = _req;
	var _n_referrer = _ref;
	var _n_cookie = n_getCookieStr();
	var _n_agent = navigator.userAgent;
	var _n_title = _title;
	
	/* Make URL Parameter */ 
	var _n_target_url = _n_ls +
						"?" +
						"dv=" + Math.round(Math.random()*1999083012) +
						"|ver=1.0.0" +
						"|sid=" + CImpression.n_encodeStr(_n_sid) +
						"|r=" + CImpression.n_encodeStr(_n_request) +
						"|rf=" + CImpression.n_encodeStr(_n_referrer) +
						"|c=" + CImpression.n_encodeStr(_n_cookie) +
						"|a=" + CImpression.n_encodeStr(_n_agent);

	_n_logging_image.src = _n_target_url;

	/* User Attribute Logging() */ 

}

CImpression.n_logging = function(){
	
	if (_n_first_logging == false)
	{
	    CImpression.n_common_logging( document.location.href, CImpression.n_getReferrer(), document.title.toString() );
	    _n_first_logging = true;
	}
}

/************* User Cookie & Logging Start() ************/ 
try {
    if ( document.location.protocol == "https:" ) {
	    CImpression.n_logging();
    }

    CImpression.n_makePersistentCookie();
} catch(e) {}
/************** User Cookie & Logging End() *************/ 