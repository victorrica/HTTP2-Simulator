/* INITALIZE */
	var WEBZINE = window.WEBZINE || {};
	if (window.INVEN && window.INVEN.Ad) { INVEN.Ad.setSite('webzine'); }
	//WEBZINE.domain = 'http://www.inven.co.kr/webzine/';

/* GAME */
	WEBZINE.Game = window.WEBZINE.Game || {};
	WEBZINE.Game.listGame = function(condition) {
		var url = 'http://www.inven.co.kr/webzine/game/';
		var link = INVEN.QueryMaker.getLink(url, condition, 'clear');
		INVEN.Location.openWin(link);
	}
	WEBZINE.Game.searchGame = function(formControl) {
		var formValues = formControl.getValues();
		var url = 'http://www.inven.co.kr/webzine/game/';
		var link = INVEN.QueryMaker.getLink(url, formValues, 'clear');
		INVEN.Location.openWin(link);
	}
/* News */
	WEBZINE.News = window.WEBZINE.Game || {};
	WEBZINE.News.listNews = function(condition) {
		var url = 'http://www.inven.co.kr/webzine/news/';
		var link = INVEN.QueryMaker.getLink(url, condition, 'clear');
		INVEN.Location.openWin(link);
	}
	WEBZINE.News.searchNews = function(formControl) {
		var formValues = formControl.getValues();
		var formObj = formControl.getForm();
		if (formObj.condition) {
			var temp = splitAssoc(formObj.condition.value, ',', '->');
			if (temp['mainnews']) {
				formValues['mainnews'] = temp['mainnews'];
			}
			if (temp['sclass']) {
				formValues['sclass'] = temp['sclass'];
			}
		}
		var url = 'http://www.inven.co.kr/webzine/news/';
		var link = INVEN.QueryMaker.getLink(url, formValues, 'clear');
		INVEN.Location.openWin(link);
	}
/* Search */
	WEBZINE.Search = window.WEBZINE.Search || {};
	WEBZINE.Search.searchAll = function(formControl) {
		var formValues = formControl.getValues();
		var url = 'http://www.inven.co.kr/webzine/search/';
		var link = INVEN.QueryMaker.getLink(url, formValues, 'clear');
		INVEN.Location.openWin(link);
	}
	WEBZINE.Search.listSearch = function(condition, target) {
		if (!target) { target = ''; }
		var url = 'http://www.inven.co.kr/webzine/search/';
		var link = INVEN.QueryMaker.getLink(url, condition, 'clear');
		INVEN.Location.openWin(link, target, "scrollbars=yes");
	}

/* We Are Inven Team */
	WEBZINE.Inventeam = window.WEBZINE.Inventeam || {};
	WEBZINE.Inventeam.menuExpend = function(obj) {
		var liObj = INVEN.Html.getParentNode(obj, 'li');
		if (INVEN.Html.existClass(liObj, 'hasSubClose')) {
			INVEN.Html.replaceClass(liObj, 'hasSubClose', 'hasSubOpen');
		} else {
			INVEN.Html.replaceClass(liObj, 'hasSubOpen', 'hasSubClose');
		}
		obj.blur();
	}
/* CONTACT US */
	WEBZINE.Contact = window.WEBZINE.Contact || {};
	WEBZINE.Contact.expend = function(eObj) {
		var obj = getObj('webzineContact');
		eObj = getObj(eObj);
		var ulObj = INVEN.Html.getChildNodes(obj, 'ul')[0];
		var liObjs = INVEN.Html.getChildNodes(ulObj, 'li');
		if (ulObj.className == 'viewOne') {
			ulObj.className = 'viewAll';
			eObj.className = 'wContact120B';
			for (var i = 0; i < liObjs.length; i++) {
				var liObj = liObjs[i];
				liObj.style.display = 'inline';
			}
		} else {
			ulObj.className = 'viewOne';
			eObj.className = 'wContact120B2';
			for (var i = 0; i < liObjs.length; i++) {
				var liObj = liObjs[i];
				if (liObj.className != 'default') {
					liObj.style.display = 'none';
				}
			}
		}
		eObj.blur();
	}
/* GAME SCHEDULE */
	function webzineSideGameScheduleExpend(obj, aObj) {
		obj = getObj(obj);
		if (obj.className == 'scheduleList scheduleListShowAll') {
			obj.className = 'scheduleList';
		} else {
			obj.className = 'scheduleList scheduleListShowAll';
		}
		aObj.blur();
	}
/* LAYER */
	WEBZINE.GameLayer = INVEN.Db.Tooltip.create('webzineGameLayer', 'webzineGameLayers', 'webzine', 'game/game_layer.xml.php');
