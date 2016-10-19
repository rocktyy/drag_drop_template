/**
 * Created by wangzhenpeng on 2016/3/27.
 */

// http://efe.baidu.com/blog/position-sticky/

// 检测iOS版本大于等于6
function gtIOS6 () {
    var userAgent = window.navigator.userAgent
    var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/)
    return ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) >= 6)
}

// 判断是否支持sticky属性
function isSupportSticky () {
    var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-']
    var stickyText = ''
    for (var i = 0; i < prefixTestList.length; i++) {
        stickyText += 'position:' + prefixTestList[i] + 'sticky'
    }
    // 创建一个dom来检查
    var div = document.createElement('div')
    var body = document.body
    div.style.cssText = 'display:none' + stickyText
    body.appendChild(div)
    var isSupport = /sticky/i.test(window.getComputedStyle(div).position)
    body.removeChild(div)
    div = null
    return isSupport
}

      function getElementTop(element){
          var actualTop = element.offsetTop;
          var current = element.offsetParent;
          while (current !== null){
              actualTop += current.offsetTop;
              current = current.offsetParent;
          }
          return actualTop;
      }

 function sticky (nav) {
    if (gtIOS6() || isSupportSticky()) {
        // 大于等于iOS6版本使用sticky
        nav.classList.add('vux-sticky')
    } else {
        var navOffsetY = getElementTop(nav);
        window.addEventListener('scroll', function () {
            window.scrollY>= navOffsetY ? nav.classList.add('vux-fixed') : nav.classList.remove('vux-fixed')
        })
    }
}

