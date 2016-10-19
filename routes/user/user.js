const router = require('koa-router')();
const user = require('../../apps/user/user.js');

router.prefix('/user');
router.get('/login', user.login);
router.post('/login',user.postLogin);
router.get('/logout',user.logout);

module.exports = router.middleware();
