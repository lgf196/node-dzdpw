const { responseData, statusCode, asynchronous, getRouteParm, isJsonNull } = require('../utils');
const { db } = require('../config');
const { sequelize } = require('../config/orm.js');
const { add } = require('../controller/model');
const User_login = require('../models/login');
const queryInterface = sequelize.getQueryInterface();
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

exports.addMore = async (req, res, next) => {
  const arr = [];
  for (let index = 0; index < 800; index++) {
    arr.push({ name: index, title: index });
  }
  if (arr.length) {
    let result = await add('user_login', arr);
    res.status(200).json(responseData(statusCode.success, null));
  }
};

/*exports.find = async ({ req, res, next }, { model, values, options }) => {
  const parm = getRouteParm(req);
  // model.findAll(options).then((list) => {
  //   res.status(200).json(responseData(statusCode.success, list));
  // });

  queryInterface
    .bulkInsert('user_login', [
      {
        name: '武汉',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ])
    .then(() => {
      res.status(200).json(responseData(statusCode.success));
    });

  // sequelize.queryInterface.bulkInsert(
  //   'user_login',
  //   [
  //     {
  //       id: 13,
  //       name: '我爱你',
  //       // createdAt: new Date(),
  //       // updatedAt: new Date(),
  //     },
  //   ],
  //   {
  //     updateOnDuplicate: ['name'],
  //   },
  // );

  // sequelize.queryInterface.bulkDelete('user_login', {
  //   id: [7, 8],
  // });

  // sequelize.queryInterface.bulkUpdate(
  //   'user_login',
  //   {
  //     name: 'user111',
  //   },
  //   {
  //     id: 13,
  //   },
  // );

  // sequelize
  //   .query(`SELECT * FROM  user_login WHERE id =${parm.id} OR name like '%${parm.name}%'`)
  //   .then((result) => {
  //     const [results, metadata] = result;
  //     res.status(200).json(responseData(statusCode.success, metadata));
  //   });
  // res.status(200).json(responseData(statusCode.success, metadata));

  // sequelize.query(`SELECT * FROM  user_login`).then((result) => {
  //   const [results, metadata] = result;
  //   res.status(200).json(responseData(statusCode.success, metadata));
  // });
};
exports.add = async ({ req, res, next }, { model, values, options }) => {
  const parm = getRouteParm(req);
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
  if (isJsonNull(parm)) {
    next({ statusCode: 400, message: '接收字段不能为空！' });
  } else {
    model.create(parm, options).then((list) => {
      res.status(200).json(responseData(statusCode.success, null));
    });
  }
};
exports.delte = async ({ req, res, next }, { model, values, options }) => {
  model.destroy(options).then((list) => {
    res.status(200).json(responseData(statusCode.success, null));
  });
  // User_login.destroy({
  //   where: {
  //     id: 4,
  //   },
  // }).then(() => {
  //   res.status(200).json(responseData(statusCode.success, null));
  // });
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
};*/
