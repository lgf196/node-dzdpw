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
exports.responseData = (code, data = null, mes) => {
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

/**
 * @description 处理接收post/get路由参数
 */
exports.getRouteParm = (req) => {
    let par = {};
    if (req.method === 'GET') {
        par = req.query;
    }
    if (req.method === 'POST') {
        par = req.body;
    }
    return par;
};

/**
 * @description 判断json对象是否为空
 */
exports.isJsonNull = (obj) => {
    if (!Object.keys(obj).length) {
        return true;
    }
    return false;
};
/**
 * @description 判断一个值是否是数组
 * @param {*} obj 要检查的值
 */
exports.isArray = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor === Array;
};
/**
 * @description 判断一个值是否是对象
 * @param {*} obj 要检查的值
 */
exports.isObject = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor === Object;
};
/**
 * @description 处理await/async的错误
 * @param {Promise} promise promise对象
 */
exports.awaitWrap = (promise) => {
    return promise.then((res) => [null, res]).catch((err) => [err, null]);
};

/**
 * @description 将搜索字段对象转为对应的sql语句
 */
exports.convertSql = (values) => {
    let sql = '',
        or = ' OR ';
    const keyArr = Object.keys(values) || [];
    const value = Object.values(values) || [];
    keyArr.forEach((item, index) => {
        sql += `${item}=?${keyArr.length - 1 !== index ? or : ''}`;
    });
    return {
        sql,
        value,
    };
};
/**
 * @description 得到环境变量
 */
exports.getEnv = () => {
    return process.env.APP_ENV
};
