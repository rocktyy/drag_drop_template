/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* 'common' app                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


'use strict';


const koa = require('koa');// koa framework
const superagent = require('superagent');
const fs = require('co-fs');
const error = require('../utils/error.js');
const log = require('bunyan').createLogger({ name: 'app' });
const app = module.exports = {}; 


app.post = function* (url,postData,sessionId) {
	var requestUrl = '';
	if(url.startsWith('/')){
		requestUrl = url;
	}else{
		requestUrl = '/' + url;
	}
	if(postData.test){
		var name = url.substring(url.lastIndexOf('/')+1);
		var path = './apps/json/'+name+'.json';
		var result = JSON.parse(yield fs.readFile(path, 'utf-8'));
		return result;
	}
	var host = GLOBAL_SERVERHOST;
	if(url =='/server/price/query' || url == '/comment/guessGoldPriceInfo'){
		host = GLOBAL_SERVERHOST2;
	}
	log.info({host:host,webIp:postData.webIp});
	var res = yield superagent.post(host + url)
		.set('X-API-Key', 'foobar')
		.set('Accept', 'application/json')
		.set('VERSION', '3.2.0')
		.set('deviceId', 'WEB')
		.set('platform', 'Phone')
		.set('scene', 'Wap')
		.set('userAgent', 'Wap')
		.set('channel', 'Wap')
		.set('sessionId', sessionId)
		.set('webIp',postData.webIp||"127.0.0.1")
		.type('application/json')
		.send(postData);
	if (res.status == 200) {
		log.info({req:{url:url,postData:postData,sessionId:sessionId},res:res.body});
		return res.body;
	} else {
        throw new error.JsonError(res.status);
	}

};

app.getTelephone = function(request){
	if(request.request.body.telephone){
		return request.request.body.telephone;
	}
	return request.session.telephone;
};
app.getSessionId = function(request){
	if(request.request.body.sessionId){
		return request.request.body.sessionId;
	}
	return request.session.sessionId;
};
app.getClientIp = function(req) {
	return req.headers['x-forwarded-for'] ||
		req.headers['x-real-ip'] ||
		req.socket.remoteAddress;
};