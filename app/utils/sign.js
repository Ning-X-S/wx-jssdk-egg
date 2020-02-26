'use strict';
const _utils = require('./util');
const jsSHA = require('jssha');

function sign(jsapi_ticket, url) {
  /**
  * @synopsis 签名算法
  *
  * @param jsapi_ticket 用于签名的 jsapi_ticket
  * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
  *
  * @returns
  */
  const ret = {
    jsapi_ticket,
    nonceStr: _utils.createNonceStr(),
    timestamp: _utils.createTimestamp(),
    url,
  };
  const string = _utils.raw(ret);
  const shaObj = new jsSHA(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');
  return ret;
}

module.exports = sign;
