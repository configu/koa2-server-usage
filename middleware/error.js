const { ValidatedError, DbError } = require('../common/error');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const { errmsg, errno, status = 500 } = err;
    
    if (err instanceof ValidatedError || err instanceof DbError) {
      ctx.status = 200;
      ctx.body = {
        errmsg,
        errno,
      };
      return;
    }
    ctx.status = status;
    if (status === 500) {
      ctx.body = {
        errmsg: err.message,
        errno: 90001,
      };
      ctx.app.emit('error', err, ctx);
    }
  }
};
