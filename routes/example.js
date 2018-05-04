/*
 * @Author: sunyongjian 
 * @Date: 2018-05-09 17:22:03 
 * @Last Modified by: sunyongjian
 * @Last Modified time: 2018-05-16 12:05:48
 */

const router = require('koa-router')();
const exampleController = require('../controller/example');

router.get('/', exampleController.index);

module.exports = router.routes();
