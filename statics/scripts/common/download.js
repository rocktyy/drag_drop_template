// 判断浏览器
	var browser = {
		versions: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {// 移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, // IE内核
				presto: u.indexOf('Presto') > -1, // opera内核
				webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, // 是否iPad
				webApp: u.indexOf('Safari') == -1
				// 是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	// 打开或下载app
	function openApp() {
		var _time = new Date();
		var _appSrc = '';
		var _downSrc = ''
		var protocol = 'https:' == document.location.protocol ? "https:" : "http:";
		if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		 // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
		 // 否则打开a标签的href链接
			_appSrc = 'gbanker://'
			_downSrc = protocol+"//m.g-banker.com/redirectAppUrl?platform=IOS&ch=gbanker_hongbao";
		} else {
			_appSrc='gbanker-app://main';
			_downSrc = protocol+"//m.g-banker.com/redirectAppUrl?platform=ANDROID&ch=gbanker_hongbao";
		}
		$('body').append("<iframe id='ifr' style='display:none'></iframe>");
		$('#ifr').attr("src", _appSrc);// app跳转地址 
        var _interval = setTimeout(function() {
            if (!_time || new Date()-_time < 600) {
                location.href = _downSrc;// 应用下载页
            }
        }, 500);
        return false;
	}