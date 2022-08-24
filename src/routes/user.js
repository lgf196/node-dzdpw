const { getUserList, add, delte, update, find } = require('../controller/user');
const User_login = require('../models/login');
const { Router } = require('express');
const { getRouteParm } = require('../utils');
const { addInsert, delteInsert, updateInsert } = require('../controller/model');
const router = Router();
router.get('/getUserList', getUserList);
router.post('/add', addInsert);
router.post('/delte', delteInsert);
router.post('/update', updateInsert);
router.post('/find', (req, res, next) =>
  find(
    {
      req,
      res,
      next,
    },
    {
      model: User_login,
      options: {
        where: {
          id: getRouteParm(req).id,
        },
      },
    },
  ),
);
module.exports = router;
