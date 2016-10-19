/**
 * Created by cr on 2016/8/18.
 */
    'use strict'
const koa = require('koa');
const router = require('koa-router')();

module.exports ={};

//router.prefix('/test');
//引入模块
let price = require('./info/price');
let user = require('./user/user'); 
let store = require('./user/store'); 
//模板 模块
let templete = require("./templete/templete");

// routes definition
router.use(price);
router.use(user); 
router.use(store);
router.use(templete); 
module.exports =router.middleware();



