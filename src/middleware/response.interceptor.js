const { statusCode, responseData } = require('../utils');

const ResponseInterceptor = (req, res, next) => {
    const interceptor = req.responseData;
    if (interceptor.code === statusCode.success) {
        res.status(200).json(interceptor);
    } else {
        next(req.responseData)
    }
};
module.exports = ResponseInterceptor;
