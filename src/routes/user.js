const { getUserList, add, delte, update, find } = require('../controller/user');
const { Router } = require('express');
const router = Router();
router.get('/getUserList', getUserList);
router.get('/add', add);
router.get('/delte', delte);
router.get('/update', update);
router.get('/find', find);
module.exports = router;
