/*
 * @Author: sunyongjian 
 * @Date: 2018-04-27 19:14:30 
 * @Last Modified by:   sunyongjian 
 * @Last Modified time: 2018-04-27 19:14:30 
 * 
 * 暂时没用
 */
const mysql = require('mysql');
const option = require('../config').mysql;

const connection = mysql.createPool(option);

const query = (sql, values) => {

  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });

};

const findAllConfig = () => {
  const sql = 'select * from uconfig;';
  return query(sql);
};
module.exports = {
  findAllConfig
};
