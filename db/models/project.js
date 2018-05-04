const models = require('../sequelize');
const utils = require('./common');

const findOne = async (params) => {
  const where = utils.filterSource((key) => ['name', 'id'].includes(key))(params);
  return await models.project.findOne({
    where,
  });
};

const findAll = utils.findAll('project', [
  'id',
  'name',
  'title',
  'status',
]);

const create = utils.create('project', [
  'name',
  'title',
  'remark',
]);

const update = utils.updateRow('project', [
  'title',
  'remark',
]);

const updateOther = utils.updateRow('project', [
  'fid',
  'pid',
]);

module.exports = {
  findOne,
  findAll,
  create,
  update,
  updateOther,
};
