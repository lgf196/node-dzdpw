const { getUserList, addMore } = require('../controller/user');
const interceptor = require('../middleware/interceptor');
const { Router } = require('express');
const { getRouteParm } = require('../utils');
const {
  addInsert,
  delteInsert,
  updateInsert,
  idsQueryInsert,
  findAllInsert,
} = require('../controller/model');
const router = Router();

router.get('/getUserList', getUserList);
router.post('/add/moreList', addMore);
router.post('/add/:tableName', interceptor, addInsert);
router.post('/delte/:tableName', interceptor, delteInsert);
router.post('/update/:tableName', interceptor, updateInsert);
router.post('/find/:tableName', interceptor, idsQueryInsert);
router.post('/findAll/:tableName', interceptor, findAllInsert);
module.exports = router;
