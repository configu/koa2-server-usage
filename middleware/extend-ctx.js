const { ValidatedError, DbError } = require('../common/error');
const Validator = require('../common/validator');

module.exports = async (ctx, next) => {
  ctx.sCommon = {// 存放一些 class，或者 common 信息
    // error class
    DbError,
    ValidatedError,

    // validatorjs class
    Validator,
  };
  ctx.sUtils = {// 存放一些公共方法

  };
  await next();
};
