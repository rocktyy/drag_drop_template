(function(){ 
    //自定义 清空按钮
    var a= { 
        exec:function(editor){  
			 var url = CKEDITOR.getUrl("").substring(0,CKEDITOR.getUrl("").indexOf('statics')) +'html/html/';
             var htmlName = $('#htmlName').val();
             url +=  htmlName+'.html';
             if(!htmlName){
                alert('还没选择模板');
                return;
             }
             var isSave = $('#isSave').val();
             if(isSave == 'false'){
                alert('先点击保存才可以预览模板');
                return;
             }
             window.open(url);      
        } 
    },b='previewHtml'; 
    //绑定 清空方法 
    CKEDITOR.plugins.add(b,{ 
        init:function(editor){ 
            editor.addCommand(b,a); 
            editor.ui.addButton('previewHtml',{ 
                label:'预览html',
                icon: this.path + 'preview.png', 
                command:b 
            }); 
        } 
    });    
})(); 