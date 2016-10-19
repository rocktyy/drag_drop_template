/**
 * Created by wanglin on 2016/8/24.
 */
//初始化 editer
$(function(){
    // 点击标题
    $(".nav-tabs").on('click','li',function(){ 
    if(!$(this).hasClass('active')){ 
        //关闭同层的active
        $(this).siblings().removeClass("active");
        $(this).addClass("active"); 
        // src
        var str  =  $(this).find('a').attr('data-type');
        $('#temp-'+str).show();
        $('#temp-'+str).siblings().hide();
    }
    }) 
    //点击 模板
    $(".tab-pane").on('click','.templete',function(){  
        var tplId = $(this).attr('data-id');
        var tplcss = $(this).attr('data-css'); 
        var tplName = $(this).attr('data-name'); 
        //模板 名字 
        $('#htmlName').val(tplName);
        $('#htmlName').attr('data-cssHref',tplcss)

        var data ={
            tplId : tplId
        }
        var _html ="";
        GB.post(basePath + '/templete/getTpl',data).done(function(_data){   
            _html = unescape(_data.data.html); 
            CKEDITOR.instances.editor1.insertHtml(_html+'<br/>');
        }).fail(function(_data){ 
            alert(_data.msg);
        });
    }) 

    //点击 左右模块事件
    $(".wwei-editor").click(function(){
        //点击标题
        var _html = $(this).parent().html();  
        CKEDITOR.instances.editor1.insertHtml(_html+'<br/>');
    })
     
});
