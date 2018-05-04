
module.exports = async (ctx, next) => {
  const { body } = ctx;
  if (body && body.data) {
    body.errmsg = 'ok';
    body.errno = 0;
  }
  await next();
};
