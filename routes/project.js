/*
 * @Author: sunyongjian 
 * @Date: 2018-05-09 17:22:03 
 * @Last Modified by: sunyongjian
 * @Last Modified time: 2018-05-16 12:03:30
 */

const router = require('koa-router')();
const projectController = require('../controller/project');

router.get('/', projectController.index);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
// router.delete('/:id', projectController.deleteItem);

module.exports = router.routes();
