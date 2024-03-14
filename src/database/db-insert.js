import sqlite3 from 'sqlite3';
import schema from '../../private/schema.js';
import log, { style } from '../utils/log.js';
import sqlhelper from '../model/db/sql-helper.js';
import data from '../../private/test-data.js';

const db = new sqlite3.Database(schema.db);
const RESET_DATA = true;

// INSERT DATA
((tableNames = []) => {
    if (RESET_DATA) {
        log('DELETE ALL DATA FROM TABLES...', style.fg.yellow);
        tableNames.forEach(tableName => {
            let sql = `DELETE FROM ${tableName}`;
            log(sql, '\n', style.fg.blue);
            db.exec(sql);
        })
        log('DELETION COMPLATE.', style.fg.yellow);
    }

    log('DATA INSERTING INTO TABLE...', style.fg.yellow);
    tableNames.forEach(tableName => {
        let sql = sqlhelper.qInsert(tableName.toUpperCase(), data[tableName], '*', undefined);
        log(sql, '\n', style.fg.blue);
        db.all(sql, (err, rows) => err ? log(err.message, style.fg.red) : console.log(rows));
    });
    log('DATA HAVE BEEN INSERTED INTO TABLE.', style.fg.yellow);
})(Object.keys(schema.tables));
