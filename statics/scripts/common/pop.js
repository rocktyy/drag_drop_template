/**
 * Created by wangzhenpeng on 2016/3/18.
 */
/****打电话 弹窗 方法****/

(function($,window){
    function popTel(option){
        var  option=option||{};
        var  defaults={
            root:".maketel",
            tel:"4000-339-993"
        }
        option= $.extend({},defaults,option);
        this.option=option;
        this.init(option);
    }
    popTel.prototype={
        init:function(option){
            var $body=$("body");
            var  html=this.getHtml();
            $body.append(html);
            this.$pop=$("#J_pop_tel");
            this.renderUI();
            this.bindUI();
        },
        getHtml:function(){
            var html='<div id="J_pop_tel">'+
                '<div class="pop-wrap">'+
                '<div class="tel-time">'+
                '<p class="tel">'+this.option.tel+'</p>'+
                '<p class="wtime">(工作日<span class="en-family">09:00-21:00</span> 周末<span class="en-family">10:00-15:00</span>)</p>'+
                '</div>'+
                '<div class="makephone">'+
                '<p class="J_cancel cancel">取消</p><p class="J_sure" class="J_make make">呼叫</p>'+
                '</div>'+
                '</div>'+
                '</div>';
            return html;
        },
        renderUI: function (obj) {
            var  $pop=$("#J_pop_tel");
            var width=window.innerWidth;
            var winheight=window.innerHeight;

            var  height1=document.body.scrollHeight||document.documentElement.scrollHeight;
            var  height=  Math.max($(document).height(),winheight,height1);
            var scrolltop=$(window).scrollTop();
            $pop.show();
            var domwidth=$pop.width();
            var domheight=$pop.height();
            var top=scrolltop+(winheight-domheight)/2;
            $pop.css({"margin-left":-domwidth/2,"top":top});
            $("<div class='pop-mark'></div>").css("height",height).appendTo("body");
            // 禁止页面滚动
            //$("body,html").css({"overflow":"hidden"})
            //this.preventdefault();
        },
        bindUI:function(){
            var  that=this;
            var $pop=this.$pop;
            $pop.on("tap",".J_cancel",function(){
                that.destroy();
                //that.unbindpreventdefault();
            })
            $pop.on("tap",".J_sure",function(){
                var tel="tel:"+that.option.tel;
                window.location.href=tel;
            })
        },
        destroy:function(){
            this.$pop.remove();
            $(".pop-mark").eq(0).remove();
        },
        moveevent:function(event){
            event.preventDefault();
        },
        preventdefault:function(){
            var that=this;
            document.body.addEventListener('touchmove',that.moveevent , false);
        },
        unbindpreventdefault: function () {
            var that=this;
            document.body.removeEventListener('touchmove',that.moveevent );
        }

    }

    window.poptel=function(option){
        return new popTel(option)
    }
})($,window)