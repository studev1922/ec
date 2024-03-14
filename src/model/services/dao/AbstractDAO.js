import db from "../../db/database.js";
import sql from "../../db/sql-helper.js";
import log, { style } from '../../../utils/log.js';

export default class AbstractDAO {

    constructor(table, fields, keyID) {
        this.table = table;
        this.fields = fields;
        this.keyID = keyID || fields[0];
    }

    #_pr = (query, isReturns) => {
        log(query, style.fg.magenta);
        return new Promise(
            (res, rej) => db[isReturns ? 'all' : 'exec']
                (query, (err, rows) => err
                    ? rej({ message: err.message, ...err })
                    : rows ? res(rows) : res()
                )
        );
    }

    select_all(fields) {
        let query = sql.qSelect(this.table, fields || this.fields);
        return this.#_pr(query, true);
    }

    insert(data, fields, returns = '*') {
        let query = sql.qInsert(
            this.table,
            data,
            fields || this.fields,
            returns
        );
        return this.#_pr(query, returns);
    }

    update(data, fields, returns = '*') {
        let query = sql.qUpdate(
            this.table,
            data,
            this.keyID,
            fields || this.fields,
            returns
        )
        return this.#_pr(query);
    }

    delete(obj = { [this.keyID]: -1 }, isAbsolute) {
        let query = sql.qDelete(this.table, obj, isAbsolute);
        return this.#_pr(query, false);
    }
}
