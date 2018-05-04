class BaseError extends Error {
  constructor(msg, code) {
    super(msg, code);
    this.errmsg = msg;
    this.errno = code;
  }
}
/**
 * 参数校验错误，一般是前端提交的数据格式有问题。
 */
class ValidatedError extends Error {
  constructor(msg, code) {
    super(msg, code);
    this.errmsg = msg || '校验失效';
    this.errno = code || 10010;
  }
}

/**
 * 数据库操作错误。
 */
class DbError extends BaseError {
  constructor(msg, code) {
    super(msg, code);
    this.errmsg = msg || '数据库操作错误';
    this.errno = code || 20010;
  }
}


module.exports = {
  ValidatedError,
  DbError,
};
