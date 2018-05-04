/*
 * @Author: sunyongjian 
 * @Date: 2018-04-24 18:35:18 
 * @Last Modified by: sunyongjian
 * @Last Modified time: 2018-04-24 20:30:39
 */
const redis = require('redis');

const config = require('../config').redis;

const client = redis.createClient(config);


client.on('connect', function () {
  console.log('redis connect success');
});


client.on('error', function (err) {
  console.error(err);
});

client.on('ready', function () {
  console.log('ready');
});

module.exports = client;