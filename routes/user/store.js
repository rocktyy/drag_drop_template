/**
 * Created by wanglin on 2016/8/25.
 */
const router = require('koa-router')();
const userStore = require('../../apps/user/store.js');

router.post('/user/setstore', userStore.setstore);


router.post('/user/getstore', userStore.getstore);

module.exports = router.middleware();