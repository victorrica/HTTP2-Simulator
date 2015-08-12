/* Wide Hotissue */
	WEBZINE = window.WEBZINE || {};
	WEBZINE.Home = window.WEBZINE.Home || {};
	WEBZINE.Home.WideHotissue = window.WEBZINE.Home.WideHotissue || {};
	WEBZINE.Home.WideHotissue.hotissues = window.WEBZINE.Home.WideHotissue.hotissues || new Array();
	WEBZINE.Home.WideHotissue.currentKey = window.WEBZINE.Home.WideHotissue.currentKey || null;
	WEBZINE.Home.WideHotissue.addHotissue = function(key, thumb, img, link) {
		var listWrapObj = getObj('wideHotissueI1');
		var data = new Array();
		data['key'] = key;
		data['thumb'] = thumb;
		data['img'] = img;
		data['link'] = link;
		data['thumbObj'] = document.createElement('a');
		data['imgObj'] = null;
		data['thumbObj'].className = 'selectorOne';
		data['thumbObj'].href = link;
		data['thumbObj'].onmouseover = WEBZINE.Home.WideHotissue.createThumbOverFn(data);
		data['thumbObj'].style.display = 'none';
			var spanObj = document.createElement('span');
			spanObj.className = 'selectorOver';
				var span2Obj = document.createElement('span');
				span2Obj.className = 'selectBorder';
					var imgObj = document.createElement('img');
					imgObj.src = thumb;
					imgObj.onclick = WEBZINE.Home.WideHotissue.createLinkFn(link);
					imgObj.style.cursor = 'pointer';
				span2Obj.appendChild(imgObj);
			spanObj.appendChild(span2Obj);
		data['thumbObj'].appendChild(spanObj);
		listWrapObj.appendChild(data['thumbObj']);
		WEBZINE.Home.WideHotissue.hotissues.push(data);
	}
	WEBZINE.Home.WideHotissue.createLinkFn = function(link) {
		var fn = function() {
			location.href = link;
		}
		return fn;
	}
	WEBZINE.Home.WideHotissue.reverseKey = function() {
		WEBZINE.Home.WideHotissue.hotissues = WEBZINE.Home.WideHotissue.hotissues.reverse();
	}
	WEBZINE.Home.WideHotissue.switchKey = function(page) {
		var defaultSelect = 0;
		if (page == undefined) {
			page = 1;
		}
		WEBZINE.Home.WideHotissue.currentKey = page;
		var listWrapObj = getObj('wideHotissueI1');
		var imgWrapObj = getObj('wideHotissueI3');
		/* 기본 셋팅 */
			for (var i in WEBZINE.Home.WideHotissue.hotissues) {
				var data = WEBZINE.Home.WideHotissue.hotissues[i];
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
			var start = WEBZINE.Home.WideHotissue.hotissues.length - (page * 3);
			var end = WEBZINE.Home.WideHotissue.hotissues.length - ((page - 1) * 3);
			if (start <= 0) {
				end = start + 3;
				start = 0;
			}
			//alert(start + ' ' + end);
		/* 가장 마지막 키 */
			var lastKey = WEBZINE.Home.WideHotissue.hotissues[end-1]['key'];
			var defaultSelectData = new Array();
		/* 숨기기 */
			for (var i = 0; i < WEBZINE.Home.WideHotissue.hotissues.length; i++) {
				var data = WEBZINE.Home.WideHotissue.hotissues[i];
				data['thumbObj'].style.display = 'none';
			}
		/* 3개 보기 */
			for (var i = start; i < end; i++) {
				var data = WEBZINE.Home.WideHotissue.hotissues[i];
				data['thumbObj'].style.display = 'inline';
				if (data['key'] == lastKey || page != 1) {
					defaultSelectData.push(data);
				}
			}
		/* 기본 선택 */
			var defaultSelect = Math.floor(Math.random() * defaultSelectData.length)
			WEBZINE.Home.WideHotissue.thumbOver(defaultSelectData[defaultSelect]);
	}
	WEBZINE.Home.WideHotissue.createThumbOverFn = function(data) {
		var fn = function() {
			WEBZINE.Home.WideHotissue.thumbOver(data);
		}
		return fn;
	}
	WEBZINE.Home.WideHotissue.thumbOver = function(sdata, intype) {
		var listWrapObj = getObj('wideHotissueI1');
		var chs = listWrapObj.getElementsByTagName('a');
		var n = chs.length;
		for (var i in WEBZINE.Home.WideHotissue.hotissues) {
			var data = WEBZINE.Home.WideHotissue.hotissues[i];
			if (data['imgObj']) { data['imgObj'].style.display = 'none'; }
			INVEN.Html.removeClass(data['thumbObj'], 'selectorOne-Selected');
		}
		sdata['thumbObj'].className += ' selectorOne-Selected';
		if (sdata['imgObj']) { $(sdata['imgObj']).fadeTo(400,1.0); }
	}
	WEBZINE.Home.WideHotissue.nextGroup = function() {
		var nextPage = parseInt(WEBZINE.Home.WideHotissue.currentKey - 1, 10);
		if (nextPage) {
			WEBZINE.Home.WideHotissue.switchKey(nextPage);
		}
	}
	WEBZINE.Home.WideHotissue.prevGroup = function() {
		var prevPage = parseInt(WEBZINE.Home.WideHotissue.currentKey + 1, 10);
		var lastPage = parseInt(WEBZINE.Home.WideHotissue.hotissues.length / 3 + 0.5, 10);
		if (prevPage <= lastPage) {
			WEBZINE.Home.WideHotissue.switchKey(prevPage);
		}
	}

	/* SlideHotissue */
	WEBZINE.Home.SlideHotissue = window.WEBZINE.Home.SlideHotissue || {};
	WEBZINE.Home.SlideHotissue.readyHotissue = function() {
		var totalCount = $(".centerPart ul li").length;
		var widthLimit = ((totalCount - 6) * 106) * -1;
		var listWidth  = totalCount * 106;
		var moveSpeed  = 400;
		var tmpCheck   = true;
		$(".centerPart ul").css('width', listWidth);
		if(totalCount>=7) {
			$(".leftArrowPart a").click(function() { if(tmpCheck)  { onMoveHotissue('left');  } });
			$(".rightArrowPart a").click(function() { if(tmpCheck) { onMoveHotissue('right'); } });
		} else {
			$(".rightArrowPart a").addClass('lock');
		}
		function onMoveHotissue(type) {
			tmpCheck = false;
			var tempNum = parseInt($(".centerPart ul").css("margin-left"));
			if(type=='left') {
				if((tempNum+636) >= 0) {
					$(".centerPart ul").animate({'margin-left': '0px'}, moveSpeed, moveLock);
					if(totalCount >= 7) { $(".rightArrowPart a").removeClass('lock'); }
				} else {
					$(".centerPart ul").animate({'margin-left': '+=636px'}, moveSpeed, moveLock);
					$(".rightArrowPart a").removeClass('lock');
				}
			} else if(type=='right'){
				if((tempNum+(-636)) <= widthLimit) {
					$(".centerPart ul").animate({"margin-left" : widthLimit}, moveSpeed, moveLock);
					if(totalCount >= 7) { $(".leftArrowPart a").removeClass('lock'); }
				} else {
					$(".centerPart ul").animate({"margin-left" : "-=636px"}, moveSpeed, moveLock);
					$(".leftArrowPart a").removeClass('lock');
				}
			}
		}
		function moveLock() {
			var tempNum = parseInt($(".centerPart ul").css("margin-left"));
			if(tempNum == 0) {$(".leftArrowPart a").addClass('lock');}
			if(tempNum == widthLimit) {$(".rightArrowPart a").addClass('lock');}
			tmpCheck = true;
		}
	}

	WEBZINE.Home.SlideHotissue.mainImageCt = function(tgNum) {
		$(".hotissueImage li img").css('display', 'none');
		$(".hotissueImage li:eq("+tgNum+") img").fadeTo(300,1.0); 
		$(".centerPart ul li a").removeClass('selected');
		$(".centerPart ul li:eq("+tgNum+") a").addClass('selected');
	}
	//임시1
	WEBZINE.Home.SlideHotissue.mainImageCt2 = function(tgNum, mainImage, tmpSrc) {
		var tmpHtml = '';
		tmpHtml += '<a href="'+tmpSrc+'" onfocus="blur();"><img src="'+mainImage+'" /></a>';
		$(".hotissueImage").html(tmpHtml);
		$(".centerPart ul li a").removeClass('selected');
		$(".centerPart ul li:eq("+tgNum+") a").addClass('selected');
		
	}
	//임시2
	WEBZINE.Home.SlideHotissue.mainImageCt3 = function(tgNum) {
		$(".hotissueImage li img").css('display', 'none');
		$(".hotissueImage li:eq("+tgNum+") img").css('display', 'block');
		$(".centerPart ul li a").removeClass('selected');
		$(".centerPart ul li:eq("+tgNum+") a").addClass('selected');
	}
