

class Example {
  /**
   * 示例接口
   * @api {GET} /example 示例接口
   * @apiParam (path参数) {String} anyName 任意key'
   * @apiSuccessExample
   * {
   *   error: 0,
   *   errmsg: '',
   *   data: {
   *      query: {},
   *   }
   * }
   * @apiGroup Example
   */
  async index(ctx, next) {
    ctx.body = { data: {
      query: ctx.query,
    } };
    next();
  }
}

module.exports = new Example();
