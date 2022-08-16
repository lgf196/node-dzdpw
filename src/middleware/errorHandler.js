const { statusCode, responseData } = require('../utils');

const errorHandler = (error, req, res, next) => {
  if (error.statusCode && error.statusCode === statusCode.noRouter) {
    console.log('路由错误');
  } else {
    console.log('服务器错误===>', error.message);
  }

  res.status(200).json(responseData(statusCode.serverError, null, error.message ?? 'Server Error'));
};

module.exports = errorHandler;
