'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      //   ctx.service.rpc.sentryService.capture(err);
      ctx.logger.info('err:', err);
      const { message = '请求出错', status, code = 4190000, response = {} } = err;
      ctx.status = status || 400;

      ctx.body = {
        error_code: code,
        message,
        data: response,
      };
    }
  };
};
