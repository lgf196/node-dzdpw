const { statusCode, responseData } = require('../utils');
const { logger } = require('../utils/logger');
const errorHandler = (error, req, res, next) => {
    const originalUrl = req.originalUrl;
    if (error.statusCode && error.statusCode === statusCode.noRouter) {
        // console.log('路由错误');
        logger.error(originalUrl + '==>' + '路由错误');
    } else {
        logger.error('服务器错误===>' + originalUrl + '==>' + error.message);
        // console.log('服务器错误===>', error.message);
    }
    res.status(200).json(responseData(statusCode.serverError, null, error.message ? error.message : 'Server Error'));
};

module.exports = errorHandler;
