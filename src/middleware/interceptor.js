const interceptor = (req, res, next) => {
  const tableName = req.params.tableName;
  if (!tableName) {
    next({ statusCode: 400, message: '错误的路由' });
  } else {
    next();
  }
};
module.exports = interceptor;
