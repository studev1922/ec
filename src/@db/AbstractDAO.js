import sqlite3 from 'sqlite3';
import sqlHelper from './sql-helper.js';
import { utils, schema } from '../map.js';

const log = utils.log.default;
const t = utils.log.style;
const sql = sqlHelper;
const db = new sqlite3.Database(schema.db); // CREATE DATABASE

export { db }
export default class AbstractDAO {

    _CALL = {
        exec: 'exec',
        get: 'get',
        all: 'all',
        each: 'each'
    }

    constructor(table, fields, keyID) {
        this.table = table;
        this.fields = fields;
        this.keyID = keyID || fields[0];
    }

    _pr = (query, call) => {
        let isArray = Array.isArray(query);
        let _one = (qr) => new Promise(
            (res, rej) => db[call || 'exec']
                (qr, (err, rows) => err
                    ? rej({ message: err.message, ...err })
                    : rows ? res(rows) : res()
                )
        );

        log(isArray ? query.join('\n') : query, t.fg.magenta);
        return isArray
            ? Promise.all(query.map(_one))
            : _one(query)
    }

    select_all(fields, by) {
        let query = sql.qSelect(this.table, fields || this.fields, by);
        return this._pr(query, this._CALL.all);
    }

    insert(data, fields, returns = '*') {
        let query = sql.qInsert(
            this.table,
            data,
            fields || this.fields,
            returns
        );
        return this._pr(query, this._CALL[returns ? 'each' : 'exec']);
    }

    update(data, fields, returns = '*') {
        let query = sql.qUpdate(
            this.table,
            data,
            this.keyID,
            fields || this.fields,
            returns
        )
        return this._pr(query, this._CALL[returns ? 'each' : 'exec']);
    }

    delete(obj = sql._toKey(this.keyID), isAbsolute) {
        let query = sql.qDelete(this.table, obj, isAbsolute);
        return this._pr(query, 'exec');
    }
}