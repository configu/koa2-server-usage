const models = require('../sequelize');
const { DbError } = require('../../common/error');

/**
 * 二阶函数
 * @param {function} condition 
 * 条件函数，返回值为 true 的则 copy 到 data 里。
 * 
 * @param {object} source
 * 数据源对象
 * 
 * 主要是对 source 源的数据做过滤，比如无效的 query 参数，在 db 中是不存在的字段，以及值为空的，过滤掉。
 */
const filterSource = (condition = () => {}) => (source) => {
  const data = {};
  for (const key in source) {
    if (source[key] && condition(key)) {
      data[key] = source[key];
    }
  }
  return data;
};


const create = (model, attributes = []) =>
  async (params) => {
    const conditionFunc = (key) => attributes.includes(key);
    const data = filterSource(conditionFunc)(params);
    const result = await models[model].create({
      ...data
    });
    return result;
  };

/**
 * 
 * @param {String} model
 * model 的名称
 * @param {Array} attributes 
 * 支持 where 查询的 attribute
 */
const findAll = (model, attributes = []) =>
  async (params) => {
    const { pageSize = 5, page = 1 } = params;
    const conditionFunc = (key) => attributes.includes(key); 
    const where = filterSource(conditionFunc)(params);

    const data = await models[model].findAll({
      where,
      offset: (page - 1) * pageSize,
      limit: pageSize
    });
    return data;
  };


const updateRow = (model, attributes = []) =>
  async (params) => {
    const { id } = params;
    const conditionFunc = (key) => attributes.includes(key);
    const data = filterSource(conditionFunc)(params);
    const result = await models[model].findById(id);
    if(!result) {
      throw new DbError(model + 'id 不存在');
    }
    return await result.update({...data});
  };

module.exports = {
  filterSource,
  create,
  findAll,
  updateRow,
};
