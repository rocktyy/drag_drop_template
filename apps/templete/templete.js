/**
 * autor: tianyuyan
 * date: 2016-09-20
 */ 
'use strict'; 
  
const koa = require("koa");
const path = require('path');
const common = require('../utils/common.js');
const error = require('../utils/error.js'); 
const until = require('../utils/until.js');  
 
const app = module.exports = {};
let activityCode ='1';
let testdata={test:true}; 
 
/**
 * url 模版列表
 * des 查询中奖信息列表 
 */
app.getTempleteList=function* (){
    let result = {};
    let url = '/templete/getTempleteList';
    let templeteId = this.request.query.templeteId;
    console.log(templeteId);
    let postData = {templeteId:templeteId};
    postData=Object.assign(postData,testdata); 
    result = yield common.post(url,postData,null);
    this.body=result;
}

/**
 * 获取 _html模板
 */
app.getTpl=function* (){
    let msg ="成功", html_result = "", data = {},code ="";
    try{ 
        let tplId = this.request.body.tplId; 
        yield this.render("tpl/"+tplId,{ 
            date: "2016-09-21 15:32:08"
        }); 
        data.html = escape(this.body);  
        code = '0000'
    }catch(e){
        msg = e; 
        data = {}; 
        html_result = false;
        console.log(e);
    }  
    let result = {code:code,success:html_result,data:data,msg:msg};  
    this.body=result;

}
 
/**
 * 生成 html页面 
 */

app.createHtml=function* (){
	let msg ="",html_result = "",code ="";;
    try{
	  	//this.request.body 是post请求 
	    let htmlContent = this.request.body.htmlContent;
	    let htmlTitle = this.request.body.htmlTitle;
        let cssHref = this.request.body.cssHref; 
	    let htmlName = this.request.body.htmlName;   
	    yield this.render("tpl/tpl.html", {
		    title: htmlTitle,
		    body: htmlContent, 
            cssName:cssHref
	    }); 
	    let _htmlBody = this.body; 
        var path1 = '././web/html/html/' + htmlName + '.html';

	    yield until.writeFileAsync(path1,_htmlBody);
        code = '0000';
        html_result = true;
    }catch(e){
    	msg = '服务端存储异常！'; 
        code = '1122';
    	html_result = false;
    	console.log(e);
    }  
    let result = {code:code,success:html_result,data:msg};  
    this.body=result;
}
 
