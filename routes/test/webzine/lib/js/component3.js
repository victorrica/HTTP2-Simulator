/* Initialise */
	var WEBZINE = window.WEBZINE || {};
	WEBZINE.Component = window.WEBZINE.Component || {};

/* Component : Main News */
	WEBZINE.Component.MainNews = WEBZINE.Component.MainNews || {};
	WEBZINE.Component.MainNews.switchTab = function(obj, tabName) {
		var wrapObj = INVEN.Html.getParentByClassName(obj, 'newsTabGroup');
		if (wrapObj) {
			INVEN.Html.removeClass(wrapObj, 'newsTab-Hotnews');
			INVEN.Html.removeClass(wrapObj, 'newsTab-Allnews');
			wrapObj.className += ' newsTab-' + tabName;
		}
		obj.blur();
	}

/* Component : User Opinion */
	WEBZINE.Component.UserOpinion = WEBZINE.Component.UserOpinion || {};
	WEBZINE.Component.UserOpinion.switchTab = function(obj, tabName) {
		var wrapObj = INVEN.Html.getParentByClassName(obj, 'gameTabGroup');
		if (wrapObj) {
			for (var i = 1; i <= 4; i++) {
				INVEN.Html.removeClass(wrapObj, 'gamesTab' + i);
			}
			wrapObj.className += ' gamesTab' + tabName;
		}
		obj.blur();
	}

/* Component : Wide Hotissue */
	WEBZINE.Component.WideHotissue = window.WEBZINE.Component.WideHotissue || {};
	WEBZINE.Component.WideHotissue.hotissues = window.WEBZINE.Component.WideHotissue.hotissues || new Array();
	WEBZINE.Component.WideHotissue.currentKey = window.WEBZINE.Component.WideHotissue.currentKey || null;
	WEBZINE.Component.WideHotissue.addHotissue = function(key, thumb, img, link) {
		var listWrapObj = getObj('webzine3Comp-WideHotissueI1');
		var data = new Array();
		data['key'] = key;
		data['thumb'] = thumb;
		data['img'] = img;
		data['link'] = link;
		data['thumbObj'] = document.createElement('a');
		data['imgObj'] = null;
		data['thumbObj'].className = 'selectorOne';
		data['thumbObj'].href = link;
		data['thumbObj'].onmouseover = WEBZINE.Component.WideHotissue.createThumbOverFn(data);
		data['thumbObj'].style.display = 'none';
			var spanObj = document.createElement('span');
			spanObj.className = 'selectorOver';
				var span2Obj = document.createElement('span');
				span2Obj.className = 'selectBorder';
					var imgObj = document.createElement('img');
					imgObj.src = thumb;
					imgObj.onclick = WEBZINE.Component.WideHotissue.createLinkFn(link);
					imgObj.style.cursor = 'pointer';
				span2Obj.appendChild(imgObj);
			spanObj.appendChild(span2Obj);
		data['thumbObj'].appendChild(spanObj);
		listWrapObj.appendChild(data['thumbObj']);
		WEBZINE.Component.WideHotissue.hotissues.push(data);
	}
	WEBZINE.Component.WideHotissue.createLinkFn = function(link) {
		var fn = function() {
			location.href = link;
		}
		return fn;
	}
	WEBZINE.Component.WideHotissue.reverseKey = function() {
		WEBZINE.Component.WideHotissue.hotissues = WEBZINE.Component.WideHotissue.hotissues.reverse();
	}
	WEBZINE.Component.WideHotissue.switchKey = function(page) {
		var defaultSelect = 0;
		if (page == undefined) {
			page = 1;
		}
		WEBZINE.Component.WideHotissue.currentKey = page;
		var listWrapObj = getObj('webzine3Comp-WideHotissueI1');
		var imgWrapObj = getObj('webzine3Comp-WideHotissueI3');
		/* 기본 셋팅 */
			for (var i in WEBZINE.Component.WideHotissue.hotissues) {
				var data = WEBZINE.Component.WideHotissue.hotissues[i];
				if (!data['imgObj']) {
					data['imgObj'] = document.createElement('a');
					data['imgObj'].href = data['link'];
					data['imgObj'].style.display = 'none';
					var imgObj = document.createElement('img');
					imgObj.src = data['img'];
					data['imgObj'].appendChild(imgObj);
					imgWrapObj.appendChild(data['imgObj']);
				} else {
					data['imgObj'].style.display = 'none';
				}
			}
		/* 페이지 할당 */
			var start = WEBZINE.Component.WideHotissue.hotissues.length - (page * 3);
			var end = WEBZINE.Component.WideHotissue.hotissues.length - ((page - 1) * 3);
			if (start <= 0) {
				end = start + 3;
				start = 0;
			}
			//alert(start + ' ' + end);
		/* 가장 마지막 키 */
			var lastKey = WEBZINE.Component.WideHotissue.hotissues[end-1]['key'];
			var defaultSelectData = new Array();
		/* 숨기기 */
			for (var i = 0; i < WEBZINE.Component.WideHotissue.hotissues.length; i++) {
				var data = WEBZINE.Component.WideHotissue.hotissues[i];
				data['thumbObj'].style.display = 'none';
			}
		/* 3개 보기 */
			for (var i = start; i < end; i++) {
				var data = WEBZINE.Component.WideHotissue.hotissues[i];
				data['thumbObj'].style.display = 'inline';
				if (data['key'] == lastKey || page != 1) {
					defaultSelectData.push(data);
				}
			}
		/* 기본 선택 */
			var defaultSelect = Math.floor(Math.random() * defaultSelectData.length)
			WEBZINE.Component.WideHotissue.thumbOver(defaultSelectData[defaultSelect]);
	}
	WEBZINE.Component.WideHotissue.createThumbOverFn = function(data) {
		var fn = function() {
			WEBZINE.Component.WideHotissue.thumbOver(data);
		}
		return fn;
	}
	WEBZINE.Component.WideHotissue.thumbOver = function(sdata) {
		var listWrapObj = getObj('webzine3Comp-WideHotissueI1');
		var chs = listWrapObj.getElementsByTagName('a');
		var n = chs.length;
		for (var i in WEBZINE.Component.WideHotissue.hotissues) {
			var data = WEBZINE.Component.WideHotissue.hotissues[i];
			if (data['imgObj']) { data['imgObj'].style.display = 'none'; }
			INVEN.Html.removeClass(data['thumbObj'], 'selectorOne-Selected');
		}
		sdata['thumbObj'].className += ' selectorOne-Selected';
		if (sdata['imgObj']) { sdata['imgObj'].style.display = 'inline'; }
	}
	WEBZINE.Component.WideHotissue.nextGroup = function() {
		var nextPage = parseInt(WEBZINE.Component.WideHotissue.currentKey - 1, 10);
		if (nextPage) {
			WEBZINE.Component.WideHotissue.switchKey(nextPage);
		}
	}
	WEBZINE.Component.WideHotissue.prevGroup = function() {
		var prevPage = parseInt(WEBZINE.Component.WideHotissue.currentKey + 1, 10);
		var lastPage = parseInt(WEBZINE.Component.WideHotissue.hotissues.length / 3 + 0.5, 10);
		if (prevPage <= lastPage) {
			WEBZINE.Component.WideHotissue.switchKey(prevPage);
		}
	}

/* Component : Calendar */
	WEBZINE.Component.Calendar = window.WEBZINE.Component.Calendar || {};
	WEBZINE.Component.Calendar.data = window.WEBZINE.Component.Calendar.data || new Array();
	WEBZINE.Component.Calendar.layerObj = window.WEBZINE.Component.Calendar.layerObj || null;
	WEBZINE.Component.Calendar.addData = function(date, text) {
		if (!WEBZINE.Component.Calendar.data[date]) { WEBZINE.Component.Calendar.data[date] = new Array(); }
		WEBZINE.Component.Calendar.data[date].push(text);
	}
	WEBZINE.Component.Calendar.show = function(date) {
		if (WEBZINE.Component.Calendar.data[date]) {
			WEBZINE.Component.Calendar.checkLayer();
			INVEN.Html.removeChildAll(WEBZINE.Component.Calendar.layerObj);
			WEBZINE.Component.Calendar.layerObj.innerHTML = WEBZINE.Component.Calendar.data[date].join('<br/>');
			INVEN.Layer.show(WEBZINE.Component.Calendar.layerObj, 'm+10', 'm+10');
		}
	}
	WEBZINE.Component.Calendar.checkLayer = function() {
		if (!WEBZINE.Component.Calendar.layerObj) {
			WEBZINE.Component.Calendar.layerObj = document.createElement('div');
			WEBZINE.Component.Calendar.layerObj.style.padding = '6px 8px 3px';
			WEBZINE.Component.Calendar.layerObj.style.border = 'solid 1px #96967e';
			WEBZINE.Component.Calendar.layerObj.style.background = '#fffced';
			WEBZINE.Component.Calendar.layerObj.style.color = '#292900';
			WEBZINE.Component.Calendar.layerObj.style.display = 'none';
			WEBZINE.Component.Calendar.layerObj.style.position = 'absolute';
			document.body.appendChild(WEBZINE.Component.Calendar.layerObj);
		}
	}
	WEBZINE.Component.Calendar.hide = function() {
		if (WEBZINE.Component.Calendar.layerObj) {
			INVEN.Layer.hide(WEBZINE.Component.Calendar.layerObj);
		}
	}

/* Component : Community News */
	WEBZINE.Component.Community = window.WEBZINE.Component.Community || {};
	WEBZINE.Component.Community.current = 0;
	WEBZINE.Component.Community.prev = function(obj) {
		if (obj.nodeName.toLowerCase() != 'a') {
			var targetObj = obj;
		} else {
			var targetObj = INVEN.Html.getParentByClassName(obj, 'community');
		}
		var prevObj = INVEN.Html.previousObj(targetObj, 'div');
		var topObj = INVEN.Html.getParentByClassName(targetObj, 'webzine3Comp-CommunityNews');
		var partObjs = INVEN.Html.getChildNodes(topObj, 'div', true);
		if (!prevObj) {
			prevObj = partObjs[partObjs.length - 1];
		}
		if (prevObj) {
			for (var i = 0; i < partObjs.length; i++) {
				partObjs[i].style.display = 'none';
			}
			prevObj.style.display = 'inline';
		} else {
			alert('더 이상 없습니다.');
		}
	}
	WEBZINE.Component.Community.next = function(obj) {
		if (obj.nodeName.toLowerCase() != 'a') {
			var targetObj = obj;
		} else {
			var targetObj = INVEN.Html.getParentByClassName(obj, 'community');
		}
		var nextObj = INVEN.Html.nextObj(targetObj, 'div');
		var topObj = INVEN.Html.getParentByClassName(targetObj, 'webzine3Comp-CommunityNews');
		var partObjs = INVEN.Html.getChildNodes(topObj, 'div', true);
		if (!nextObj) {
			nextObj = partObjs[0];
		}
		if (nextObj) {
			for (var i = 0; i < partObjs.length; i++) {
				partObjs[i].style.display = 'none';
			}
			nextObj.style.display = 'inline';
		} else {
			alert('더 이상 없습니다.');
		}
	}
	WEBZINE.Component.Community.autoChange = function() {
		var obj = getObj('webzine3CompCommunityNews');
		var partObjs = INVEN.Html.getChildNodes(obj, 'div', true);
		var targetObj = false;
		for (var i = 0; i < partObjs.length; i++) {
			var partObj = partObjs[i];
			if (partObj.style.display != 'none') {
				targetObj = partObj;
			}
		}
		var fn = function() {
			for (var i = 0; i < partObjs.length; i++) {
				var partObj = partObjs[i];
				if (partObj.style.display != 'none') {
					targetObj = partObj;
				}
			}
			WEBZINE.Component.Community.next(targetObj);
			WEBZINE.Component.Community.autoChange();
		}
		WEBZINE.Component.Community.current = setTimeout(fn, 3000);
		targetObj.onmouseover = function() {
			clearTimeout(WEBZINE.Component.Community.current);
		}
		targetObj.onmouseout = function() {
			WEBZINE.Component.Community.current = setTimeout(fn, 3000);
		}
	}
