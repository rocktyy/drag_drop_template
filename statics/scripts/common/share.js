function getPlatform() {
	var userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)){
        return userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)[1];
    }
    return '';
}
function getWxPlatform() {
    //判断是否在微信中
    var userAgent = navigator.userAgent.toLowerCase();
    return userAgent.match(/MicroMessenger/i);
}
function getVersion(){
	    var Request = GB.utils.GetRequest();
	 	var version,verson_new,weight;
        if(Request['version']){
	         version = Request['version'];
	         verson_new  = version.split('.');
	 	     weight = verson_new[0]*1000 + verson_new[1]*100 + verson_new[2]*10;
        }
	 	return weight;
}
var params = new Object();
params['methodName'] = 'getShareParams';
params['type'] = 1;
params['code'] = '';
params['needLogin'] = '0';
params['platform'] = '0';
params['pushShareMark'] = '';
function getShareInfo(basePath,telephone,code) {
    $.getJSON(basePath + 'info/getShareInfoJsonp?jsoncallback=?', {
        telephone: telephone,
        code: code,
        pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
    }, function (_data) {
    	var lineLink = location.href;
        if (_data.wxurl) {
            lineLink = _data.wxurl;
        }
        if (getWxPlatform() == "micromessenger") {
            //微信页面
            wx.config({
                debug: _data.isDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: _data.appid, // 必填，公众号的唯一标识
                timestamp: _data.timestamp, // 必填，生成签名的时间戳
                nonceStr: _data.noncestr, // 必填，生成签名的随机串
                signature: _data.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.onMenuShareTimeline({
                    title: _data.title, // 分享标题
                    desc: _data.description, // 分享描述(不确定)
                    link: lineLink, // 分享链接
                    imgUrl: _data.imageUrl, // 分享图标
                    success: function (res) {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: _data.title, // 分享标题
                    desc: _data.description, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: _data.imageUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });

        } else if ($.inArray(getPlatform().toString(), ["android", "iphone","ipad","ipod"]) >= 0) {
            //页面在app中
            params['title'] = _data.title;
            params['imageUrl'] = _data.imageUrl;
            params['description'] = _data.description;
            params['url'] = lineLink;
        }

    })
}
//ios调用的方法
function isCanShare() {
		var param_share = {"isCanShare" : "1"};
	    GB.utils.callCustomMethod("isCanShare",param_share);	
}
function getShareParams(){
		GB.utils.callCustomMethod("getShareParams",params); 	
}
//android调用方法
function initJsBridge(callback) {
       if (window.android_new) {
           callback(android_new)
       }else {
            document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                   callback(android_new)
            },
                false
            );
        }
}

	initJsBridge(function(android_new) {
    android_new.init();
        //分享
    android_new.registerHandler("isCanShare", function(data, responseCallback) {
         responseCallback(true);
    });  //获取分享参数
    android_new.registerHandler("getShareParams", function(data, responseCallback) {
         responseCallback(params);
    });
  });

var wxShare = {
		  init:function(){
			    var tmpTag = 'https:' == document.location.protocol ? "https:" : "http:";
			    (function() {
			        var hm = document.createElement("script");
			        hm.src = tmpTag+ "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
			        var s = document.getElementsByTagName("script")[0];
			        s.parentNode.insertBefore(hm, s);
			    })();
			},
			getWxPlatform:function(){
				   //判断是否在微信中
			    var userAgent = navigator.userAgent.toLowerCase();
			    return userAgent.match(/MicroMessenger/i);
			},
			getShareInfo:function(userCode,code){
				$.getJSON(shareBasePath+"info/getShareInfoForSecond", {
					userCode: userCode,
			        code: code,
			        pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
			    }, function (_data) {
			    	var lineLink = location.href;
			        if (_data.wxurl) {
			            lineLink = _data.wxurl;
			        }
			        if (wxShare.getWxPlatform() == "micromessenger") {
			            //微信页面
			            wx.config({
			                debug: _data.isDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			                appId: _data.appid, // 必填，公众号的唯一标识
			                timestamp: _data.timestamp, // 必填，生成签名的时间戳
			                nonceStr: _data.noncestr, // 必填，生成签名的随机串
			                signature: _data.signature,// 必填，签名，见附录1
			                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			            });
			            wx.ready(function(){
			                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			                wx.onMenuShareTimeline({
			                    title: _data.title, // 分享标题
			                    desc: _data.description, // 分享描述(不确定)
			                    link: lineLink, // 分享链接
			                    imgUrl: _data.imageUrl, // 分享图标
			                    success: function (res) {
			                        // 用户确认分享后执行的回调函数
			                    },
			                    cancel: function () {
			                        // 用户取消分享后执行的回调函数
			                    }
			                });
			                wx.onMenuShareAppMessage({
			                    title: _data.title, // 分享标题
			                    desc: _data.description, // 分享描述
			                    link: lineLink, // 分享链接
			                    imgUrl: _data.imageUrl, // 分享图标
			                    type: 'link', // 分享类型,music、video或link，不填默认为link
			                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			                    success: function () {
			                        // 用户确认分享后执行的回调函数
			                    },
			                    cancel: function () {
			                        // 用户取消分享后执行的回调函数
			                    }
			                });
			            });

			        }

			    })
			}
}
wxShare.init()
