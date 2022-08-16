/**
 * @author lgf
 * @description 全局状态码
 */
exports.statusCode = {
  fail: 1, // 失败
  success: 0, // 成功
  serverError: -1, // 服务端错误
  noRouter: 404, //路劲找不到
};

/**
 * @author lgf
 * @description 返回数据模型
 * @param {statusCode} code 状态码
 * @param {Any} data 返回值
 * @param {String} mes 描述
 * @returns {Object} {code, data, mes}
 */
exports.responseData = (code, data, mes) => {
  return {
    code,
    data,
    mes: mes || 'success',
  };
};

/**
 * @description 返回一个异步的数据
 * @param {any} data
 */
exports.asynchronous = (data) => {
  return Promise.resolve(data);
};
