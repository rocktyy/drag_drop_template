(function(){  
	//自定义 保存按钮
    var aa= { 
        exec:function(editor){  
			//保存页面html
            var _data  =  editor.getData();  
            //'<br/>' 去掉 结尾元素的br 
            var jsonData ={
                htmlContent:_data,
                htmlName:$('#htmlName').val(),
                cssHref:$('#htmlName').attr('data-cssHref'),
            } 
            //  保存 html 
            $.ajax({
                  url:'http://localhost:3100/'+'templete/createHtml',
                  data:jsonData,
                  type:'post',
                  success:function(_data){
                      if(_data.success){
                          console.log("保存成功") 
                          //点击保存
                          $('#isSave').val('true')
                      }else{
                          console.log(_data.msg);
                      } 
                  }
             })
        } 
    },bb='saveHtml'; 
    //绑定 保存方法 
    CKEDITOR.plugins.add(bb,{ 
        init:function(editor){ 
            editor.addCommand(bb,aa); 
            editor.ui.addButton('saveHtml',{ 
                label:'保存', 
                icon: this.path + 'save_html.png', 
                command:bb 
            }); 
        } 
    }); 
})(); 