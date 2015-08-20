var bAutoFlag = false;
var shIe = true;
var acDiv_Width = "296", acDiv_Ment1 = "해당 단어로 시작하는 추천어가 없습니다", acDiv_Ment2 = "해당 단어로 끝나는 추천어가 없습니다";
var gmktMain_keystatus = 1; // keysatus 1 : No Input, 2 : Start Input
var gmktBRType = gmktMain_getNavigatorType();
var gmktMain_tIE = gmktMain_get_nav();
var gmktMain_cBR = gmktMain_chk_rt(gmktMain_tIE);
var gmktMain_Ip;
var gmktMain_m_on = 0, gmktMain_m_now = 0, gmktMain_s_now = 0, gmktMain_shl = 0, gmktMain_a_now = 0, gmktMain_a_on = 0, gmktMain_arr_on = 0, gmktMain_frm_on = 0;
var gmktMain_cn_use = "use_ac";
var gmktMain_wi_int = 500;
var gmktMain_B = "block", gmktMain_I = "inline", gmktMain_N = "none", gmktMain_UD = "undefined";
var gmktMainBox_N = "search-area", gmktMainBox_B = "search-area2";
var gmktMain_bak = "", gmktMain_old = "";
var qs_ac_list = "", qs_ac_id = "", qs_q = "", qs_qc = "", qs_m = 0, qs_ac_len = 0; // search keyword save
var qs_ac_list_ad = "", qs_ac_ad_len = 0; // monopoly_ad 
var gmktMain_acuse = 1; // autocomplete on : 1, off : 0
var gmktMain_cc = new Object();
var gmktMain_help = 0;
var gmktMain_ac_on = 0;
function fnAutoCompleteInit() { ; }
function gmktMain_init() {
    gmktMain_Ip = document.menusearchform.keyword;
    gmktMain_bak = gmktMain_old = gmktMain_Ip.value;
    gmktMain_wd();
    setTimeout("gmktMain_wi();", gmktMain_wi_int);
}
function gmktMain_getNavigatorType() {
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("msie") != -1) return 1;
    else if (agt.indexOf("firefox") != -1) return 2;
    else if (agt.indexOf("safari") != -1) return 3;
    else if (agt.indexOf("applewebkit") != -1) return 3;
    else if (agt.indexOf("opera") != -1) return 4;
    else return 0;
}
function gmktMain_setTextBox(flag, event) {
    var textbox = document.menusearchform.keyword;
    var _event;
    var key;
    try {
        if (gmktBRType == 1) {
            _event = window.event;
            nodeName = _event.srcElement.nodeName;
            key = _event.keyCode;
        } else if (gmktBRType == 2 || gmktBRType == 3 || gmktBRType == 4) {
            _event = event;
            nodeName = _event.target.nodeName;
            key = _event.which;
        } else {
            nodeName = "None";
        }
        if (gmktMain_keystatus == 1 && flag && key != 13) {
            textbox.value = "";
            gmktMain_keystatus = 2;
        }
    } catch (err) { }
}
function gmktMain_get_nav() {
    var ver = navigator.appVersion;
    if (navigator.appName.indexOf("Microsoft") != -1 && ver.indexOf("MSIE 4") == -1 && ver.indexOf("MSIE 3") == -1) {
        return 1;
    } else if (navigator.appName.indexOf("Netscape") != -1) return 2;
    else return 0;
}
function gmktMain_chk_rt(t) {
    if (t != 1) return 0;
    try {
        var Ip = document.menusearchform.keyword;
    } catch (e) {
        return 0;
    }
    return 1;
}
function gmkt_ac(flag, event) {
    gmktMain_setTextBox(flag, event);
    var e = window.event ? window.event : event;
    var c = window.event ? window.event.keyCode : event.which;
    if (gmktMain_getNavigatorType() == 1) {
        if (c == 220) {
            e.returnValue = false;
            return;
        }
    }
    if (bAutoFlag) return;

    bAutoFlag = true;
    shIe = false;
}

function search_keyword(keyword) {
	var f = document.menusearchform;
	var sf = document.Sform_direct;

	sf.keyword.value = keyword;
	sf.gdlc.value = f.gdlc.value;
	sf.submit();
}

var keyword1temp, keyword2temp;
function gmkt_getAdGoods(keyword1, keyword2) {
    keyword1temp = keyword1;
    keyword2temp = keyword2;
    var sv, req, esp;

    var ke = keyword1;
    ke = ke.replace(/ /g, "%20");
    esp = ke;
    if (gmktBRType == 2 || gmktBRType == 4) {
        esp = escape(ke);
    }

    var param = [{ name: 'p', value: esp}];
    var url = "http://www.gmarket.co.kr/challenge/neo_include/AutoCompleteAdNet.asp";
    //AjaxHelper.AsyncGetDataToGetServiceJsonp(url, param, "gmkt_getAdGoodsResult", null);
    CallAjaxService(url, param, "GET", "jsonp", "gmkt_getAdGoodsResult");
}

function gmkt_getAdGoodsResult(data) {
    eval(data.result);

    var adReportImg = "";
    var adReportLink = "";

    if (gmktAutoCompleteADLen > 0) {

        jQuery("#autoSearch").attr("class", "search-auto");
        jQuery("#autoAdGoods").attr("style", "display:;");
        jQuery("#powerDiv").attr("class", "powerItem");

        //jQuery("#autoAdGoods_URL1").html('<a href=\"' + gmktAutoCompleteAD[1] + '\"><img src=\"' + gmktAutoCompleteAD[0] + '\" alt=\"\"></a>');
        //jQuery("#autoAdGoods_URL2").html('<span><a href=\"' + gmktAutoCompleteAD[1] + '#\">' + gmktAutoCompleteAD[2] + '</a></span> <strong>' + gmktAutoCompleteAD[3] + '</strong>');

        adReportLink = "javascript:adReport('A31R1S" + gmktAutoCompleteAD[4] + "');";
        adReportImg = "<img src=\"http://pds.gmarket.co.kr/ub/add/1/impression/ad/A31R1S" + gmktAutoCompleteAD[4] + "\" style=\"display:none;\" width=\"0\" height=\"0\" />";
        
        jQuery("#autoAdGoods_IMG").attr("src", gmktAutoCompleteAD[0]);
        jQuery("#autoAdGoods_URL1").attr("href", gmktAutoCompleteAD[1]);      
        jQuery("#autoAdGoods_TXT").html(gmktAutoCompleteAD[2]);
        jQuery("#autoAdGoods_PRICE").html(gmktAutoCompleteAD[3]);
        
        jQuery("#autoAdGoods_URL1").attr("onclick", adReportLink);
        jQuery("#autoAdGoods").after(adReportImg);

    } else {
        //			$("#autoSearch>div").attr("class", "");
        jQuery("#autoAdGoods").attr("style", "display:none;");
        jQuery("#autoSearch").attr("class", "search-auto");
        jQuery("#powerDiv").attr("class", "");

        if (keyword2temp.length > 0)
            gmkt_getAdGoods(keyword2temp, "");
        else if (keyword1temp != jQuery("#keyword").val())
            gmkt_getAdGoods(jQuery("#keyword").val(), "");
    }

}


function gmktMain_wd() {
    if (gmktMain_acuse == 1) gmktMain_Ip.autocomplete = "off";
    else if (gmktMain_acuse == 0) gmktMain_Ip.autocomplete = "on";
    gmktMain_Ip.onclick = gmktMain_req_ipc;
    gmktMain_Ip.onblur = gmktMain_dis_p;
}
var gmktMain_dnc = 0;
function gmktMain_req_ipc(event) {
    gmktMain_dnc = 1;
    gmktMain_frm_on = 0;
    gmktMain_req_ac2(1, event);
}
function gmktMain_ac_hide() {
    if (document.getElementById('autoSearch')) {
        if (document.getElementById("autoSearch").style.display == gmktMain_N) return;
        document.getElementById("autoSearch").style.display = gmktMain_N;
        document.getElementById("AutoBox").className = gmktMainBox_N;
        gmktMain_a_on = gmktMain_a_now = 0;
    }
}
function gmktMain_set_ahl() {
    if (!gmktMain_a_on) return;
    var o1, o2;
    if (!gmktMain_help) {
        for (i = 0; i < qs_ac_len; i++) {
            o1 = document.getElementById('gmktMain_ac' + (i + 1));
            if ((i + 1) == gmktMain_a_now) {
                o1.style.backgroundColor = '#f2f2f2';
                gmkt_getAdGoods(qs_ac_list[i], "");
            }
            else
                o1.style.backgroundColor = '';
        }
    }
}
function gmktMain_set_acpos(v) {
    gmktMain_a_now = v;
    setTimeout('gmktMain_set_ahl();', 10);
}
var gmktMain_max_row = 4;
function gmktMain_ackhl(event) {
    var e = window.event ? window.event : event;
    var o1, o2;
    var c = window.event ? window.event.keyCode : event.which;
    if (c == 220) {
        e.returnValue = false;
        return;
    }
    if (c == 39) { // Left arrow
        gmktMain_req_ac2(1, event);
    }
    if (c == 13) { // Enter
        if (gmktMain_a_now > 0) {
            chk_menusrch_val();
        }
    }
    if (c == 40 || (c == 9 && !e.shiftKey)) { // 40 : Down Arrow, 9 : Tab
        if (gmktMain_m_on) return;
        if (!gmktMain_a_on) {
            gmktMain_req_ac2(1, event);
            return;
        }
        if (gmktMain_a_now < qs_ac_len) {
            if (gmktMain_a_now == 0) gmktMain_bak = gmktMain_Ip.value;
            gmktMain_a_now++;
            o1 = document.getElementById('gmktMain_ac' + gmktMain_a_now);
            o2 = document.getElementById('gmktMain_acq' + gmktMain_a_now);
            
            if (o2 != null) {
                gmktMain_old = gmktMain_Ip.value = o2.innerHTML;
                gmktMain_Ip.focus();
                gmktMain_set_ahl();
                e.returnValue = false;
            }            
        }
    }
    if (gmktMain_a_on && (c == 38 || (c == 9 && e.shiftKey))) { // 38: Up Arrow, 9 : Tab
        if (!gmktMain_a_on) return;
        if (gmktMain_a_now <= 1) {
            gmktMain_ac_hide();
            gmktMain_old = gmktMain_Ip.value = gmktMain_bak;
        } else {
            gmktMain_a_now--;
            o1 = document.getElementById('gmktMain_ac' + gmktMain_a_now);
            o2 = document.getElementById('gmktMain_acq' + gmktMain_a_now);

            if (o2 != null) {
                gmktMain_old = gmktMain_Ip.value = o2.innerHTML;
                gmktMain_Ip.focus();
                gmktMain_set_ahl();
                e.returnValue = false;
            }             
        }
    }
}
function gmktMain_js_makehigh_pre(s, t) {
    var d = "";
    var s1 = s.replace(/ /g, "");
    var t1 = t.replace(/ /g, "");
    t1 = t1.toLowerCase();
    if (t1 == s1.substring(0, t1.length)) {
        d = "<strong>";
        for (var i = 0, j = 0; j < t1.length; i++) {
            if (s.substring(i, i + 1) != " ") j++;
            d += s.substring(i, i + 1)
        }
        d += "</strong>" + s.substring(i, s.length)
    }
    return d;
}
function gmktMain_js_makehigh_suf(s, t) {
    var d = "";
    var s1 = s.replace(/ /g, "");
    var t1 = t.replace(/ /g, "");
    t1 = t1.toLowerCase();
    if (t1 == s1.substring(s1.length - t1.length)) {
        for (var i = 0, j = 0; j < s1.length - t1.length; i++) {
            if (s.substring(i, i + 1) != " ") j++;
            d += s.substring(i, i + 1);
        }
        d += "<strong>";
        for (var k = i, l = 0; l < t1.length; k++) {
            if (s.substring(k, k + 1) != " ") l++;
            d += s.substring(k, k + 1);
        }
        d += "</strong>";
    }
    return d;
}
function gmktMain_js_highlight(s, d, is_suf) {
    var ret = "";
    if (!is_suf) {
        ret = gmktMain_js_makehigh_pre(s, d);
    } else {
        ret = gmktMain_js_makehigh_suf(s, d);
    }
    if (ret == "") return s;
    else return ret;
}
function gmktMain_js_strlen(s) {
    var i, l = 0;
    for (i = 0; i < s.length; i++)
        if (s.charCodeAt(i) > 127) l += 2;
        else l++;
    return l;
}
function gmktMain_set_acinput(v) {
    if (!gmktMain_a_on) return;
    var o = document.getElementById('gmktMain_acq' + gmktMain_a_now);
    gmktMain_old = gmktMain_Ip.value = o.innerHTML;
    document.getElementById('getSearchEng').innerHTML = gmktMain_old
    gmktMain_Ip.focus();
    gmktMain_ac_hide();
}

function gmktMain_get_aclist(aqo) {
    var d = "", ds = "", l = 0, s = "", cnt = 0, pos = 0, qlen = 0, temp_list = "";
    if (qs_ac_list[0] != "") {
        s += "<li class='blind'><span id='getSearchEng' style='display:none'>" + aqo + "</span></li>";
        for (i = 0; i < qs_ac_len; i++) {
            ds = d = qs_ac_list[i];
            l = gmktMain_js_strlen(d);
            pos = d.indexOf(gmktMain_Ip.value);
            if (pos >= 0) {
                if (pos == 0) {
                    ds = gmktMain_js_highlight(ds, gmktMain_Ip.value, 0);
                } else {
                    ds = gmktMain_js_highlight(ds, gmktMain_Ip.value, 1);
                }
            }
            if (i == 0)
                gmkt_getAdGoods(jQuery("#keyword").val(), d);
            s += "<li id='gmktMain_ac" + (i + 1) + "' onmouseover=\"gmktMain_set_acpos('" + (i + 1) + "');gmkt_getAdGoods('" + d + "','')\" onmouseout=\"gmktMain_set_acpos(0); \" onclick=\"gmktMain_set_acinput('" + (i + 1) + "')\">";
            s += "<a href='javascript:search_keyword(\"" + d + "\");'>" + ds + "</a>";
            s += "<span id='gmktMain_acq" + (i + 1) + "' style='display:none'>" + d + "</span></li>";
        }
    }
    return s;
}

function gmktMain_get_help() {
    var s = "", ment = "";
    ment = "자동완성기능입니다.";
    s += "<li id='gmktMain_ac1' onmouseover=\"gmktMain_set_acpos(1); \" onmouseout=\"gmktMain_set_acpos(0); \"><a>";
    s += ment + "</a></li>";
    s += "<span id=acq1 style='display:none'>" + gmktMain_old + "</span>";
    return s;
}
function gmktMain_trim_space(ke, me) {
    if (me != 2) {
        ke = ke.replace(/^ +/g, "");
        ke = ke.replace(/ +$/g, " ");
    } else {
        ke = ke.replace(/^ +/g, " ");
        ke = ke.replace(/ +$/g, "");
    }
    ke = ke.replace(/ +/g, " ");
    return ke;
}
function gmktMain_get_ac0() {
    var s = "", ment = "";
    if (qs_m == 1) ment = acDiv_Ment1;
    else if (qs_m == 2) ment = acDiv_Ment2;
    s += "<span id='getSearchEng' style='display:none'></span>";
    s += "<li id='gmktMain_ac1' class= \"none\">";
    s += ment + "</li>";
    s += "<span id=acq1 style='display:none'>" + gmktMain_old + "</span>";

    gmkt_getAdGoods(document.menusearchform.keyword.value, "");

    return s;
}
function gmktMain_print_ac(aqo, aq, ai) {
    if (qs_ac_list[0] == "") {
        document.getElementById('keywordOrg').value = aq;
        document.getElementById('keywordCVT').value = "";
        document.getElementById('keywordCVTi').value = ai;
        document.getElementById("autoFillData").innerHTML = gmktMain_get_ac0();
    } else {
        document.getElementById('keywordOrg').value = aq;
        document.getElementById('keywordCVT').value = qs_ac_list;
        document.getElementById('keywordCVTi').value = ai;
        document.getElementById("autoFillData").innerHTML = gmktMain_get_aclist(aqo);
    }
    document.getElementById("autoSearch").style.display = gmktMain_B;

    document.getElementById("AutoBox").className = gmktMainBox_B;
    setTimeout('gmktMain_set_ahl();', 10);
}
function gmktMain_print_ac_help() {
    document.getElementById("autoFillData").innerHTML = gmktMain_get_help();
    document.getElementById("autoSearch").style.display = gmktMain_B;
    document.getElementById("AutoBox").className = gmktMainBox_B;
}
function gmktMain_ac_show(aqo, aq, al, ai, am, event, al_ad) {
    gmktMain_help = 0;
    gmktMain_ac_on = 1;
    if (aq && aq != "" && aq != gmktMain_trim_space(gmktMain_Ip.value, am)) return;
    qs_q = aq;
    qs_m = am;
    qs_ac_list = al;
    qs_ac_id = ai;
    qs_ac_list_ad = al_ad;
    qs_ac_len = qs_ac_list.length;
    qs_ac_ad_len = qs_ac_list_ad.length;
    var h = (qs_ac_len > 4) ? 4 : qs_ac_len;
    h = h * 19;

    gmktMain_print_ac(aqo, aq, ai);
    if (qs_ac_list[0] == "" && (qs_m == 1 || qs_m == 2)) {
        qs_ac_len = 1;
        h = 19;
        if (qs_ac_list[0] == "") h = h + 19;
    }
    if (qs_ac_len) {
        h += 38;
        gmktMain_a_on = 1;
    } else {
        gmktMain_a_on = 0;
    }
    document.getElementById("autoSearch").style.display = gmktMain_B;
    document.getElementById("AutoBox").className = gmktMainBox_B;

    if (gmktMain_a_on) {
        gmktMain_set_acpos(0);
        gmktMain_Ip.onkeydown = gmktMain_ackhl;
    }
}
function gmktMain_get_cc(me) {
    var ke = gmktMain_trim_space(gmktMain_Ip.value, me) + me;
    return typeof (gmktMain_cc[ke]) == gmktMain_UD ? null : gmktMain_cc[ke];
}
function gmktMain_set_cc(aqo, aq, al, ai, me, al_ad) {
    gmktMain_cc[aq + me] = new Array(aqo, aq, al, ai, al_ad);
}
function gmktMain_wi(event) {
    if (gmktMain_acuse == 0) return;
    if (gmktMain_m_on) {
        setTimeout("gmktMain_wi()", gmktMain_wi_int);
        return;
    }
    var now = gmktMain_Ip.value;
    if (now == "" && now != gmktMain_old) gmktMain_ac_hide();
    if (now != "" && now != gmktMain_old && gmktMain_keystatus != 1) {
        var o = null, me = 1;
        o = gmktMain_get_cc(me);
        if (o && o[1][1] != "") {
            gmktMain_ac_show(o[0], o[1], o[2], o[3], me, event, o[4]);
        } else {
            gmktMain_reqAC(me, event);
        }
    }
    gmktMain_old = now;
    setTimeout("gmktMain_wi()", gmktMain_wi_int);
}
function gmktMain_dis_p() {
    if (gmktMain_dnc) {
        gmktMain_dnc = 0;
        return;
    }
    if (gmktMain_arr_on) {
        return;
    }
    if (gmktMain_frm_on) {
        return;
    }
    gmktMain_ac_hide();
    gmktMain_help = 0;
}
function gmktMain_req_ac2(me, event) {
    if (gmktMain_Ip.value == "" || gmktMain_acuse == 0) return;
    if (gmktMain_help) {
        gmktMain_ac_hide();
        var o = gmktMain_get_cc(me);
        if (o && o[1][1] != "") gmktMain_ac_show(o[0], o[1], o[2], o[3], me, event, o[4]);
        else gmktMain_reqAC(me, event);
    } else {
        if (gmktMain_a_on && gmktMain_dnc) {
            gmktMain_ac_hide();
            return;
        }
        var o = gmktMain_get_cc(me);
        if (o && o[1][1] != "") gmktMain_ac_show(o[0], o[1], o[2], o[3], me, event, o[4]);
        else gmktMain_reqAC(me, event);
    }
}
var gmktMain__req = null;
function gmktMain_get_req() {
    if (gmktMain__req && gmktMain__req.readyState != 0) {
        gmktMain__req.abort();
    }
    try {
        gmktMain__req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            gmktMain__req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            gmktMain__req = false;
        }
    }
    if (!gmktMain__req && typeof XMLHttpRequest != gmktMain_UD) gmktMain__req = new XMLHttpRequest();
    return gmktMain__req;
}

function gmktMain_showAC(data) {

    eval(data.result);
    gmktMain_set_cc(qs_qc, qs_q, qs_ac_list, qs_ac_id, qs_m, qs_ac_list_ad);
    gmktMain_ac_show(qs_qc, qs_q, qs_ac_list, qs_ac_id, qs_m, event, qs_ac_list_ad);

}

function gmktMain_reqAC(me, event) {

    var sv, esp;
    var ke = gmktMain_trim_space(gmktMain_Ip.value, me);
    ke = ke.replace(/ /g, "%20");
    esp = ke;

    if (ke == "") {
        gmktMain_ac_hide();
        return;
    }
    if (gmktBRType == 2 || gmktBRType == 4) {
        esp = escape(ke);
    }

    var param = [{ name: 'p', value: me },
							{ name: 'q', value: esp}];

    var url = "http://www.gmarket.co.kr/challenge/neo_include/AutoCompleteNet.asp";

    //AjaxHelper.AsyncGetDataToGetServiceJsonp(url, param, "gmktMain_showAC", null);
    CallAjaxService(url, param, "GET", "jsonp", "gmktMain_showAC");
}



function gmktMain_ac_show_help() {
    var h = 19;
    gmktMain_a_on = 1;
    gmktMain_frm_on = 1;
    gmktMain_help = 1;
    gmktMain_ac_on = 0;
    gmktMain_print_ac_help();
    document.getElementById("autoSearch").style.display = gmktMain_B;
    document.getElementById("AutoBox").className = gmktMainBox_B;
}
function gmktMain_set_mouseon(f) {
    if (f == 1) gmktMain_arr_on = 1;
    else if (f == 2) gmktMain_frm_on = 1;
}
function gmktMain_set_mouseoff(f) {
    if (f == 1) gmktMain_arr_on = 0;
    else if (f == 2) gmktMain_frm_on = 0;
    gmktMain_ac_on = 0;
}
function gmktMain_req_pf() {
    gmktMain_frm_on = 1;
    gmktMain_req_ac2(1);
    gmktMain_Ip.focus();
    gmktMain_cursor_end();
}
function gmktMain_req_sf() {
    gmktMain_frm_on = 1;
    gmktMain_req_ac2(2);
    gmktMain_Ip.focus();
    gmktMain_cursor_end();
}
function gmktMain_cursor_end() {
    if (gmktMain_tIE == 1 && gmktMain_cBR == 1) {
        var rng = gmktMain_Ip.createTextRange();
        if (rng != null) {
            rng.move("textedit");
            rng.select();
        }
    }
}
function gmktMain_ac_swap(event) {
    if (gmktMain_help) {
        gmktMain_ac_hide();
        gmktMain_help = 0;
        gmktMain_ac_on = 0;
    } else if (document.menusearchform.keyword.value == "") {
        gmktMain_ac_show_help();
    } else {
        if (gmktMain_ac_on == "0") {
            if (qs_ac_list[gmktMain_a_now] == gmktMain_UD || qs_ac_list[gmktMain_a_now] == null || qs_ac_list[gmktMain_a_now] == "" || document.menusearchform.keyword.value == "") {
                gmktMain_ac_show_help();
            } else {
                var me = 1;
                gmktMain_old = gmktMain_trim_space(gmktMain_Ip.value, me) + me;
                document.menusearchform.keyword.focus();
                gmkt_ac(0, event);
            }
        } else {
            gmktMain_ac_hide();
            gmktMain_help = 0;
            gmktMain_ac_on = 0;
        }
    }
}

function CallAjaxService(requestUrl, argument, ajaxType, ajaxDataType, callBackFunction) {
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
        beforeSend: function (xhr) {

        },
        success: function (msg) {
            if (msg) {
                if (isAsync)
                    eval(callBackFunction)(msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    })
}

