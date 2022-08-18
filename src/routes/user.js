const { getUserList, add, delte, update, find } = require('../controller/user');
const User_login = require('../models/login');
const { Router } = require('express');
const { getRouteParm } = require('../utils');
const router = Router();
router.get('/getUserList', getUserList);
router.get('/add', (req, res, next) =>
  add(
    {
      req,
      res,
      next,
    },
    {
      model: User_login,
    },
  ),
);
router.get('/delte', delte);
router.get('/update', update);
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
