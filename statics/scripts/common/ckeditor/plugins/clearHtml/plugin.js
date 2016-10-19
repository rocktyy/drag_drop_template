(function(){ 
    //自定义 清空按钮
    var a= { 
        exec:function(editor){  
			editor.setData("");  
            //加载 autoLayout
            var $ckeditor_frame = $('#cke_1_contents').find('.cke_wysiwyg_frame'); 
            //$($ckeditor_frame[0].contentDocument.head); $ckeditor_frame.contents().find("head");
            var $ckeditor_head  = $($ckeditor_frame[0].contentDocument.head);
            var js_files = CKEDITOR.getUrl('autoLayout.js'); 
            $ckeditor_head.append($("<script/>", {
                src: js_files,
                type: "text/javascript"
            })); 
        } 
    },b='clearHtml'; 
    //绑定 清空方法 
    CKEDITOR.plugins.add(b,{ 
        init:function(editor){ 
            editor.addCommand(b,a); 
            editor.ui.addButton('clearHtml',{ 
                label:'清空html', 
                icon: this.path + 'clear_html.png', 
                command:b 
            }); 
        } 
    });    
})(); 