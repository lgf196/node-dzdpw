const { sequelize } = require('../config/orm.js');
const { QueryTypes } = require('sequelize');
const {
    responseData,
    statusCode,
    isArray,
    getRouteParm,
    isObject,
    awaitWrap,
    isJsonNull,
    convertSql,
} = require('../utils');
const PaginationModel = require('../config/pagination');
const queryInterface = sequelize.getQueryInterface();

/**
 *
 * @param {String} tableName 表名
 * @param {Array} records 要插入表的数据
 */
const add = async(tableName, records = []) => {
    if (!tableName || !records.length) {
        return false;
    }
    let [err, res] = await awaitWrap(queryInterface.bulkInsert(tableName, records));
    return !err ? true : false;
};

const addInsert = async(req, res, next) => {
    const tableName = req.params.tableName;
    const { para } = getRouteParm(req);
    if (!isArray(para)) {
        next({ statusCode: 400, message: 'para传入的格式不对！' });
        return;
    }
    let result = await add(tableName, para);
    if (result) {
        res.status(200).json(responseData(statusCode.success));
    } else {
        next({ statusCode: 400, message: '操作失败！' });
    }
};

/**
 *
 * @param {String} tableName 表名
 * @param {Object} whereOptions 要删除那条数据的条件
 */
const delte = async(tableName, whereOptions = {}) => {
    if (!tableName || !isObject(whereOptions)) {
        return false;
    }
    let [err, res] = await awaitWrap(queryInterface.bulkDelete(tableName, whereOptions));
    return !err ? true : false;
};

const delteInsert = async(req, res, next) => {
    const tableName = req.params.tableName;
    const { where } = getRouteParm(req);
    if (!isObject(where)) {
        next({ statusCode: 400, message: 'where传入的格式不对！' });
        return;
    }
    let result = await delte(tableName, where);
    if (result) {
        res.status(200).json(responseData(statusCode.success));
    } else {
        next({ statusCode: 400, message: '操作失败！' });
    }
};
/**
 *
 * @param {String} tableName 表名
 * @param {Object} valuses 要更新的数据
 * @param {Object} whereOptions 要更新那条数据的条件
 */
const update = async(tableName, valuses = {}, whereOptions = {}) => {
    if (!tableName || !isObject(valuses) || !isObject(whereOptions)) {
        return false;
    }
    let [err, res] = await awaitWrap(queryInterface.bulkUpdate(tableName, valuses, whereOptions));
    return !err ? true : false;
};

const updateInsert = async(req, res, next) => {
    const tableName = req.params.tableName;
    const { para, where } = getRouteParm(req);
    if (!isObject(para)) {
        next({ statusCode: 400, message: 'para传入的格式不对！' });
    }
    if (!isObject(where)) {
        next({ statusCode: 400, message: 'where传入的格式不对！' });
    }
    let result = await update(tableName, para, where);
    if (result) {
        req.responseData = responseData(statusCode.success);
        next();
    } else {
        next({ statusCode: 400, message: '操作失败！' });
    }
};

/**
 *  更具id查询数据
 * @param {String} tableName 表名
 * @param {Array<number>} ids 数据id
 */
const idsQuery = async(tableName, ids = []) => {
    if (!tableName || !ids.length) {
        return [];
    }
    const [err, res] = await awaitWrap(
        sequelize.query(`SELECT * FROM  ${tableName} WHERE id IN(?)`, {
            // in表示多个id
            replacements: [ids], // 这里面的值就是?里面的值，一一对应
            type: QueryTypes.SELECT,
        }),
    );
    return !err ? res : [];
};

const idsQueryInsert = async(req, res, next) => {
    const tableName = req.params.tableName;
    const { ids } = getRouteParm(req);
    if (!isArray(ids)) {
        next({ statusCode: 400, message: 'ids传入的格式不对！' });
        return;
    }
    let result = await idsQuery(tableName, ids);
    res.status(200).json(responseData(statusCode.success, result));
};

/**
 *
 * @param {String} tableName 表名
 * @param {Object} pagination 分页模型
 * @param {Object} values 要查询的字段
 */
const findAll = async(tableName, pagination = {}, values = {}) => {
    let findSql = '',
        pageSql = '',
        replacements = [];
    if (!tableName) {
        return [];
    }
    if (!isJsonNull(values)) {
        const { sql, value } = convertSql(values);
        replacements = value;
        findSql = `WHERE (${sql})`;
    }
    if (!isJsonNull(pagination)) {
        const pager = PaginationModel.pagination(pagination);
        pageSql = `order by id desc limit ${(pager.page - 1) * pager.size},${pager.size}`;
    }
    const [err, res] = await awaitWrap(
        sequelize.query(`SELECT * FROM  ${tableName} ${findSql} ${pageSql}`, {
            type: QueryTypes.SELECT,
            replacements,
        }),
    );
    const [countErr, count] = await awaitWrap(
        sequelize.query(`SELECT COUNT(*) FROM  ${tableName} ${findSql}`, {
            type: QueryTypes.SELECT,
            replacements,
        }),
    );
    return {
        rows: !err ? res : [],
        total: !countErr ? count : [],
    };
};

const findAllInsert = async(req, res, next) => {
    const tableName = req.params.tableName;
    // pager:分页参数 search:搜索条件 isPager:是否分页
    let { pager = {}, search = {}, isPager = false } = getRouteParm(req);
    if (isPager) {
        pager = PaginationModel.pagination(pager);
    }
    let { rows, total } = await findAll(tableName, pager, search);
    if (isPager || !isJsonNull(pager)) {
        // res.status(200).json(
        //     responseData(
        //         statusCode.success,
        //         PaginationModel.pagination({
        //             ...pager,
        //             rows,
        //             total: total.length ? total[0]['COUNT(*)'] : 0,
        //         }),
        //     ),
        // );
        req.responseData = responseData(
            statusCode.success,
            PaginationModel.pagination({
                ...pager,
                rows,
                total: total.length ? total[0]['COUNT(*)'] : 0,
            }),
        )
    } else {
        req.responseData = responseData(statusCode.success, rows);
        // res.status(200).json(responseData(statusCode.success, rows));
    }
    next()
};

const findAllTableInsert = async(req, res, next) => {
    const [err, result] = await awaitWrap(
        sequelize.query(`select table_name,table_comment from information_schema.tables where table_schema='dzdpw'`, {
            type: QueryTypes.SELECT,
        }),
    );
    res.status(200).json(responseData(statusCode.success, result));
    console.log('first', result);
}

module.exports = {
    add,
    addInsert,
    delte,
    delteInsert,
    updateInsert,
    update,
    idsQuery,
    idsQueryInsert,
    findAll,
    findAllInsert,
    findAllTableInsert
};
