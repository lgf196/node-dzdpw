const APP_ENV = {
  dev: 'dev',
  alpha: 'alpha',
  prod: 'prod',
};
/**
 * @description 服务器端口
 */
exports.servePort = 3000;

/**
 * @description 环境变量
 */
exports.APP_ENV = APP_ENV;

/**
 *
 * @description 更具不同环境下，返回不同的数据库信息
 */
exports.db = () => {
  const dbInfo = (user, password, server, database) => {
    return {
      user,
      password,
      server,
      database,
    };
  };
  const env = process.env.APP_ENV;
  if (env === APP_ENV.dev) {
    return dbInfo('sa', 'demo123456', '19.168.1.1', 'dev');
  } else if (env === APP_ENV.alpha) {
    return dbInfo('sa', 'demo123456', '19.168.1.1', 'alpha');
  } else if (env === APP_ENV.prod) {
    return dbInfo('sa', 'demo123456', '19.168.1.1', 'prod');
  } else {
    return dbInfo('sa', 'demo123456', '19.168.1.1', 'dev');
  }
};
