import sqlite3 from 'sqlite3';
import schema from '../../private/schema.js';
import log, { style } from '../utils/log.js';

const db = new sqlite3.Database(schema.db);

((tableNames = []) => {
    log('SHOW DATA FROM DATABASE', style.fg.yellow)
    tableNames.forEach(tb => {
        let sql = `SELECT * FROM ${tb}`;
        log(sql, style.fg.cyan, style.tp.bright);
        db.each(sql, (err, row) => err ? console.error(err) : console.dir(row));
    });
    log('SHOW DATA FINISHED', style.fg.yellow)
})(Object.keys(schema.tables));