
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mysql = require('../config').mysql;

const client = new Sequelize(mysql.database, mysql.user, mysql.password, mysql.options);
const models = {};


fs
  .readdirSync(__dirname + '/schemas')
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'common.js');
  })
  .forEach(function (file) {
    const model = client.import(path.join(__dirname + '/schemas', file));
    models[model.name] = model;
  });

Object.keys(models).forEach(function (modelName) {
  if (models[modelName].options.hasOwnProperty('associate')) {
    models[modelName].options.associate(models);
  }
});

models.client = client;

module.exports = models;