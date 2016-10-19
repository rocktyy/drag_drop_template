/**
 * Created by wangzhenpeng on 2016/8/23.
 * 模拟黄金 买卖 弹窗 实现
 */

var tradegold=function(option){
    option=option||{};
    var defaults={
        type:1,
        price:'', //实时金价
        usemoney:0, //可用余额
        useweight:0,//可卖金重
        buySuccessFn:'',// 买入成功 fn
        sellSuccessFn:''// 卖出成功 fn
    }
    defaults= $.extend({},defaults,option);
    defaults.usemoney=parseFloat(defaults.usemoney);
    defaults.useweight=parseFloat(defaults.useweight);
    this.buyajax="";
    this.sellajax="";
    this.option=defaults;
    this.init();
}

tradegold.prototype={
    init:function(){
       this.show();
    },
    getHtml:function(){
        if(this.option.type==1){
            //买入
            var html= '<div class="gold-trade-pop" id="J_trade_wrap">'
                + '   <div class="trade-close-wrap oppcloseBtn"><div class="pop-close "><img  src="'+basePath+'/statics/images/common/close-size2.png"/></div></div>'
                + '    <div class="pop-top">'
                + '        <p class="title">买入黄金</p>'
                + '        <p class="price J-viewprice">'+this.option.price+'</p>'
                + '        <p class="des">实时金价(元/克)</p>'
                + '    </div>'
                + '    <div class="pop-content">'
                + '        <ul>'
                + '            <li>'
                + '                <label class="view-label" for="J_gold_weight" >买入克重：</label>'
                + '                <input class="input" id="J_gold_weight" type="number" maxlength="8" placeholder="请输入买入克重"  />'
                + '            </li>'
                + '            <li>'
                + '                <label class="view-label" >预计金额：</label>'
                + '                <span  class="foremoney"></span>元'
                + '            </li>'
                + '        </ul>'
                + '        <div class="tip-info">'
                + '            可用余额：<span class="J-balance" id="J_balanceMoney">'+this.option.usemoney+'</span>元<span class="err-tip" >(可用余额不足)</span>'
                + '        </div>'
                + '    </div>'
                + '    <div class="pop-footer">'
                + '        <p>(成交价格以实时金价为准)</p>'
                + '        <button class="pop-trade-button" disabled="disabled" id="J_trade_button" type="button">确认买入</button>'
                + '    </div>'
                + '</div>'
        } else{
            //卖出
            var html= '<div class="gold-trade-pop" id="J_trade_wrap">'
                + '   <div class="trade-close-wrap oppcloseBtn"><div class="pop-close"><img  src="'+basePath+'/statics/images/common/close-size2.png"/></div></div>'
                + '    <div class="pop-top">'
                + '        <p class="title">卖出黄金</p>'
                + '        <p class="price J-viewprice">'+this.option.price+'</p>'
                + '        <p class="des">实时金价(元/克)</p>'
                + '    </div>'
                + '    <div class="pop-content">'
                + '        <ul>'
                + '            <li>'
                + '                <label class="view-label" for="J_gold_weight" >卖出克重：</label>'
                + '                <input class="input" id="J_gold_weight" type="number" placeholder="请输入卖出克重"  />'
                + '            </li>'
                + '            <li>'
                + '                <label class="view-label" >预计金额：</label>'
                + '                <span  class="foremoney"></span>元'
                + '            </li>'
                + '        </ul>'
                + '        <div class="tip-info">'
                + '            可卖出克重：<span class="J-balance" >'+this.option.useweight+'</span>克<span class="err-tip" >(可卖出克重不足)</span>'
                + '        </div>'
                + '    </div>'
                + '    <div class="pop-footer">'
                + '        <p>(成交价格以实时金价为准)</p>'
                + '        <button class="pop-trade-button" id="J_trade_button" disabled="disabled"  type="button">确认卖出</button>'
                + '    </div>'
                + '</div>'
        }
        return html;
    },
    show:function(){
         var  html=this.getHtml();
         var $this=this;
        $this.dialog= GB.utils.showhtml({
            type:"modal",
            content:html,
            flag:'J_trade_dialog',
            handler4CloseBtn:function(){
                $("body").removeClass("modal-open");
              if(!GB.utils.isLogin()){
                  window.location.reload(true);
              }
            },
            eventHandler:function(){
                // 这个函数中的this 表示 弹窗实例 this
                $this.bindUI.call($this,this);
            }
        })
    },
    bindUI:function(dialog){
           var that=this;
        var  $root=$("#J_trade_wrap");
        var $foremoney=$root.find(".foremoney");
        var $button=$("#J_trade_button");
        var  $inputgold=$("#J_gold_weight");
        if(this.option.type==1){
            // 买入
            var $tips=$root.find(".err-tip");
            $("#J_gold_weight").on("input",function(){
                GB.utils.clearNoNum(this,3);
                var input= $.trim($(this).val());
                if(input==""||input==0.00||input==0.000||input==0.0){
                    $foremoney.html("");
                    $button.attr("disabled","disabled");
                    return;
                }
                if(input.toString().length>8){
                    input=input.toString().substring(0,8);
                    $(this).val(input);
                }
                input=parseFloat(input);
                var nowprice= parseFloat($root.find(".J-viewprice").html());
                var money=that.option.usemoney;
                var foremoney=(input*nowprice).toFixed(2);
                $foremoney.html(foremoney);
                if(input&&input>=0.001){
                    $button.removeAttr("disabled");
                } else{
                    $button.attr("disabled","disabled");
                }
                if(parseFloat(foremoney)> parseFloat(money) ){
                    $button.attr("disabled","disabled");
                    $tips.show();
                } else{
                    $button.removeAttr("disabled");
                    $tips.hide();
                }
            })
            $button.on("click",function(){
                that.buyGold(dialog);
            })
        } else{
            var $tips=$root.find(".err-tip");
            $inputgold.on("input",function(){
                var weight=that.option.useweight;
                GB.utils.clearNoNum(this,3);
                var input= $.trim($(this).val());
                if(input==""){
                    $foremoney.html("");
                    $button.attr("disabled","disabled");
                    return;
                }
                if(input=="0"||input=="0.00"||input=="0.000"||input=="0.0"){
                    $foremoney.html("0.00");
                    $button.attr("disabled","disabled");
                    return;
                }
                input=parseFloat(input);
                if(input>weight){
                    $(this).val(weight);
                    input=weight;
                } else{
                    $tips.hide();
                }
                var nowprice= parseFloat($root.find(".J-viewprice").html());
                var foremoney=(input*nowprice).toFixed(2)||"";
                $foremoney.html(foremoney);
                if(input&&input>=0.001){
                    $button.removeAttr("disabled");
                } else{
                    $button.attr("disabled","disabled");

                }

            })
            $button.on("click",function(){
                that.sellGold(dialog);

            })
        }


    },
    sellGold:function(dialog){
        var that=this;
        var goldWeight = parseFloat($.trim($("#J_gold_weight").val())).mul(1000) ;
        var accountGoldWeight=that.option.useweight.mul(1000);
        if(that.sellajax&&that.sellajax.state()=='pending'){
            return;
        }
        var loading=GB.utils.loading();
        that.sellajax=GB.post(basePath+"/virtualGold/trade/saleGold",{goldWeight:goldWeight,accountGoldWeight:accountGoldWeight}).done(function(_data){
            if(that.option.sellSuccessFn){
                that.option.sellSuccessFn();
            }
            loading.destroy();
            GB.utils.toast("卖金成功");
            dialog.destroy();
        }).fail(function(_data){
            loading.destroy();
            if(GB["0021"]){
                GB.utils.alert(_data.msg);
            }
        })
    },
    buyGold:function(dialog){
        var that=this;
        var goldWeight= parseFloat($.trim($("#J_gold_weight").val())).mul(1000) ;
        var balanceMoney=that.option.usemoney.mul(100);
        if(that.buyajax&&that.buyajax.state()=='pending'){
            return;
        }
        var loading=GB.utils.loading();
       that.buyajax=GB.post(basePath+"/virtualGold/trade/buyGold",{goldWeight:goldWeight,balanceMoney:balanceMoney}).done(function(_data){
           if(that.option.buySuccessFn){
               that.option.buySuccessFn();
           }

           loading.destroy();
           GB.utils.toast("买金成功");
            dialog.destroy();
        }).fail(function(_data){
           loading.destroy();
           if(GB["0021"]){
               GB.utils.alert(_data.msg);
           }
           if(_data===undefined){
               GB.utils.alert("网络异常");
           }
       })
    }
}
GB.utils.trade=function(option){
    return  new tradegold(option);
}

