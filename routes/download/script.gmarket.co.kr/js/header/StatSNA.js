var SNA_URL = "http://sna.gmarket.co.kr/?fcd=";
var SNA_CHANNELCODE_URL = "http://sna.gmarket.co.kr/?cc=";
//var SNA_CHANNELCODE_URL = "http://dev.gmarket.co.kr/sna/?cc=";

function GoSNA(rcode, idx, url, starget, channelcode) {
	if (starget == "stat") {
		document.getElementById("statsIframe").src = SNA_URL + "1" + rcode + "&index=" + idx + "&url=" + url;
	} else {
		location.href = SNA_URL + rcode + "&index=" + idx + "&url=" + url;
	}

	//cc값을 받은 경우 쿠키 저장
	if ((channelcode != null) && (channelcode != undefined)) {
		setChannelcodeCookie(channelcode);
	}
}

function GoSNAEx(rcode, idx, url, starget, channelcode) {
	if (starget == "stat") {
		document.getElementById("statsIframe").src = SNA_URL + rcode + "&index=" + idx + "&url=" + url;
	} else {
		location.href = SNA_URL + rcode + "&index=" + idx + "&url=" + url;
	}

	//cc값을 받은 경우 쿠키 저장
	if ((channelcode != null) && (channelcode != undefined)) {
		setChannelcodeCookie(channelcode);
	}
}

function GoSNAChannel(channelCode, url, starget, idx) {
	try {
		var subUrl = SNA_CHANNELCODE_URL + channelCode + ((typeof idx !== "undefined") ? "&index=" + idx : "") + "&url=" + url;

		if (typeof starget !== "undefined") {
			if (starget == "stat") {
				if (document.getElementById("statsIframe") != null)
					document.getElementById("statsIframe").src = subUrl;
			} else if (starget == "_blank") {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = subUrl;
			} else {
				location.href = subUrl;
			}
		} else {
			location.href = subUrl;
		}

		GoPdsUrl(channelCode);

		setChannelcodeCookie(channelCode);
	}
	catch (e) {
		if (typeof starget === "undefined")
			location.href = url;
	}
}

function GoSNAChannelC(channelCode, url, starget, idx) {
	try {
		var subUrl = SNA_CHANNELCODE_URL + channelCode + ((typeof idx !== "undefined") ? "&index=" + idx : "") + "&url=" + url;

		var sHeader = document.menusearchform.sheaderkey;
		if (sHeader && sHeader.value == "MAIN") {
			if (starget == "_blank") {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = subUrl;
			} else if (starget == "stat") {
				document.getElementById("statsIframe").src = subUrl;
			} else {
				location.href = subUrl;
			}
		} else {
			if (starget == "_blank") {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = url;
			} else if (starget == "stat") {
			} else {
				location.href = url;
			}
		}
	}
	catch (e) {
		if (starget == "_blank") {
			var openNewWindow = window.open("about:blank");
			openNewWindow.location.href = url;
		} else if (starget == "stat") {
		} else {
			location.href = url;
		}
	}

	//cc값을 받은 경우 쿠키 저장
	setChannelcodeCookie(channelCode);
}

function GoSNAC(rcode, idx, url, starget, channelcode) {
	try {
		var sHeader = document.menusearchform.sheaderkey;
		if (sHeader && sHeader.value == "MAIN") {
			if (starget == "_blank") {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = SNA_URL + "1" + getSNACommonFcd(rcode) + "&index=" + idx + "&url=" + url;
			} else if (starget == "stat") {
				document.getElementById("statsIframe").src = SNA_URL + "1" + getSNACommonFcd(rcode) + "&index=" + idx + "&url=" + url;
			} else {
				location.href = SNA_URL + "1" + getSNACommonFcd(rcode) + "&index=" + idx + "&url=" + url;
			}
		} else {
			if (starget == "_blank") {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = url;
			} else if (starget == "stat") {
			} else {
				location.href = url;
			}
		}
	}
	catch (e) {
		if (starget == "_blank") {
			var openNewWindow = window.open("about:blank");
			openNewWindow.location.href = url;
		} else if (starget == "stat") {
		} else {
			location.href = url;
		}
	}

	//cc값을 받은 경우 쿠키 저장
	if ((channelcode != null) && (channelcode != undefined)) {
		setChannelcodeCookie(channelcode);
	}
}
function GoSNACode(rcode, idx, url, starget, channelcode) {
	try {
		var sHeader = document.menusearchform.sheaderkey;
		if (sHeader && sHeader.value == "MAIN") {
			if (starget == "_blank") {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = SNA_URL + "1" + rcode + "&index=" + idx + "&url=" + url;
			} else if (starget == "stat") {
				document.getElementById("statsIframe").src = SNA_URL + "1" + rcode + "&index=" + idx + "&url=" + url;
			} else {
				location.href = SNA_URL + "1" + rcode + "&index=" + idx + "&url=" + url;
			}
		} else {
			if (starget == "_blank") {
				var openNewWindow = window.open("about:blank");
				openNewWindow.location.href = url;
			} else if (starget == "stat") {
			} else {
				location.href = url;
			}
		}
	}
	catch (e) {
		if (starget == "_blank") {
			var openNewWindow = window.open("about:blank");
			openNewWindow.location.href = url;
		} else if (starget == "stat") {
		} else {
			location.href = url;
		}
	}

	//cc값을 받은 경우 쿠키 저장
	if ((channelcode != null) && (channelcode != undefined)) {
		setChannelcodeCookie(channelcode);
	}
}
function GoSNAD(rcode, idx, url, starget, channelcode) {
	if (starget == "_blank") {
		var openNewWindow = window.open("about:blank");
		openNewWindow.location.href = SNA_URL + rcode + "&index=" + idx + "&url=" + url;
	} else if (starget == "stat") {
		document.getElementById("statsIframe").src = SNA_URL + rcode + "&index=" + idx + "&url=" + url;
	} else {
		location.href = url;
	}

	//cc값을 받은 경우 쿠키 저장
	if ((channelcode != null) && (channelcode != undefined)) {
		setChannelcodeCookie(channelcode);
	}
}

//쿠키 저장
function setChannelcodeCookie(channelcode) {
	var expire = new Date();
	expire.setHours(expire.getHours() + 1);
	var cookieName = "cc";
	var domain = "gmarket.co.kr";

	document.cookie = cookieName + "=" + escape(channelcode) + "; expires=" + expire.toGMTString() + "; path=/" + ";domain=" + domain;
}

function GoSNAChannelNoUrl(channelCode) {
	var subUrl = SNA_CHANNELCODE_URL + channelCode;
	if (document.getElementById("statsIframe")) {
		document.getElementById("statsIframe").src = subUrl;
	}

	GoPdsUrl(channelCode);
	setChannelcodeCookie(channelCode);
}

function GoPdsUrl(channelCode) {
	if (typeof pvprofiler !== "undefined" && typeof pvprofiler.sendEvt !== "undefined")
		pvprofiler.sendEvt("click", channelCode, "button");
}
