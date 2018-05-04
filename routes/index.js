/*
 * @Author: sunyongjian 
 * @Date: 2018-04-03 18:17:13 
 * @Last Modified by: sunyongjian
 * @Last Modified time: 2018-05-16 12:26:30
 */
const router = require('koa-router')();
const example = require('./example');
// const project = require('./project');
const config = require('../config');

router.get('/', async(ctx) => {
  await ctx.render('index', {
    title: 'koa-server',
    static: config.static
  });
});

router.use('/example', example);

// 需要创建数据库使用的
// router.use('/project', project);

module.exports = router;
