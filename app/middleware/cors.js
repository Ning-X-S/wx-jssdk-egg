'use strict';
const cors = require('koa2-cors');

module.exports = () => {
  return cors({
    origin: ctx => ctx.header.origin || '*',
    credentials: true,
    allowMethods: [ 'GET', 'POST', 'DELETE', 'PUT' ],
    allowHeaders: [ 'Content-Type', 'Authorization', 'Accept' ],
  });
};
