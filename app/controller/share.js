'use strict';
const Controller = require('egg').Controller;

class ShareController extends Controller {
  async index() {
    const { ctx } = this;
    const response = await this.service.share.share();
    ctx.body = {
      error_code: 0,
      data: response || {},
      message: '获取信息成功',
    };
  }
}

module.exports = ShareController;
