
const router = require('koa-router')();
const price = require('../../apps/info/price.js');

router.get( '/info/price', price.query);

module.exports = router.middleware();