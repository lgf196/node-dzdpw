const interceptor = require('../middleware/interceptor');
const ResponseInterceptor = require('../middleware/response.interceptor');
const express = require('express');
const {
    addInsert,
    delteInsert,
    updateInsert,
    idsQueryInsert,
    findAllInsert,
    findAllTableInsert
} = require('../controller/model');
const route = express();
const router = express.Router();
router.post('/add/:tableName', interceptor, addInsert);
router.post('/delte/:tableName', interceptor, delteInsert);
router.post('/update/:tableName', interceptor, updateInsert);
router.post('/findByIds/:tableName', interceptor, idsQueryInsert);
router.post('/findAll/:tableName', interceptor, findAllInsert);
router.post('/findAllTableInsert', findAllTableInsert);
route.use('/common', router, ResponseInterceptor);
module.exports = route;
