/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) { 
    //config.skin = 'kama';// kama皮肤，Moono皮肤
	config.uiColor = '#AADC6E'; 
    config.width = 'auto'; // 宽度     
    config.height = 662;    
     //禁止格式化 
    config.allowedContent = true;    
    config.toolbarCanCollapse = true;// 工具栏是否可以被收缩     
    config.resize_enabled = true;  

    var pre = CKEDITOR.getUrl("").substring(0,CKEDITOR.getUrl("").indexOf('scripts'));
    // ** 编辑器 添加多个样式文件
    config.contentsCss = [(pre+"styles/tpl/model/non_farm/noFarmStyle.css"),
        CKEDITOR.getUrl(pre+"styles/tpl/model/rateRaise/rate_raise.css"),
    ]; 
    
	config.toolbar = 'Full';
    config.toolbar_Full = [ 
            ['clearHtml','-','saveHtml','-','previewHtml'],
            ['Source','-'], //'Save' ,'Print'
            ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Scayt'],     
            ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],     
            ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],     
            '/',     
            ['Styles','Format'],     
            ['Bold','Italic','Strike'],     
            ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],     
            ['Link','Unlink','Anchor'],     
            ['Maximize','-','About']
    ];
    config.extraPlugins ="clearHtml,saveHtml,previewHtml";  
    config.toolbar_Basic = [['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']];
}; 

