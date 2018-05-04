/*
 * @Author: sunyongjian 
 * @Date: 2018-04-24 18:35:42 
 * @Last Modified by:   sunyongjian 
 * @Last Modified time: 2018-04-24 18:35:42 
 */

const development = require('./dev.config');
const production = require('./pro.config');
const test = {};

const common = {};
const env = process.env.NODE_ENV || 'development';

const collections = {
  development: Object.assign({}, development, common),
  test: Object.assign({}, test, common),
  production: Object.assign({}, production, common)
};


module.exports = collections[env];