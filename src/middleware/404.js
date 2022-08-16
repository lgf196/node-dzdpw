const ErrorResponse = require('../utils/errorResponse');
const { statusCode } = require('../utils');

const noFindRouter = (req, res, next) => {
  var err = new ErrorResponse('错误的路由', statusCode.noRouter);
  next(err); //必须加，否则后面的中间件不能执行，终止了
};
module.exports = noFindRouter;
