/**
 * Created by wanglin on 2016/8/25.
 */
/**
 * url /virtualGold/info/myRank
 * des 存储telephone和sessionId
 * @param {string} telephone 手机号
 * @param {string} sessionId sessionId
 */
'use strict';


const koa = require('koa');            // koa framework
const common = require('../utils/common.js');
const error = require('../utils/error.js');

const app = module.exports = {};

app.setstore = function* (){

    this.session.telephone = this.request.body.telephone;
    this.session.sessionId = this.request.body.sessionId;

    this.body={"success":true,"code":"0000"};
}
app.getstore=function* (){
    var obj={};
    if(common.getTelephone(this)){
        obj.telephone=common.getTelephone(this);
    }
    if(common.getSessionId(this)){
        obj.sessionId=common.getSessionId(this);
    }
    this.body={"code":"0000",_data:obj};
}