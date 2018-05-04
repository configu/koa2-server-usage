/*
 * @Author: sunyongjian 
 * @Date: 2018-04-24 18:35:21 
 * @Last Modified by: sunyongjian
 * @Last Modified time: 2018-04-27 19:14:47
 * 
 * 暂时没用
 */
const mongoose = require('mongoose');
const url = require('../config').mongodb.url;

const db = mongoose.connection;

module.exports = () => {
  mongoose.connect(url);

  db.on('error', function (error) {
    console.log('数据库连接失败：' + error);
  });

  db.on('open', function () {
    console.log('数据库连接成功');
  });
};


