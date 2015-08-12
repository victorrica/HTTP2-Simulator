// Float Control JS
// 플로팅으로 뜨는 레이어들을 관리함
// 필수 JS : common.js
var floatControl_floatObjs = new Array();
var floatControl_oState = new Array();
function floatGetAbsPos(obj) {
	var x = 0;
	var y = 0;
	while ((obj != document)) {
		var tn = obj.tagName.toUpperCase();
		if ((tn != "TR")) {
			x += obj.offsetLeft;
			y += obj.offsetTop;
		}
		obj = obj.parentNode;
	}
	var pos = Array();
	pos['x'] = x;
	pos['y'] = y;
	return pos;
}
function floatGetRelPos(obj) {
	var x = 0;
	var y = 0;
	var styleVal = '';
	while ((obj != document)) {
		if (obj.currentStyle) styleVal = obj.currentStyle.position;
		else if (window.getComputedStyle) styleVal = window.getComputedStyle(obj, "").getPropertyValue('position');
		if (styleVal == 'absolute') {
			x += obj.offsetLeft;
			y += obj.offsetTop;
		}
		obj = obj.parentNode;
	}
	var pos = Array();
	pos['x'] = x;
	pos['y'] = y;
	return pos;
}
function floatShow(foName) {
	if (!window.ActiveXObject) return;
	var chs = document.getElementsByTagName("SELECT");
	var n = chs.length;
	var floatObj = document.getElementById(foName);
	if (!floatObj) return;
	var floatPos = floatGetRelPos(floatObj);
//	floatPos['x'] += floatObj.offsetLeft;
//	floatPos['y'] += floatObj.offsetTop;
	floatPos['ex'] = floatPos['x'] + floatObj.offsetWidth;
	floatPos['ey'] = floatPos['y'] + floatObj.offsetHeight;
//	alert(floatPos['x'] + ":" + floatPos['y'] + ":" + floatPos['ex'] + ":" + floatPos['ey']);

	for (var i = 0; i < n; i++) {
		var cItem = chs[i];
		if (!cItem.id) continue;
		cItemPos = floatGetAbsPos(cItem);
//		cItemPos['x'] += cItem.offsetLeft;
//		cItemPos['y'] += cItem.offsetTop;
		cItemPos['ex'] = cItemPos['x'] + cItem.offsetWidth;
		cItemPos['ey'] = cItemPos['y'] + cItem.offsetHeight;
//		alert(cItem.id + "-" + cItemPos['x'] + ":" + cItemPos['y'] + ":" + cItemPos['ex'] + ":" + cItemPos['ey']);
		// 겹치는지 채크
		if (((cItemPos['x'] >= floatPos['x']) && (cItemPos['y'] >= floatPos['y']) && (cItemPos['x'] <= floatPos['ex']) && (cItemPos['y'] <= floatPos['ey'])) /* 시작지점 검사 */
			|| ((cItemPos['ex'] >= floatPos['x']) && (cItemPos['ey'] >= floatPos['y']) && (cItemPos['ex'] <= floatPos['ex']) && (cItemPos['ey'] <= floatPos['ey']))) /* 끝지점 검사 */ {
			if (cItem.style.visibility != 'hidden') {
				floatControl_oState[cItem.id] = cItem.style.visibility;
				cItem.style.visibility = 'hidden';
			}
		}
	}
	floatControl_floatObjs[foName] = 1;

	//floatObj.style.display = 'inline';
}
function floatHide(foName) {
	if (!window.ActiveXObject) return;
	floatControl_floatObjs[foName] = 0;
	var key;
	// 다 보여주기
	for (key in floatControl_oState) {
		document.getElementById(key).style.visibility = floatControl_oState[key];
	}

	// 다른 플로팅 재계산
	for (key in floatControl_floatObjs) {
		if (floatControl_floatObjs[key] > 0) floatShow(key);
	}
	
	var floatObj = document.getElementById(foName);
	if (!floatObj) return;
	//floatObj.style.display = 'none';
}
