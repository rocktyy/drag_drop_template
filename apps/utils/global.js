/**
 * Created by cr on 2016/8/25.
 */
module.exports = {};
global.GLOBAL_SERVERHOST = 'http://192.168.10.11:8096';
global.GLOBAL_SERVERHOST2 = 'http://192.168.10.11:8096';
if(process.env.env == 'online'){
    global.GLOBAL_SERVERHOST = 'http://internal-api.huangjinqianbao.com/';
    global.GLOBAL_SERVERHOST2 = 'http://internal-api.huangjinqianbao.com/';
}else if(process.env.env == 'test'){
    global.GLOBAL_SERVERHOST = 'http://10.162.203.207:8097';
    global.GLOBAL_SERVERHOST2 = 'http://10.162.203.207:8097';
}else{
    global.GLOBAL_SERVERHOST = 'http://10.162.203.207:8097';
    global.GLOBAL_SERVERHOST2 = 'http://10.162.203.207:8097';
}
global.GLOBAL_REDISHOST = process.env.env == 'online'?'727fd4bc071e436b.m.cnhzfb.kvstore.aliyuncs.com':'462e2bd1f68542db.m.cnbja.kvstore.aliyuncs.com';
global.GLOBAL_REDISPASS = process.env.env == 'online'?'Ou2LRLK69ylh0zAt':'462e2bd1f68542db:23weSD06tgJOIRMJtewrk95r4';
global.GLOBAL_REDISPORT = '6379';