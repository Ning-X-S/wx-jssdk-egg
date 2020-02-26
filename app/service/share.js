'use strict';

const Service = require('egg').Service;

const request = require('../utils/request');
const RequestFailure = require('../utils/request-failure');
const sign = require('../utils/sign');

class ShareService extends Service {
  async share() {
    const { ctx } = this;
    // const source = ctx.query.source;
    const { url, source } = ctx.query;
    console.time('start');
    let shareAccesstokenKey = await this.app.redis.get(source + 'ShareAccesstokenKey');
    console.timeEnd('start');
    if (!shareAccesstokenKey) {
      const res = await request({
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        data: {
          grant_type: 'client_credential',
          appid: this.config.appInfo[source].appId,
          secret: this.config.appInfo[source].secret,
        },
      });
      if (res.access_token) {
        console.time('start');
        await this.app.redis.set(source + 'ShareAccesstokenKey', res.access_token, 'EX', 7000);
        console.timeEnd('start');
        shareAccesstokenKey = res.access_token;
      } else {
        throw new RequestFailure({ type: 'GET_ACCESS_TOKEN_FAIL', message: '' });
      }
    }
    console.log('------------------');
    console.log(shareAccesstokenKey);
    console.log(url);
    const data = await request({
      url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
      data: {
        access_token: shareAccesstokenKey,
        type: 'jsapi',
      },
    });
    if (data.errcode !== 0) {
      throw new RequestFailure({ code: data.errcode, message: data.errmsg });
    }
    // console.log(ctx.originalUrl);
    const response = sign(data.ticket, url);
    response.appId = this.config.appInfo[source].appId;
    return response;
  }
}

module.exports = ShareService;
