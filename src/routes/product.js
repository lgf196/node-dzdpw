const { getUserList } = require('../controller/user');
const { Router } = require('express');
const router = Router();
router.post('/productList', getUserList);
module.exports = router;
