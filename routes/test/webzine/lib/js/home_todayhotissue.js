/* Today Hotissue */
	WEBZINE = window.WEBZINE || {};
	WEBZINE.Home = window.WEBZINE.Home || {};
	WEBZINE.Home.TodayHotissue = window.WEBZINE.Home.TodayHotissue || {};
	WEBZINE.Home.TodayHotissue.hotissues = window.WEBZINE.Home.TodayHotissue.hotissues || new Array();
	WEBZINE.Home.TodayHotissue.currentKey = window.WEBZINE.Home.TodayHotissue.currentKey || null;
	WEBZINE.Home.TodayHotissue.size = window.WEBZINE.Home.TodayHotissue.size || null;
	
	WEBZINE.Home.TodayHotissue.switchKey = function(page) {
		
		var $todayHotIssue = $('#TodayHotissueI1');
		WEBZINE.Home.TodayHotissue.size = $todayHotIssue.find('a').size();
		
		var defaultSelect = 0;
		if (page == undefined) {
			page = 0;
		}
		WEBZINE.Home.TodayHotissue.currentKey = page;

		/* 페이지 할당 */
			var start = page;
			var end = page + 3;
		/* 숨기기 */
			$todayHotIssue.find('a').hide();
		/* 3개 보기 */
			for (var i = start; i < end; i++) {
				$todayHotIssue.find('a').eq(i).show();
			}
	}
	WEBZINE.Home.TodayHotissue.nextGroup = function() {
		var nextPage = parseInt(WEBZINE.Home.TodayHotissue.currentKey - 1 , 10);
		if (nextPage >= 0) {
			WEBZINE.Home.TodayHotissue.switchKey(nextPage);
		}
		else
		{
			WEBZINE.Home.TodayHotissue.switchKey();
		}
	}
	WEBZINE.Home.TodayHotissue.prevGroup = function() {
		var prevPage = parseInt(WEBZINE.Home.TodayHotissue.currentKey + 1, 10);
		var lastPage = parseInt(WEBZINE.Home.TodayHotissue.size - 3, 10);
		if (prevPage <= lastPage) {
			WEBZINE.Home.TodayHotissue.switchKey(prevPage);
		}
	}
