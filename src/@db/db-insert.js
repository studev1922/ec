import data from '../../private/data.js';
import sqlHelper from './sql-helper.js';
import { utils, schema } from '../index.js';
import { db } from './AbstractDAO.js';
const log = utils.log.default;
const t = utils.log.style;

const RESET_DATA = true;

// INSERT DATA
; ((tableNames = []) => {
    if (RESET_DATA) {
        log('DELETE ALL DATA FROM TABLES...', t.fg.yellow);
        tableNames.forEach(tableName => {
            let sql = `DELETE FROM ${tableName}`;
            log(sql, '\n', t.fg.blue);
            db.exec(sql);
        })
        log('DELETION COMPLATE.', t.fg.yellow);
    }

    log('DATA INSERTING INTO TABLE...', t.fg.yellow);
    tableNames.forEach(tableName => {
        let sql = sqlHelper.qInsert(tableName.toUpperCase(), data[tableName], '*', undefined);
        log(sql, '\n', t.fg.blue);
        db.all(sql, (err, rows) => err ? log(err.message, t.fg.red) : console.log(rows));
    });
    log('DATA HAVE BEEN INSERTED INTO TABLE.', t.fg.yellow);
})(Object.keys(schema.tables));
