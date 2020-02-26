/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    // security: {
    //   csrf: {
    //     enable: false,
    //   },
    // },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582093578289_2519';

  // add your middleware config here
  config.middleware = [ 'cors', 'errorHandler' ];

  // 有新的业务直接加就可以了。
  config.appInfo = {
    cheshi: {
      appId: 'wx033a73f979725887',
      secret: 'f873adb43ba7afb539986fee9d2c481e',
    },
    xiaozhuo: {
      appId: '',
      secret: '',
    },
  };

  // local
  config.redis = {
    client: {
      port: 6379,
      host: '',
      db: 0,
      password: '',
      stringNumbers: true,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
