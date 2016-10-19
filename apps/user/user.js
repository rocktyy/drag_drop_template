/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* 'login' app                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';


const koa = require('koa');
const log = require('bunyan').createLogger({ name: 'app' });
const common = require('../utils/common.js');

const app = module.exports = {};

app.login = function* (){
	//yield session.set('www',{telephone:'15110046756'});	
	//session.telephone = '15110046756';
	log.info("login begin");
	this.flash = {telephone: this.session.telephone || ''};
	yield this.render('user/login', this.flash);
	log.info("login end");
};

app.postLogin = function* (){
	log.info("postLogin");
	log.info(this.request.body.telephone);
	let url = 'user/base/login';
	let  postData = this.request.body;
	this.body = yield common.post(url,postData,null);
	let sessionid  = this.body.data.sessionid;
	this.session.telephone = this.request.body.telephone;
	this.session.sessionid = sessionid;
	log.info(sessionid);
	log.info("postLogin end ");
};
app.logout = function* (){
	log.info("logout");
	let url = 'user/base/logout';
	let  postData = {telephone:this.session.telephone};
	yield common.post(url,postData,this.session.sessionid);
	this.session = null;
	this.redirect('login');
};