/* Initalize */
	var WEBZINE = window.WEBZINE || {};
	WEBZINE.Opinion = window.WEBZINE.Opinion || {};

/* GAME LIST */
	WEBZINE.GameList = window.WEBZINE.GameList || {};
	WEBZINE.GameList.changeOrder = function(order) {
		var url = '';
		var condition = 'of->' + order;
		var link = INVEN.QueryMaker.getLink(url, condition, '');
		INVEN.Location.openWin(link);
	}
	WEBZINE.GameList.page = function(pg) {
		var url = '';
		var condition = 'page->' + pg;
		var link = INVEN.QueryMaker.getLink(url, condition, 'remove->page');
		INVEN.Location.openWin(link);
	}

/* Opinion Action */
	WEBZINE.Opinion.deleteOpinion = function(idx) {
		var fn = function() {
			if (!confirm('정말로 삭제하시겠습니까?')) { return; }
			var url = '';
			var rurl = location.href.toString();
			var condition = new Array();
			if (idx > 0) {
				condition['mode'] = 'opiniondelete';
				condition['opinion'] = idx;
				condition['rurl'] = rurl;
			}
			var link = INVEN.QueryMaker.getLink(url, condition, '');
			INVEN.Location.openWin(link, '', "scrollbars=yes");
		}
		setTimeout(fn, 0);
	}

/* Opinion Write Form */
	/* Initialize */
		WEBZINE.Opinion.WriteForm = window.WEBZINE.Opinion.WriteForm || {};
	/* My Recent */
		WEBZINE.Opinion.WriteForm.MyRecent = window.WEBZINE.Opinion.WriteForm.MyRecent || {};
		WEBZINE.Opinion.WriteForm.MyRecent.create = function() {
			var temp = new WEBZINE.Opinion.WriteForm.MyRecent.object();
			return temp;
		}
		WEBZINE.Opinion.WriteForm.MyRecent.object = function() {
			var clickObj = null;
			var detailObj = null;

			this.setClickObj = function(obj) { clickObj = getObj(obj); }
			this.setDetailObj = function(obj) { detailObj = getObj(obj); }
			this.toggle = function() {
				var styleVal = '';
				INVEN.Html.removeChildAll(clickObj);
				if (detailObj.currentStyle) styleVal = detailObj.currentStyle.display;
				else if (window.getComputedStyle) styleVal = window.getComputedStyle(detailObj, "").getPropertyValue('display');
				var state = styleVal == 'none';
				if (state) {
					detailObj.style.display = 'inline';
					clickObj.appendChild(document.createTextNode('[내용 감추기]'));
				} else {
					detailObj.style.display = 'none';
					clickObj.appendChild(document.createTextNode('[내용 보기]'));
				}
			}
		}
		WEBZINE.Opinion.WriteForm.MyRecent.activate = function(obj, detailObj) {
			var handler = WEBZINE.Opinion.WriteForm.MyRecent.create();
			handler.setClickObj(obj);
			handler.setDetailObj(detailObj);
			obj.href = 'javascript:nothing();';
			obj.onclick = handler.toggle;
			handler.toggle();
		}
	/* Select Rating */
		WEBZINE.Opinion.WriteForm.selectRating = function(obj, value) {
			var formObj = INVEN.Html.getParentByTagName(obj, 'form');
			formObj.rating.value = value;
			for (var i = 1; i <= 10; i++) {
				INVEN.Html.removeClass(formObj, 'currentRating' + i);
			}
			INVEN.Html.removeClass(formObj, 'currentRating');
			formObj.className += 'currentRating' + value;
		}
	/* Submit Form */
		WEBZINE.Opinion.WriteForm.submitForm = function(formControl) {
			var checkFields = 'comment';
			if (!formControl.checkForm(checkFields)) { return; }
			var formObj = formControl.getForm();
			formObj.submit();
		}

/* Opinion List */
	WEBZINE.Opinion.OpinionList = window.WEBZINE.Opinion.OpinionList || {};
	WEBZINE.Opinion.OpinionList.create = function() {
		var temp = new WEBZINE.Opinion.OpinionList.object();
		return temp;
	}
	WEBZINE.Opinion.OpinionList.object = function() {
		var xmlObj = INVEN.Xml.create("GET", "./opinion_list.xml.php", true);
		xmlObj.print = printResult;
		var gameidx = 0;
		var listObj = null;
		var pagingObj = null;
		var page = 0;
		var deleteFn = null;
		var searchOptions = new Array();
		var pageAnchorLink = '';

		this.setGameidx = function(idx) { gameidx = idx; }
		this.setListObj = function(obj) { listObj = getObj(obj); }
		this.setPagingObj = function(obj) { pagingObj = getObj(obj); }
		this.setDeleteFunction = function(fn) { deleteFn = fn; }
		this.clearSearchOptions = function() { searchOptions = new Array(); }
		this.setSearchOption = function(key, value) { searchOptions[key] = value; }
		this.setPageAnchorLink = function(value) { pageAnchorLink = value; }

		this.requestList = requestList;
		function requestList() {
			var data = new Array();
			data['game'] = gameidx;
			data['page'] = page;
			if (searchOptions['age']) { data['age'] = searchOptions['age']; }
			if (searchOptions['gender']) { data['age'] = searchOptions['gender']; }
			if (searchOptions['rating']) { data['age'] = searchOptions['rating']; }
			if (searchOptions['nick']) { data['age'] = searchOptions['nick']; }
			xmlObj.request(data);
		}
		function printResult(xmlObj) {
			INVEN.Html.removeChildAll(listObj);

			var result = xmlObj.responseXML.getElementsByTagName("resultdata")[0];
			var opinionlist = result.getElementsByTagName("opinionlist")[0];
			var itemlist = opinionlist.getElementsByTagName("opinion");
			var n = itemlist.length;

			for (var i = 0; i < n; i++) {
				var item = itemlist[i];
				var data = new Array();
				data['idx'] = INVEN.Xml.getTextValue(item.getElementsByTagName('idx')[0]);
				data['memnick'] = INVEN.Xml.getTextValue(item.getElementsByTagName('memnick')[0]);
				data['rating'] = INVEN.Xml.getTextValue(item.getElementsByTagName('rating')[0]);
				data['ratingstate'] = INVEN.Xml.getTextValue(item.getElementsByTagName('ratingstate')[0]);
				data['content'] = INVEN.Xml.getTextValue(item.getElementsByTagName('content')[0]);
				data['postdate'] = INVEN.Xml.getTextValue(item.getElementsByTagName('postdate')[0]);
				data['delete'] = INVEN.Xml.getTextValue(item.getElementsByTagName('delete')[0]);
				parseData(data);
				printData(data);
			}
			if (n == 0) {
				printNoResult();
			}
			var pagingdata = result.getElementsByTagName("paging")[0];
			printPaging(pagingdata);
		}
		function parseData(data) {
		}
		function printData(data) {
			var trObj = document.createElement('tr');
				var thObj = document.createElement('th');
					var divObj = document.createElement('div');
					divObj.className = 'nick';
					divObj.appendChild(document.createTextNode(data['memnick']));
					thObj.appendChild(divObj);

					if (toInteger(data['rating']) > 0) {
						var divObj = document.createElement('div');
						divObj.className = 'rating';
						if (data['ratingstate'] == '1') {
							divObj.appendChild(document.createTextNode(' ' + data['rating'] + ' '));
						} else {
							var delObj = document.createElement('del');
								var spanObj = document.createElement('span');
								spanObj.appendChild(document.createTextNode(' ' + data['rating'] + ' '));
								delObj.appendChild(spanObj);
							divObj.appendChild(delObj);
						}
						thObj.appendChild(divObj);
					}
				trObj.appendChild(thObj);
				var tdObj = document.createElement('td');
				tdObj.className = 'left content';
				var content = data['content'];
				/*
				var temp = content.split("\n");
				var tempcount = temp.length;
				for (var i = 0; i < tempcount; i++) {
					if (i > 0) { tdObj.appendChild(document.createElement('br')); }
					tdObj.appendChild(document.createTextNode(temp[i]));
				}
				*/
				content = content.replace(/\</g,'&lt;');
				content = content.replace(/\>/g,'&gt;');
				content = content.replace(/\n/g, '<br/>');
				tdObj.innerHTML = content;
				trObj.appendChild(tdObj);
				var tdObj = document.createElement('td');
				tdObj.className = 'date';
				var temp = data['postdate'].substring(0,10);
				tdObj.appendChild(document.createTextNode(temp));

				if (data['delete'] == 'Y') {
					tdObj.appendChild(document.createElement('br'));
					var aObj = document.createElement('a');
					aObj.href = 'javascript:nothing();';
					aObj.onclick = createDeleteFn(data['idx']);
					aObj.appendChild(document.createTextNode('[삭제]'));
					tdObj.appendChild(aObj);
				}
				trObj.appendChild(tdObj);
			listObj.appendChild(trObj);
		}
		function createDeleteFn(n) {
			var fn = function() {
				deleteFn(n);
			}
			return fn;
		}
		function printNoResult() {
			var text = '등록된 평가가 없습니다.';
			printMessage(text);
		}
		function printMessage(message) {
			var trObj = document.createElement('tr');
				trObj.className = 'message';
				var tdObj = document.createElement('td');
				tdObj.colSpan = 3;
				tdObj.appendChild(document.createTextNode(message));
			trObj.appendChild(tdObj);
			listObj.appendChild(trObj);
		}
		function printPaging(pagingitem) {
			var paging_pg = toInteger(pagingitem.getAttribute("pg"));
			var paging_scale = toInteger(pagingitem.getAttribute("scale"));
			var paging_pscale = toInteger(pagingitem.getAttribute("pscale"));
			var paging_lastidx = toInteger(pagingitem.getAttribute("lastidx"));
			var paging_lastpg = toInteger(pagingitem.getAttribute("lastpg"));
			var paging_firstpgnav = toInteger(pagingitem.getAttribute("firstpgnav"));
			var paging_lastpgnav = toInteger(pagingitem.getAttribute("lastpgnav"));
			var paging_startidx = toInteger(pagingitem.getAttribute("startidx"));
			var linkHref = pageAnchorLink ? ('#' + pageAnchorLink) : 'javascript:nothing();';

			INVEN.Html.removeChildAll(pagingObj);

			var baseObj = document.createElement('span');
			baseObj.className = 'basetext';
			var prevObj = document.createElement('span');
				prevObj.className = 'prevtext';
				if (paging_pg <= 0) {
					prevObj.appendChild(document.createTextNode('이전'));
				} else {
					var aObj = document.createElement('a');
					aObj.appendChild(document.createTextNode('이전'));
					aObj.href = linkHref;
					aObj.className = 'prevtext';
					var fn = movePageFn(paging_pg);
					aObj.onclick = fn;
					prevObj.appendChild(aObj);
				}
			baseObj.appendChild(prevObj);
			baseObj.appendChild(document.createTextNode(' '));
			if (paging_firstpgnav > 0) {
				baseObj.appendChild(document.createTextNode(' '));
				var aObj = document.createElement('a');
				aObj.className = 'pg';
				aObj.appendChild(document.createTextNode('1'));
				aObj.href = linkHref;
				var fn = movePageFn(1);
				aObj.onclick = fn;
				baseObj.appendChild(aObj);
				baseObj.appendChild(document.createTextNode(' | .. | '));
			}
			for (var i = paging_firstpgnav; i <= paging_lastpgnav; i++) {
				if (paging_pg == i) {
					var spanObj = document.createElement('span');
					spanObj.className = 'currentpg';
					spanObj.appendChild(document.createTextNode(i + 1));
					baseObj.appendChild(spanObj);
				} else {
					var aObj = document.createElement('a');
					aObj.className = 'pg';
					aObj.appendChild(document.createTextNode(i + 1));
					aObj.href = linkHref;
					var fn = movePageFn(i + 1);
					aObj.onclick = fn;
					baseObj.appendChild(aObj);
				}
				if (i != paging_lastpgnav) {
					baseObj.appendChild(document.createTextNode(' | '));
				}
			}
			if (paging_lastpgnav < paging_lastpg) {
				baseObj.appendChild(document.createTextNode(' | ... | '));
				var aObj = document.createElement('a');
				aObj.className = 'pg';
				aObj.appendChild(document.createTextNode(paging_lastpg + 1));
				aObj.href = linkHref;
				var fn = movePageFn(paging_lastpg + 1);
				aObj.onclick = fn;
				baseObj.appendChild(aObj);
			}
			if (paging_firstpgnav > paging_lastpgnav) {
				baseObj.appendChild(document.createTextNode(' '));
				var spanObj = document.createElement('span');
				spanObj.className = 'currentpg';
				spanObj.appendChild(document.createTextNode(paging_firstpgnav + 1));
				baseObj.appendChild(spanObj);
			}
			baseObj.appendChild(document.createTextNode(' '));
			var spanObj = document.createElement('span');
			spanObj.className = 'nexttext';
			if (paging_pg >= paging_lastpg) {
				spanObj.appendChild(document.createTextNode('다음'));
				//spanObj.appendChild(spanObj);
			} else {
				var aObj = document.createElement('a');
				aObj.className = 'nexttext';
				aObj.appendChild(document.createTextNode('다음'));
				aObj.href = linkHref;
				var fn = movePageFn(paging_pg + 2);
				aObj.onclick = fn;
				spanObj.appendChild(aObj);
			}
			baseObj.appendChild(spanObj);
			pagingObj.appendChild(baseObj);
		}

		function movePageFn(n) {
			var fn = function() {
				page = n;
				requestList();
			}
			return fn;
		}
	}
