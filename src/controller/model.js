const { sequelize } = require('../config/orm.js');
const {
  responseData,
  statusCode,
  isArray,
  getRouteParm,
  isJsonNull,
  isObject,
  awaitWrap,
} = require('../utils');
const queryInterface = sequelize.getQueryInterface();

const add = async (tableName, records = []) => {
  if (!tableName || !records.length) {
    return false;
  }
  let [err, res] = await awaitWrap(queryInterface.bulkInsert(tableName, records));
  return !err ? true : false;
};

const addInsert = async (req, res, next) => {
  const parm = getRouteParm(req);
  const { coding, para } = parm;
  if (!coding) {
    next({ statusCode: 400, message: 'coding字段不能为空！' });
    return;
  }
  if (!isArray(para)) {
    next({ statusCode: 400, message: 'para传入的格式不对！' });
    return;
  }
  let result = await add(coding, para);
  if (result) {
    res.status(200).json(responseData(statusCode.success));
  }
};

const delte = async (tableName, whereOptions = {}) => {
  if (!tableName || !isObject(whereOptions)) {
    return false;
  }
  let [err, res] = await awaitWrap(queryInterface.bulkDelete(tableName, whereOptions));
  return !err ? true : false;
};

const delteInsert = async (req, res, next) => {
  const parm = getRouteParm(req);
  const { coding, where } = parm;
  if (!coding) {
    next({ statusCode: 400, message: 'coding字段不能为空！' });
    return;
  }
  if (!isObject(where)) {
    next({ statusCode: 400, message: 'where传入的格式不对！' });
    return;
  }
  let result = await delte(coding, where);
  if (result) {
    res.status(200).json(responseData(statusCode.success));
  }
};

const update = async (tableName, valuses = {}, whereOptions = {}) => {
  if (!tableName || !isObject(valuses) || !isObject(whereOptions)) {
    return false;
  }
  let [err, res] = await awaitWrap(queryInterface.bulkUpdate(tableName, valuses, whereOptions));
  return !err ? true : false;
};

const updateInsert = async (req, res, next) => {
  const parm = getRouteParm(req);
  const { coding, para, where } = parm;
  if (!coding) {
    next({ statusCode: 400, message: 'coding字段不能为空！' });
    return;
  }
  if (!isObject(para)) {
    next({ statusCode: 400, message: 'para传入的格式不对！' });
    return;
  }
  if (!isObject(where)) {
    next({ statusCode: 400, message: 'where传入的格式不对！' });
    return;
  }
  let result = await update(coding, para, where);
  if (result) {
    res.status(200).json(responseData(statusCode.success));
  }
};

const find = () => {
  //  sequelize
  //   .query(`SELECT * FROM  user_login WHERE id =${parm.id} OR name like '%${parm.name}%'`)
  //   .then((result) => {
  //     const [results, metadata] = result;
  //     res.status(200).json(responseData(statusCode.success, metadata));
  //   });
};

module.exports = {
  add,
  addInsert,
  delte,
  delteInsert,
  updateInsert,
  update,
};
