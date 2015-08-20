var GLOBAL_CookieName = "IsGlobalYN";
var GLOBAL_CookieValue = "";
function fnGLOBALPageInit() {
		GLOBAL_CookieValue = fnGLOBALGetCookie(GLOBAL_CookieName);	
		if (GLOBAL_CookieValue == "") {
		    fnGLOBALCheck(""); 
		}	
}
function fnClickGlobalPopup(chooseSite){
	fnGLOBALSetCookie(GLOBAL_CookieName, "status=P");

	if(chooseSite == "KO"){
		location.href = "http://www.gmarket.co.kr";
	}else{
		location.href = "http://english.gmarket.co.kr";
	}
}
function fnGLOBALGetCookie(name) {
    try {
        var nameOfCookie = name + "=";
        var x = 0;
        while (x <= document.cookie.length) {
            var y = (x + nameOfCookie.length);
            if (document.cookie.substring(x, y) == nameOfCookie) {
                if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                    endOfCookie = document.cookie.length;
                return unescape(document.cookie.substring(y, endOfCookie));
            }
            x = document.cookie.indexOf(" ", x) + 1;
            if (x == 0)
                break;
        }
        return "";
    } catch (ex) {
        return "";
    }
}
function fnGLOBALSetCookie(name, val) {
    try {
        var exdate = new Date();
		exdate.setDate(exdate.getDate() + 365);
        document.cookie = name + "=" + escape(val) + ";path=/;domain=gmarket.co.kr" + ((exdate == null) ? "" : ";expires=" + exdate.toUTCString());
    } catch (ex) {
        return;
    }
}
function fnGLOBALCheck() {
    document.domain = "gmarket.co.kr";

    if (document.getElementById("getGeoIP") != null) {   
        document.getElementById("getGeoIP").src = "http://www.gmarket.co.kr//challenge/neo_include/GeoIpGate.asp";
    }
}
function GlobalLinkRedirection() {
    if (document.getElementById("getGeoIP").value == "KR") {   
        document.getElementById("modGlobalPopup").style.display = "none";
    }
    else {
        document.getElementById("modGlobalPopup").style.display = "";
        CommonCheckNatinoInfo.Init();
    }
}
//국가코드 -> 배송가능 여부
function NationDeliveryYN(data) {
    var nations = ["AL", "AE", "AR", "AU", "AT", "BD", "BY", "BE", "BR", "BN", "BG", "KH", "CA", "CL", "CN", "CR", "HR", "CZ", "DK", "DO", "EC", "EG", "SV", "FJ", "FI", "FR", "DE", "GR", "HK", "HU", "IN", "ID", "IE", "IL", "IT", "JP", "KZ", "KE", "LV", "LU", "MO", "MY", "MX", "MN", "MA", "MM", "NL", "NZ", "NG", "NO", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "SA", "SG", "SK", "SI", "ES", "LK", "SE", "CH", "TW", "TH", "TR", "UA", "GB", "US", "UZ", "VN", "KR"];

    if ($.inArray(data, nations) == -1)   //배송 불가 국가
        return false;
    else							      //배송 가능 국가
        return true;
}
function NationCurrencyMapping() { }
//국가코드, 국가명, 국가통화
NationCurrencyMapping.NationInfo = {	
    "Nation": {
        "AL": { "x": "Albania", "y": "USD" },
        "AE": { "x": "Arab Emirates", "y": "AED" },
        "AR": { "x": "Argentina", "y": "USD" },
        "AU": { "x": "Australia", "y": "AUD" },
        "AT": { "x": "Austria", "y": "EUR" },
        "BD": { "x": "Bangladesh", "y": "USD" },
        "BY": { "x": "Belarus", "y": "USD" },
        "BE": { "x": "Belgium", "y": "EUR" },
        "BR": { "x": "Brazil", "y": "BRL" },
        "BN": { "x": "Brunei Darussalam", "y": "USD" },
        "BG": { "x": "Bulgaria", "y": "EUR" },
        "KH": { "x": "Cambodia", "y": "USD" },
        "CA": { "x": "Canada", "y": "CAD" },
        "CL": { "x": "Chile", "y": "USD" },
        "CN": { "x": "China", "y": "CNY" },
        "CR": { "x": "CostaRica", "y": "USD" },
        "HR": { "x": "Croatia", "y": "EUR" },
        "CZ": { "x": "Czech Republic", "y": "EUR" },
        "DK": { "x": "Denmark", "y": "EUR" },
        "DO": { "x": "Dominican Republic", "y": "USD" },
        "EC": { "x": "Ecuador", "y": "USD" },
        "EG": { "x": "Egypt", "y": "USD" },
        "SV": { "x": "El Salvador", "y": "USD" },
        "FJ": { "x": "Fiji", "y": "USD" },
        "FI": { "x": "Finland", "y": "EUR" },
        "FR": { "x": "France", "y": "EUR" },
        "DE": { "x": "Germany", "y": "EUR" },
        "GR": { "x": "Greece", "y": "EUR" },
        "HK": { "x": "Hong Kong", "y": "HKD" },
        "HU": { "x": "Hungary", "y": "EUR" },
        "IN": { "x": "India", "y": "USD" },
        "ID": { "x": "Indonesia", "y": "USD" },
        "IE": { "x": "Ireland", "y": "EUR" },
        "IL": { "x": "Israel", "y": "USD" },
        "IT": { "x": "Italy", "y": "EUR" },
        "JP": { "x": "Japan", "y": "JPY" },
        "KZ": { "x": "Kazakhstan", "y": "KZT" },
        "KE": { "x": "Kenya", "y": "USD" },
        "LV": { "x": "Latvia", "y": "EUR" },
        "LU": { "x": "Luxembourg", "y": "EUR" },
        "MO": { "x": "Macau", "y": "MOP" },
        "MY": { "x": "Malaysia", "y": "MYR" },
        "MX": { "x": "Mexico", "y": "USD" },
        "MN": { "x": "Mongolia", "y": "MNT" },
        "MA": { "x": "Morocco", "y": "USD" },
        "MM": { "x": "Myanma", "y": "EUR" },
        "NL": { "x": "Netherlands", "y": "EUR" },
        "NZ": { "x": "New Zealand", "y": "NZD" },
        "NG": { "x": "Nigeria", "y": "USD" },
        "NO": { "x": "Norway", "y": "NOK" },
        "PE": { "x": "Peru", "y": "USD" },
        "PH": { "x": "Philippines", "y": "PHP" },
        "PL": { "x": "Poland", "y": "EUR" },
        "PT": { "x": "Portugal", "y": "EUR" },
        "QA": { "x": "Qatar", "y": "USD" },
        "RO": { "x": "Romania", "y": "EUR" },
        "RU": { "x": "Russian Federation", "y": "RUB" },
        "SA": { "x": "Saudi Arabia", "y": "SAR" },
        "SG": { "x": "Singapore", "y": "SGD" },
        "SK": { "x": "Slovakia", "y": "EUR" },
        "SI": { "x": "Slovenia", "y": "EUR" },
        "ES": { "x": "Spain", "y": "EUR" },
        "LK": { "x": "Sri Lanka", "y": "USD" },
        "SE": { "x": "Sweden", "y": "EUR" },
        "CH": { "x": "Switzerland", "y": "EUR" },
        "TW": { "x": "Taiwan", "y": "TWD" },
        "TH": { "x": "Thailand", "y": "THB" },
        "TR": { "x": "Turkey", "y": "TRY" },
        "UA": { "x": "Ukraine", "y": "EUR" },
        "GB": { "x": "United Kingdom", "y": "GBP" },
        "US": { "x": "United States", "y": "USD" },
        "UZ": { "x": "Uzbekistan", "y": "USD" },
        "VN": { "x": "Vietnam", "y": "VND" },
        "KR": { "x": "South Korea", "y": "USD" }
    }
};
//국가코드 -> 국가명
NationCurrencyMapping.GetNationNm = function (data) {
    if (data != 0 && eval("NationCurrencyMapping.NationInfo.Nation." + data) != undefined)
        return eval("NationCurrencyMapping.NationInfo.Nation." + data + ".x");
    else
        return "";
};
//국가코드 -> 국가통화
NationCurrencyMapping.GetNationCur = function (data) {
    if (data != 0 && eval("NationCurrencyMapping.NationInfo.Nation." + data) != undefined)
        return eval("NationCurrencyMapping.NationInfo.Nation." + data + ".y");
    else
        return "";
};
//통화단위, 통화기호, 통화명
NationCurrencyMapping.CurrencyInfo = {
    "Currency": {
        "USD": { "x": "$", "y": "United States Dollar" },
        "JPY": { "x": "￥", "y": "Japanese Yen" },
        "EUR": { "x": "€", "y": "Euro" },
        "AUD": { "x": "A$", "y": "Australian Dollar" },
        "CAD": { "x": "C$", "y": "Canadian Dollar" },
        "HKD": { "x": "H$", "y": "Hong Kong Dollar" },
        "RUB": { "x": "pуб", "y": "Russian Ruble" },
        "SGD": { "x": "S$", "y": "Singapore Dollar" },
        "THB": { "x": "฿", "y": "Thai Baht" },
        "GBP": { "x": "￡", "y": "British Pound" },
        "TWD": { "x": "NT$", "y": "Taiwan New Dollar" },
        "CNY": { "x": "￥", "y": "Chinese Yuan" },
        "MYR": { "x": "RM", "y": "Malaysian Ringgit" },
        "VND": { "x": "₫", "y": "Vietnamese Dong" },
        "PHP": { "x": "₱", "y": "Philippine Peso" },
        "MNT": { "x": "₮", "y": "Mongolian Tugrik" },
        "NZD": { "x": "NZ$", "y": "New Zealand Dollar" },
        "AED": { "x": "Dh", "y": "Arab Emirates Dirham" },
        "MOP": { "x": "MOP$", "y": "Macanese Pataca" },
        "BRL": { "x": "R$", "y": "Brazilian Real" },
        "KZT": { "x": "₸", "y": "Kazakhstani Tenge" },
        "NOK": { "x": "Nkr", "y": "Norwegian Krone" },
        "SAR": { "x": "SR", "y": "Saudi Riyal" },
        "TRY": { "x": "TL", "y": "Turkish Lira" }
    }
};
//통화단위 -> 통화기호
NationCurrencyMapping.GetCurrencySign = function (data) {
    if (data != "" && eval("NationCurrencyMapping.CurrencyInfo.Currency." + data) != undefined)
        return eval("NationCurrencyMapping.CurrencyInfo.Currency." + data + ".x");
    else
        return "";
};
//통화단위 -> 통화명
NationCurrencyMapping.GetCurrencyNM = function (data) {
    if (data != "" && eval("NationCurrencyMapping.CurrencyInfo.Currency." + data) != undefined)
        return eval("NationCurrencyMapping.CurrencyInfo.Currency." + data + ".y");
    else
        return "";
};
var SELECTED_LANGUAGE; 
var SELECTED_CURRENCY;  
var SELECTED_CURRENCY_SIGN;
var SELECTED_CURRENCY_NAME;
var SELECTED_NATION;    
var SELECTED_NATION_NAME;
function CommonCheckNatinoInfo() { };
CommonCheckNatinoInfo.GetGeoIpInfo = function () {
    var code = document.getElementById("getGeoIP").value;
    return code;
}
CommonCheckNatinoInfo.Init = function () {
    var nationCode;
    var language;
    var currency;
    var notDeliveryNation;

    nationCode = CommonCheckNatinoInfo.GetGeoIpInfo();          //Geo IP 모듈에서 국가코드 가져오기   

    if (nationCode != "0" && nationCode != null) {              //국가정보가 있는 경우
        currency = NationCurrencyMapping.GetNationCur(nationCode);  //국가코드 -> 해당 국가의 통화단위        
        if (currency == "") {
            nationCode = "KR";
            currency = "USD";
        }
    }
    else {	 //국가정보가 없는 경우
        nationCode = "KR";
        currency = "USD";
    }

    if (nationCode != "CN")
        language = "enUS";
    else
        language = "zhCN";

    $j("#selLanguage").val(language).attr("selected", "selected");
    $j("#selCurrency").val(currency).attr("selected", "selected");
    $j("#selShoppingCountry").val(nationCode).attr("selected", "selected");
};
function GlobalGMKTRedirect() {    
    var lang, currency, nation;
    lang = $j("#selLanguage option:selected").val();
    currency = $j("#selCurrency option:selected").val();
    nation = $j("#selShoppingCountry option:selected").val();
    setGlobalCookie("charset", lang, 90);
    setGlobalCookie("currency", currency, 90);
    setGlobalCookie("shipnation", nation, 90);
	fnGlobalPopupClose();	// by tactic
    location.href = "http://global.gmarket.co.kr/"; 
}
function fnGLOBALCallback(rText, chooseSite) {
    try {

		if(rText == "True"){//국내
			document.getElementById("modGlobalPopup").style.display = "none";
		}else if (rText == "False"){//해외
			document.getElementById("modGlobalPopup").style.display = "";
		}

		
	}catch(ex){
		return;
	}
}
function fnCheckGlobalCookieString(str){
	var tempStr = str.split(";");
	var IsGlobal = tempStr[0].split("=");
	if(IsGlobal[1] == "True"){
		localtion.href = "http://www.gmarket.co.kr";
	}else if(IsGlobal[1] == "False"){
		localtion.href = "http://english.gmarket.co.kr";
	}else{
		localtion.href = "http://www.gmarket.co.kr";
	}
}
/* 이제 그만보기 체크  */
function fnGLOBALClose() {
    try {
        var obj = eval("(" + GLOBAL_CookieValue + ")");
        var objJson = obj.GLOBAL;
        var iIndex = -1;
        for (var i = 0; i < objJson.length; i++) {
            if (objJson[i].NO == document.getElementById("_GLOBAL_NO").value) {
                iIndex = i;
            }
        }

        if (iIndex == -1) { return; }

        objJson[iIndex].CloseType = "Y";

        GLOBAL_CookieValue = fnGLOBALJsonToString(obj);
        fnGLOBALSetCookie(GLOBAL_CookieName, GLOBAL_CookieValue, "D");

        document.getElementById("_GLOBAL_VIEW").style.display = "none";
        return;

    } catch (ex) {
        document.getElementById("_GLOBAL_VIEW").style.display = "none";
        return;
    }
}
/* 닫기 버튼 클릭 */
function fnGLOBALPClose() {
    try {
        var obj = eval("(" + GLOBAL_CookieValue + ")");
        var objJson = obj.GLOBAL;
        var iIndex = -1;
        for (var i = 0; i < objJson.length; i++) {
            if (objJson[i].NO == document.getElementById("_GLOBAL_NO").value) {
                iIndex = i;
            }
        }

        if (iIndex == -1) { return; }

        objJson[iIndex].CloseType = "Y";

        GLOBAL_CookieValue = fnGLOBALJsonToString(obj);
        fnGLOBALSetCookie(GLOBAL_CookieName, GLOBAL_CookieValue, "P");

        document.getElementById("_GLOBAL_VIEW").style.display = "none";
        return;

    } catch (ex) {
        document.getElementById("_GLOBAL_VIEW").style.display = "none";
        return;
    }
}
function fnGLOBALJsonToString(obj) {
    try {
        var tmp = "{\"GLOBAL\":[";
        for (var i = 0; i < obj.GLOBAL.length; i++) {
            if (i != 0) tmp += ",";
            tmp += fnJSONtoString(obj.GLOBAL[i]);
        }
        tmp += "]}";
        return tmp;
    } catch (ex) {
        return "";
    }
}
function fnJSONtoString(obj) {
    try {
        var results = [];
        for (var property in obj) {
            var value = obj[property];
            if (value)
                results.push("\"" + property.toString() + "\":\"" + fnGLOBALReplaceAll(value) + "\"");
        }
        return "{" + results.join(", ") + "}";
    } catch (ex) {
        return "";
    }
}
function fnGLOBALReplaceAll(vals) {
    return vals.split("\"").join("'");
}
function fnGlobalPopupClose(){
	fnGLOBALSetCookie(GLOBAL_CookieName, "status=P");
	document.getElementById("modGlobalPopup").style.display = "none";
}
