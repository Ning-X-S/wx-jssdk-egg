'use strict';
const ErrorList = require('../config/error-list.js');


class RequestFailure extends Error {
  constructor(option = {}) {
    const errorConst = option.type ? getErrorConst(option.type) : {};
    const { message, response = {}, status, code } = Object.assign(errorConst, option);
    super(message);
    this.message = message || '请求失败';
    this.status = status || 200;
    this.code = code || 4190000;
    // 返回数据使用
    this.response = response;
  }
}

function getErrorConst(text) {
  if (ErrorList[text]) {
    return ErrorList[text];
  }
  return {};
}

module.exports = RequestFailure;
