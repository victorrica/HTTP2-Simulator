function noImageCheck()
{
	$("img").each(function(){
			$(this).error(function(){
				$(this).attr("src","http://img.iacstatic.co.kr/adbayimg/noimage.gif")
			});
	});
}
function getParameterByName(key)
{
	key			= key.replace(/[\\[]/, "\\\\[").replace(/[\\]]/, "\\\\]");
	var regex	= new RegExp("[\\\\?&]" + key + "=([^&#]*)");
	var results	= regex.exec(location.search);

	return (results == null ? "" : decodeURIComponent(results[1].replace(/\\+/g, " ")));
}
function executeAdbayMediaHouseAds()
{
	if(_adbayInventoryData.INV_UIS == "pu")
	{
		$("body").append(adbayAdsContents.creatives[0].src);
	}
	else if(_adbayInventoryData.INV_UIS == "fl")
	{
		if(adbayAdsContents.creatives[0].src != '')
		{
			try {
				adbayFloatingHouseCallback();	
			} catch ( e ) {
			}
		}
	}
	else
	{
		var params		= "";
		var articleId	= "";
		var newsId		= "";
		var pgid		= getParameterByName("pgid");
		var addParams	= "";

		try {
			if(top.sArticleId != undefined) { articleId = top.sArticleId; }
		} catch ( e ) {
		}
		try {
			if(top.news_id != undefined) { newsId = top.news_id; }
		} catch ( e ) {
		}
		
		if(articleId != "") addParams = "docId=" + articleId;
		else if(newsId != "") addParams = "docId=" + newsId;
		else if(pgid != "") addParams = "docId=" + pgid;

		if(location.search != "")
			params		= location.search + "&" + addParams;
		else
			params		= "?" + addParams;

		if(adbayAdsContents.ref != '') params		+= "&ref=" + adbayAdsContents.ref;
		
		document.getElementById("adbayHouseContentFrame").src = _adbayInventoryData.JSONP_URL.replace("jsonp", "house").replace('adapi.about.co.kr', 'ad.about.co.kr') + params;	
		$("#adbayHouseContent").show();
	}
}
var adbayControllerClass = function() {
	this.host			= "";
	this.adsLimit		= 4;
	this.parameter		= "";
	this.endpoint		= "";
	this.isThumbnail	= true;
	this.scheme			= document.location.protocol;
	this.referrer		= '';
	this.setAdbayURL = function(url) {
		if(url != "")
		{
			this.host	= url.split("/")[2];
			this.referrer = url;
		}
	};
	this.getAdbayURL = function() {
		return this.host;
	};
	this.setAdsLimit = function(width, height) {
		try {
			if (typeof trandBox != "undefined")
			{
				trandBox.init(width, height);
				this.adsLimit	= trandBox.length;
			}
			else
			{
				this.isThumbnail = false;
			}
		} catch(e) {
			this.isThumbnail = false;
		}
	};
	this.getAdsLimit = function() {
		return this.adsLimit;
	};
	this.exclusiveAdsUi = function(uis, ui)
	{
		var temp = uis.split(",");
		var rtnUis = new Array();
		for(i = 0 ; i < temp.length ; i++)
		{
			if(temp[i] != ui)
			{
				rtnUis.push(temp[i]);
			}
		}
		return rtnUis;
	};
	this.setParameter = function(uis, media, clickParam, callback, isRefresh, product_idx, category) {
		if((!this.isThumbnail) || (this.adsLimit == 0))
		{
			uis = this.exclusiveAdsUi(uis, "th");
		}
		var referrer = this.referrer != '' ? '&ref='+ escape(this.referrer) : '';
		this.parameter		= $.base64("encode", "host=" + this.host + "&uis=" + uis + "&limit=" + this.adsLimit + "&media=" + media + "&clk_param=" + escape(clickParam) + "&cb=" + escape(callback) + "&isRefresh=" + isRefresh + referrer + "&prd_idx=" + product_idx + "&category=" + category);
	};
	this.getParameter = function(uis) {
		return this.parameter;
	};
	this.setEndpoint = function(endpoint) {
		if(this.scheme == "https")
		{
			endpoint = endpoint.replace("http://", this.scheme+"://");
		}
		return this.endpoint = endpoint;
	};
	this.getEndpoint = function() {
		return this.endpoint;
	};
	this.run = function() {
		endpoint		= this.endpoint
		this.endpoint 	= this.endpoint + "?" + this.parameter + "&callback=?";
		$.getJSON(this.endpoint, function(data){
			adbayAdsContents = data;
			eval(adbayAdsContents["cb"]+"()");
			
			if(adbayAdsContents["cb"] != 'executeAdbayMediaHouseAds' && $('img').length <= 0 && getCookie('NOVIEW') == '')
			{
				endpoint		= endpoint.replace('adapi.about.co.kr/mad/jsonp', 'adclk.about.co.kr/mad/noview');
				$.get(endpoint);
				
				setCookie('NOVIEW', '1', 1);
			}
		});
	};
};
function runAdbayNetworkAd(adsUI, isRefresh)
{
	var adbayController = new adbayControllerClass();
	var inventoryUIs	= adsUI != "" ? adsUI : _adbayInventoryData.INV_UIS;
	adbayController.setAdbayURL(document.referrer);
	adbayController.setAdsLimit(_adbayInventoryData.INV_WIDTH, _adbayInventoryData.INV_HEIGHT);
	adbayController.setParameter(inventoryUIs, getParameterByName("media"), getParameterByName("clk_param"), getParameterByName("callback"), isRefresh, getParameterByName("prd_idx"), getParameterByName("category"));
	adbayController.setEndpoint(_adbayInventoryData.JSONP_URL);	
	adbayController.run();
}
function setCookie(cname, cvalue, exhour) {
	var d = new Date();
	d.setTime(d.getTime() + (exhour*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

$().ready(function () { runAdbayNetworkAd("", ""); });