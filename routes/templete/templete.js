/**
 * autor: tianyuyan
 * date: 2016/9/6.
 */

const router = require('koa-router')();
const templete = require('../../apps/templete/templete.js');

/**查询 模板列表 **/
router.get('/templete/getTempleteList', templete.getTempleteList);


/**查询 html模板 **/
router.post('/templete/getTpl', templete.getTpl);

/**保存 html模板 **/
router.post('/templete/createHtml', templete.createHtml);

module.exports = router.middleware();