const interceptor = require('../middleware/interceptor');
const express = require('express');
const {
  addInsert,
  delteInsert,
  updateInsert,
  idsQueryInsert,
  findAllInsert,
} = require('../controller/model');
const route = express();
const router = express.Router();
router.post('/add/:tableName', interceptor, addInsert);
router.post('/delte/:tableName', interceptor, delteInsert);
router.post('/update/:tableName', interceptor, updateInsert);
router.post('/findByIds/:tableName', interceptor, idsQueryInsert);
router.post('/findAll/:tableName', interceptor, findAllInsert);
route.use('/common', router);
module.exports = route;
