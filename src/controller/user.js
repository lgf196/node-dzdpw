const { responseData, statusCode, asynchronous, getRouteParm } = require('../utils');
const { db } = require('../config');
const User_login = require('../models/login');
const { ModelOption } = require('../controller/model');
const modelOption = new ModelOption(User_login);
exports.getUserList = async (req, res, next) => {
  console.log('res', req.query, req.body);
  console.log('数据库信息====>>', db());
  const list = [
    {
      id: 1,
      name: 'lgf',
      avatar: 'https://cdn.gudsen.vip/2022/07/12/052b529c490740a781ffa59a60e590ff.jpg',
    },
    {
      id: 2,
      name: '木子李',
      avatar: 'https://cdn.gudsen.vip/2022/07/12/052b529c490740a781ffa59a60e590ff.jpg',
    },
  ];
  res.status(200).json(responseData(statusCode.success, await asynchronous(list)));
};
exports.find = async ({ req, res, next }, { model, values, options }) => {
  model.findAll(options).then((list) => {
    res.status(200).json(responseData(statusCode.success, list));
  });
};
exports.add = async ({ req, res, next }, { model, values, options }) => {
  // User_login.create({
  //   name: 'lgf',
  //   title: Math.random() * 100,
  //   des: 'dedededed',
  // }).then(() => {
  //   res.status(200).json(responseData(statusCode.success, null));
  // });
  // modelOption.add(
  //   {
  //     name: 'lgf',
  //     title: Math.random() * 100,
  //     des: 'dedededed',
  //   },
  //   (list) => {
  //     res.status(200).json(responseData(statusCode.success, null));
  //   },
  // );
  if (!getRouteParm(req)) {
    console.log('11111', 11111);
    res.status(200).json(responseData(statusCode.fail, null, '接收字段不能为空！'));
    return;
  }
  console.log('3333', 3333);
  model.create(getRouteParm(req), options).then((list) => {
    res.status(200).json(responseData(statusCode.success, null));
  });
};
exports.delte = async (req, res, next) => {
  User_login.destroy({
    where: {
      id: 4,
    },
  }).then(() => {
    res.status(200).json(responseData(statusCode.success, null));
  });
};
exports.update = async (req, res, next) => {
  User_login.update(
    {
      name: '木子李',
    },
    {
      where: {
        id: 5,
      },
    },
  ).then(() => {
    res.status(200).json(responseData(statusCode.success, null));
  });
};
