/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* 金价相关接口                                           */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';


const koa = require('koa');            // koa framework
//const queryString = require('queryString');
const common = require('../utils/common.js');
const error = require('../utils/error.js')
const app = module.exports = {};

/**
 * 查询金价
 * 参数为queryFlag
 */
app.query = function* (){
    let result = {};
	let queryFlag = this.request.query.queryFlag;
	if(!queryFlag){
        result = {success:false,code:'0021',msg:'查询方式未输入'};
		this.body = result;
		return ;
	}
	let url = '/server/price/query';
	let  postData = {queryFlag:queryFlag,type:'1'};
    postData = Object.assign(postData,{webIp:common.getClientIp(this.request)});
    result = yield common.post(url,postData,null);
    if(queryFlag == 3 || queryFlag == 6){
        this.body = result.data;
    }else {
        let priceArray = result.data.priceArray;
        for (let i in priceArray) {
            let priceMap = priceArray[i];
            priceMap.x = new Date(priceMap.date).getTime();
            priceMap.y = (priceMap.price/100).toFixed(2);
            delete priceMap.price;
            delete priceMap.date;
        }
        this.body =result;
    }
};
