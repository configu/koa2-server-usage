const projectModel = require('../db/models/project');

class Project {
  /**
   * 获取项目
   * @api {GET} /project 获取项目
   * @apiParam (path参数) {String} id 项目id
   * @apiParam (path参数) {String} name 项目英文名
   * @apiParam (path参数) {String} title 项目中文名
   * @apiParam (path参数) {String} status
   * @apiGroup Project
   */
  async index(ctx, next) {
    const query = ctx.query;
    const data = await projectModel.findAll({
      ...query
    });
    ctx.body = { data: data };
    next();
  }

  /**
   * 创建项目
   * @api {POST} /project 创建项目
   * @apiDescription
   * @apiName
   * @apiParam (body参数) {String} name 项目英文名
   * @apiParam (body参数) {String} title 项目中文名
   * @apiParam (body参数) {String} remark 项目备注
   * @apiGroup Project
   */
  async create(ctx, next) {
    const { body = {} } = ctx.request;
    const { name, remark, title } = body;
    const rules = {
      name: 'required|alpha_num',
      remark: 'string',
      title: 'string'
    };
    const customName = {
      name: '项目名',
      remark: '备注',
      title: '中文项目名',
    };

    const validatedRes = new ctx.sCommon.Validator({
      data: { name, remark, title },
      rules,
      customName,
    });
    validatedRes.myCheck();

    const result = await projectModel.findOne({ name });
    if (result) {// 项目名 name 唯一校验
      throw new ctx.sCommon.ValidatedError('项目名已存在');
    }
    const data = await projectModel.create({
      name,
      remark,
      title,
    });
    ctx.body = { data: data };
    next();
  }

  /**
   * 更新项目
   * @api {PUT} /project/:id 更新项目
   * @apiParam (path参数) {String} id 项目id
   * @apiParam (path参数) {String} name 项目英文名
   * @apiParam (path参数) {String} title 项目中文名
   * @apiGroup Project
   */
  async update(ctx, next) {
    const { body = {} } = ctx.request;
    const { id } = ctx.params;
    const { title = '', remark = '' } = body;

    if (!remark && !title) {
      throw new ctx.sCommon.ValidatedError('缺少参数');
    }
    const rules = {
      id: 'required|integer',
      remark: 'string',
      title: 'string',
    };

    const customName = {
      id: '项目 ID',
      remark: '备注',
      title: '中文项目名',
    };

    const validatedRes = new ctx.sCommon.Validator({
      data: { id, remark, title },
      rules,
      customName,
    });
    validatedRes.myCheck();

    const data = await projectModel.update({
      ...body,
      id,
    });
    ctx.body = { data: data };
    next();
  }
}

module.exports = new Project();
