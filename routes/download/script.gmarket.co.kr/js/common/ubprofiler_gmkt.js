// V3.0
/*
 * User Behavior Profiler
 */
if (typeof ubprofiler === 'undefined') {
	var ubprofiler = {
		__pdsUrl: ((location.protocol.toLowerCase() == 'https:')? 'https://pdsssl.gmarket.co.kr' : 'http://pds.gmarket.co.kr'),		// prod

		send: function (behavior, src, ids, query) {
			var self = ubprofiler;

			var idStr = (typeof ids === 'object' && typeof ids.join === 'function')? ids.join(',') : ids;
			var querystring = self._param(query);
			var url = self.__pdsUrl 
				+ '/ub/add/1/' + self._encodeUri(behavior) 
				+ '/' + self._encodeUri(src) 
				+ '/' + self._encodeUri(idStr) 
				+ (querystring? '?' + querystring : '');
			self._send(url);
		},
		sendDirect: function (path, query) {
			var self = ubprofiler;

			var querystring = self._param(query);
			var url = self.__pdsUrl + path + (querystring? (path.indexOf('?') === -1? '?' : '&') + querystring : '');
			self._send(url);
		},

		_send: function (url) {
			var imgTag = document.createElement('img');
			imgTag.src = url;
		},
		_param: function (obj) {
			var self = ubprofiler;

			var ret = '';
			var tList = [];
			if (typeof obj === 'object') {
				for (var e in obj) {
					tList.push(e + '=' + self._encodeUri(obj[e]));
				}
				ret = tList.join('&');
			}
			return ret;
		},
		_encodeUri: function (value) {
			// There are six possible values that typeof returns: "number," "string," "boolean," "object," "function," and "undefined."
			if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
				return encodeURIComponent(
					value.toString()
						.replace(/ /g, ';WS')
						.replace(/\+/g, ';PL')
						.replace(/\?/g, ';QU')
						.replace(/\//g, ';SL')
						.replace(/\#/g, ';SP')
						.replace(/\&/g, ';AD')
				);
			}
			return '';
		}
	};
}

/*
	Site Speed Profiler
 */
 if (typeof oSitespeed !== 'undefined' && typeof ubprofiler !== 'undefined' && typeof ssprofiler === 'undefined') {
	var ssprofiler = {
		// alias
		_windowAlias: window,
		_oSitespeedAlias: oSitespeed,
		_ubprofilerAlias: ubprofiler,

		sendClick: function (area_code) {
			var self = ssprofiler;
			var path = self._oSitespeedAlias.path.replace('/sitespeed/', '/click/');

			self._ubprofilerAlias.sendDirect(path, {
				'acode': area_code || '',
				'seq': self._oSitespeedAlias.seq || ''
			});
		},
		onLoad: function () {
			var ol = (new Date()).getTime();
			var self = ssprofiler;

			if (typeof self._oSitespeedAlias !== 'undefined' && typeof self._oSitespeedAlias.path === 'string') {
				if (self._oSitespeedAlias.load === true) {
					return;		// prevent multiple calling
				}
				self._oSitespeedAlias.load = true;

				self._oSitespeedAlias.ol = ol;
				setTimeout(self._send, 25);
			}
		},
		onBeforeunload: function () {
			var bul = (new Date()).getTime();
			var self = ssprofiler;
			
			if (typeof self._oSitespeedAlias !== 'undefined' && typeof self._oSitespeedAlias.path === 'string') {
				if (self._oSitespeedAlias.beforeunload === true) {
					return;		// prevent multiple calling
				}
				self._oSitespeedAlias.beforeunload = true;

				self._oSitespeedAlias.bul = bul;
			}
		},
		onUnload: function () {
		},
		bind: function (eventName, handler) {
			var self = ssprofiler;
			var eventOtherName = 'on' + eventName;
			if (typeof eventName !== 'string' || typeof handler !== 'function') {
				return;
			}
			if (self._windowAlias.addEventListener) {
				self._windowAlias.addEventListener(eventName, handler, false);
			}
			else if (self._windowAlias.attachEvent) {
				self._windowAlias.attachEvent(eventOtherName, handler);
			}
			else if (self._windowAlias[eventOtherName]) {
				// self._windowAlias.{eventOtherName} will be overwritten, so
				var oldEventHandler = self._windowAlias[eventOtherName];
				self._windowAlias[eventOtherName] = function () {
					handler();		// call handler first
					if (typeof oldEventHandler === 'function') {
						oldEventHandler();
					}
				};
			}
			else {
				self._windowAlias[eventOtherName] = handler;
			}
		},
		_send: function () {
			var self = ssprofiler;
			self._ubprofilerAlias.sendDirect(self._oSitespeedAlias.path, self._getLoggingInfo());
		},
		_getLoggingInfo: function () {
			var self = ssprofiler;
			return {
				'lt': (self._oSitespeedAlias.ol || self._oSitespeedAlias.bt || 0) - (self._oSitespeedAlias.bt || 0),
				'bult': (self._oSitespeedAlias.bul || self._oSitespeedAlias.bt || 0) - (self._oSitespeedAlias.bt || 0),
				'lang': self._windowAlias.navigator.language || self._windowAlias.navigator.userLanguage || self._windowAlias.navigator.browserLanguage,
				'ref': self._windowAlias.document.referrer,
				'nw': (self._windowAlias.history)? (self._windowAlias.history.length <= 1? 1 : 0) : '',
				'seq': self._oSitespeedAlias.seq || ''
			};
		}
	};
		
	ssprofiler.bind('load', ssprofiler.onLoad);
}



