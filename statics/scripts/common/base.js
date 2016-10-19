/**
 * Created by wangzhenpeng on 2016/3/17.
 */
/**
 *  设置全局变量
 *  正式与测试的不同
 *  根据protocol来设定是https还是http
 **/

/***设置公共方法***/
Date.prototype.format = function(format) {
    var o = { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(), //day 
    "h+" : this.getHours(), //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
    "S" : this.getMilliseconds() //millisecond 
   } 

   if(/(y+)/.test(format)) { 
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   } 

   for(var k in o) { 
    if(new RegExp("("+ k +")").test(format)) { 
        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
    } 
   } 
   return format;
}
/***
 * js 浮点数计算 精度问题解决
 * ***/
    //加法
Number.prototype.add = function(arg){
    var r1,r2,m;
    try{r1=this.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (this*m+arg*m)/m
}
//减法
Number.prototype.sub = function (arg){
    return this.add(-arg);
}
//乘法
Number.prototype.mul = function (arg)
{
    var m=0,s1=this.toString(),s2=arg.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//除法
Number.prototype.div = function (arg){
    var t1=0,t2=0,r1,r2;
    try{t1=this.toString().split(".")[1].length}catch(e){}
    try{t2=arg.toString().split(".")[1].length}catch(e){}
    with(Math){
        r1=Number(this.toString().replace(".",""))
        r2=Number(arg.toString().replace(".",""))
        return (r1/r2)*pow(10,t2-t1);
    }
}
var GB={};
 GB.utils={
     temp:function(string,obj){
         return string.replace(/\$\w+\$/gi,function (matchs) {
             var returns = obj[matchs.replace(/\$/g, "")];
             return (returns + "") == "undefined" ? "" : returns;
         });
     },
     slideBottom:function(root,fn){
         var $root=$(root);
         if(!$root[0]){return;}
         $(window).on("scroll",function(){
                 var windowheight=window.innerHeight;
                 var documentheight=$(document).height();
                 var scrolltop=$(window).scrollTop();  // 这里可以封装为一个方法 返回对象
                 if(scrolltop>=documentheight-windowheight-5){
                     // ajax 加载数据 根据是否有数据来进行展示
                     if(fn){
                         fn();
                     }
                 }
         })
     },
     GetRequest:function(){
         var url = location.search; //获取url中"?"符后的字串
         var theRequest = {};
         if (url.indexOf("?") != -1) {
             var str = url.substr(1);
             strs = str.split("&");
             for(var i = 0; i < strs.length; i++) {
                 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
             }
         }
         return theRequest;
     },
     clearNoNum:function(obj, num) {
            obj.value = obj.value.replace(/[^\d.]/g, ""); // 清除“数字”和“.”以外的字符
            obj.value = obj.value.replace(/^\./g, ""); // 验证第一个字符是数字而不是.
            obj.value = obj.value.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的
            obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            // obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入两个小数
            obj.value = obj.value.replace(new RegExp("^(\\-)*(\\d+)\\.(\\d{0," + num + "}).*$", "gmi"), '$1$2.$3');
        },
     getWeixinlink:function(){
         var tmpTag = 'https:' == document.location.protocol ? "https:" : "http:";
         (function() {
             var hm = document.createElement("script");
             hm.src = tmpTag+ "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
             var s = document.getElementsByTagName("script")[0];
             s.parentNode.insertBefore(hm, s);
         })();
     },
     //判断手机系统
     getPlatform:function() {
            var userAgent = navigator.userAgent.toLowerCase();
            if(userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)){
                return userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)[1];
            }
            return '';
     },
     initJsBridge:function(callback){
         if (window.android_new) {
             callback(android_new)
         } else {
             document.addEventListener(
                 'WebViewJavascriptBridgeReady'
                 , function() {
                     callback(android_new)
                 },
                 false
             );
         }
     },
     
     //调用客户端方法(ios,android通用)
     send:function(data){
         if(this.getPlatform() == 'android') {
                android_new.send(data);
              }
              
         else {
                ios.send(data);
              }
     },
     callCustomMethod:function(methodName,params){  
        this.send({
                'methodName' : methodName,
                'data' : params,
                'responseCallback' : function (responseData) {}
         });
     },
     //打开推广(ios,android通用)
     startApp:function(methodName,params){
         if(getPlatform() == 'android') {
             android_new.send({
                 'methodName' : methodName,
                 'data' : params,
                 'responseCallback' : function (responseData) {}
             });
           }else {
             ios.send({
                 'methodName' : methodName,
                 'data' : params,
                 'responseCallback' : function (responseData) {}
             });
           }
     },
     //拨打客服电话
     callServicePhone:function(){
        var params_phone = {
            'title': "拨打客服电话:4000-339-993",
            'message': "",
            'telephone': "4000339993",
        };
        GB.utils.callCustomMethod("callServicePhone",params_phone);
     },
     toast:function(msg){
         var data={'msg':msg};
         this.send({
             'methodName' : "showToast",
             'data' : data,
             'responseCallback' : function (responseData) {}
         });
     },
     goOutSide:function(href){
         //用第三方应用打开链接
          if(GB.utils.getPlatform()!='android'){
             GB.utils.callCustomMethod('openSafariUrl',{"url":href});
             return false;
          } else{
            return  true;
          }
     },
     template:function(templateid,wrapid,data,type){

         var  type=type||"html";
         //模板
         if(templateid.indexOf("#")<=-1){
             templateid="#"+templateid;
         }
         if(wrapid.indexOf("#")<=-1){
             wrapid="#"+wrapid;
         }
         var Template = Handlebars.compile($(templateid).html());
         var  $wrap=$(wrapid);
         if(type=="html"){
             $wrap.html(Template(data));
         } else{
             $wrap.append(Template(data));
         }
     },
     isLogin:function(){
         var  obj=false;
         GB.ajax({
             url:basePath+'/user/getstore',
             type:'post',
             async:false
         }).done(function(_data){
             var  data=_data._data;
             if(data.telephone){
                 obj=data;
             }
         })
         return obj;
     },
     alert:function(msg){
         if(GB.utils.getPlatform()=='android'){
             GB.utils.callCustomMethod("showAlert",{'msg':msg});
         }else{
             alert(msg);
         }
     },
     singleAlert:function(_data,fn){
         //只执行一次
         if(!GB[_data.code]){
             GB[_data.code]=true;
             if(_data.code!='0021'){
                 // 0021时 在ajax 单独处理
                 if(fn){
                     fn();
                 }
             }
         }
     }
 };

GB.Ajax={
    ajax:function(param){
        var param=param||{};
        var  defaults={
            type:'post',
            data:{},
            url:''
        }
        defaults= $.extend({},defaults,param);
      return  $.ajax(defaults).then(function(_data){
            if(_data.code==="0000"){
               return   _data;
            } else{
                //console.log(_data);
                if(_data.code==='0003'||_data.code==='0002'){
                    //踢出 未登录
                    GB.post(basePath+'/user/setstore',{telephone:'',sessionId:''}).done(function(){
                        console.log("清除session");
                    })
                }
                if(_data.msg){
                    GB.utils.singleAlert(_data,function(){
                        GB.utils.alert(_data.msg);
                    })
                }
                return $.Deferred().reject(_data);
            }
        },function(err){
           console.log(err);
        })
    },
    //不做重复弹错误信息处理
    ajax2:function(param){
        var param=param||{};
        var  defaults={
            type:'post',
            data:{},
            url:''
        }
        defaults= $.extend({},defaults,param);
        return  $.ajax(defaults).then(function(_data){
            if(_data.code==="0000"){
                return   _data;
            } else{
                //console.log(_data);
                if(_data.code==='0003'||_data.code==='0002'){
                    //踢出 未登录
                    GB.post(basePath+'/user/setstore',{telephone:'',sessionId:''}).done(function(){
                        console.log("清除session");
                    })
                }
                if(_data.msg){
                    GB.utils.alert(_data.msg);
                }
                return $.Deferred().reject(_data);
            }
        },function(err){
            console.log(err);
        })
    },
    post:function(url,data){
        return  GB.Ajax.ajax({url:url,data:data,type:"post"});
    },
    get:function(url,data){
        return GB.Ajax.ajax({url:url,data:data,type:"get"});
    }
}

// 再次封装 方便调用
GB.post=function(url,data){
    return GB.Ajax.post(url,data);
}
GB.get=function(url,data){
    return GB.Ajax.get(url,data);
}
GB.ajax=function(param){
    return GB.Ajax.ajax(param);
}
//不做重复弹错误信息处理
GB.ajax2=function(param){
    return GB.Ajax.ajax2(param);
}
/****弹窗组件*****/
/**功能组件 与ui相关*/
GB.Widget=function(){
    this.boudingBox = null; //属性：最外层容器
}
GB.Widget.prototype={
    on:function(type,handler){
        if (typeof this.handlers[type]=='undefined') {
            this.handlers[type]=[];
        }
        this.handlers[type].push(handler);
        return this;
    },
    fire:function(type,data){
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for(var i=0,len=handlers.length;i<len;i++){
                handlers[i](data);
            }
        };
    },
    render:function(container){     //方法：渲染组件
        this.renderUI();
        this.handlers={};
        this.syncUI(container);

        this.bindUI();

    },
    destroyInternal:function(){
        this.boudingBox.off();
        this.boudingBox.remove();
    },
    destroy:function(){      //方法：销毁
        this.destructor();
        this.boudingBox.off();
        this.boudingBox.remove();
    },
    renderUI:function(){},  //接口：添加dom节点
    bindUI:function(){},    //接口：监听事件
    syncUI:function(container){},   //接口：初始化组件属性
    destructor:function(){} //接口：销毁前的处理函数 外部的东西
}
GB.utils.pop=function(options){
    this.cfg = {
        width:558,
        height:245,
        title:'',
        content:"",
        type:0,
        flag:'',
        displeartime:3000,
        handler4Displear:"",
        hasCloseBtn:true,
        hasMask:true,
        hasScroll:true,
        skinClassName:null,
        handler4CloseBtn:null,
        handler4CancleBtn:null,
        handler4SureBtn:null,
        eventHandler:null   //事件句柄 content内容之间的事件绑定
    };
}
GB.utils.pop.prototype= $.extend({},new GB.Widget(),{
    renderUI:function(){
        var html='';
        switch(this.cfg.winType){
            case "show":
                this.cfg.hasCloseBtn?html='<div class="dialogTop" style="height:42px;"><span class="dialogTitle">'+this.cfg.title+'</span><a class="dialogClose oppcloseBtn fixiepng" title="关闭"></a></div>':html='<div class="dialogTop"><span class="dialogTitle">'+this.cfg.title+'</span></div>';
                break;
            case "displear":
                html='';
                break;
            case "alert":
                var title=this.cfg.title;
                html= '<div class="alert-title"><span class="dialogTitle">'+title+'</span><a class="dialogClose oppcloseBtn " title="关闭"></a></div>';
                var contenttext=this.cfg.content||"";
                this.cfg.content=
                    '<div class="alert-Con">'+
                    '<div class="windowText">'+contenttext+'</div>'+
                    '</div>';
                break;
            case "showhtml":
                html='';
                break;
            case "loading":
                html="<div class='dialog_loading'><img src='"+basePath+"/statics/images/common/loadding.gif' /></div>";
                break;

            case "questiontip":
                var html= '<div class="pop-risk-waring">'
                    + '    <div>'
                    + '        <span class="source-title">'+this.cfg.title+'</span>'
                    + '        <img src="'+basePath+'/statics/images/common/close.png" class="close oppcloseBtn">'
                    + '    </div>'
                    + '    <div class="content">'
                    + '    '+this.cfg.content+' '
                    + '    </div>'
                    + '</div>'
                this.cfg.content=html;
                break;
            default :
                html='';
                break;
        }
        if(this.cfg.type=='modal'){
            this.boudingBox=$(
                '<div  id="'+this.cfg.flag+'" class="show_modal">'+
                '<div class="window_top">'+html+'</div>'+
                '<div class="show_modal_body">'+this.cfg.content+'</div>'+
                '</div>'
            )
        } else{
            this.boudingBox=$(
                '<div  id="'+this.cfg.flag+'" class="show_window">'+
                '<div class="window_top">'+html+'</div>'+
                '<div class="window_body">'+this.cfg.content+'</div>'+
                '</div>'
            )
        }

        /*处理模态*/
        if (this.cfg.hasMask) {
            var window_height=$(document).height();
            this._mask = $('<div class="windowMask"></div>').css("height",window_height);
            this._mask.appendTo("body");
            this._mask.on("touchmove",function(){
                return  false;
            })
            var that=this;
            this._mask.on("click",function(){
                that.fire('close');
                that.destroy();
            })
            if(this.cfg.winType==="loading"){
                this._mask.css("z-index",1000);
                this._mask.off("click");
            }
        }
    },
    bindUI:function(){
        var that = this;
        this.boudingBox.on("touchmove",function(e){
            //return false;
        })
        this.boudingBox.on("click",".oppcloseBtn",function(){
            that.fire('close');
            that.destroy();
        });
        if(that.cfg.winType==="questiontip"){
            this.boudingBox.on("click",function(){
                that.destroy();
            })
        }
        if(this.boudingBox.find(".J_cancelBtn")[0]){
            this.boudingBox.delegate(".J_cancelBtn","click",function(){
                that.fire('cancel');
                that.destroy();
            })
        }
        if(this.boudingBox.find(".J_sureBtn")[0]){
            this.boudingBox.delegate(".J_sureBtn","click",function(){
                that.fire('sure');
                that.destroy();
            })
        }
        if(this.cfg.winType=="displear"){
            if(this.cfg.displeartype=="ok"){
                this.boudingBox.addClass("displear_ok");
            }
            this.boudingBox.fadeOut(this.cfg.displeartime,function(){
                that.fire("displear");
                that.destroyInternal();
            });
            this.on("displear",function(){
                $(window).on("scroll",function(){
                    var scrollTop=$(window).scrollTop();
                    var newtop=  (that.cfg.windowHeight-that.cfg.height)/2+scrollTop+(that.cfg.yfloat||0);
                    that.boudingBox.css("top",newtop);
                })
            })

        }

        if (this.cfg.handler4CloseBtn) {
            this.on('close',this.cfg.handler4CloseBtn);
        };
        if(this.cfg.handler4Displear){
            this.on("displear",this.cfg.handler4Displear);
        }
        if(this.cfg.handler4CancleBtn){
            this.on("cancel",this.cfg.handler4CancleBtn);
        }
        if(this.cfg.handler4SureBtn){
            this.on("sure",this.cfg.handler4SureBtn);
        }

        if(this.cfg.eventHandler){
            this.cfg.eventHandler.call(this);
        }
    },
    syncUI:function(container){
        this.cfg.windowScrollTop=$(document).scrollTop();
        this.cfg.windowHeight=$(window).height();
        var float=this.cfg.yfloat||0;
        $(container||document.body).append(this.boudingBox);

        if (this.cfg.skinClassName) {
            this.boudingBox.addClass(this.cfg.skinClassName);
        };
    },
    destructor:function(){
        this._mask && this._mask.remove();
    },
    show:function(cfg,container){
        $.extend(this.cfg,cfg,{winType:'show'});
        this.render(container);
        return this;
    },
    displear:function(cfg,container){
        $.extend(this.cfg,cfg,{winType:"displear",skinClassName:"displear",isDraggable:false,hasMask:false});
        this.render(container);
        return this;
    },
    loading:function(cfg,container){
        $.extend(this.cfg,cfg,{winType:"loading"});
        this.render(container);
        return this;
    },

    showhtml:function(cfg,container){
        $.extend(this.cfg,cfg,{winType:"showhtml"});
        this.render(container);
        return this;
    },
    questiontip:function(cfg,container){
        $.extend(this.cfg,cfg,{winType:"questiontip"});
        this.render(container);
        return this;
    },
    alert1:function(cfg,container){
        $.extend(this.cfg,cfg,{winType:"alert1",isDraggable:false});
        this.render(container);
        return this;
    }
});
//弹窗组件 displear 对外的接口
GB.utils.displear=function(option,container){
    var options=$.extend({height:50,width:200},option);
    var newpop=new GB.utils.pop().displear(options,container);
    return newpop;
}
GB.utils.show=function(option,container){
    var options=$.extend({height:300,width:450},option);
    var newpop=new GB.utils.pop().show(options,container);
    return newpop;
}
GB.utils.loading=function(option,container){
    var options=$.extend({},option);
    var newpop=new GB.utils.pop().loading(options,container);
    return newpop;
}
GB.utils.delcnewfm=function(option,container){
    var options=$.extend({height:130,width:300},option);
    var newpop=new GB.utils.pop().delcnewfm(options,container);
    return newpop;
}
GB.utils.showhtml=function(option,container){
    var options=$.extend({},option);
    var newpop=new GB.utils.pop().showhtml(options,container);
    return newpop;
}

GB.utils.questiontip=function(title,content,option,container){
    var options=$.extend({title:title,content:content},option);
    var newpop=new GB.utils.pop().questiontip(options,container);
    return newpop;
}
