const { responseData, statusCode, asynchronous } = require('../utils');
const { db } = require('../config');
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
