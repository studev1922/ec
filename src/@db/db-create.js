import sqlHelper from './sql-helper.js';
import { utils, schema } from '../map.js';
import { db } from './AbstractDAO.js';
const log = utils.log.default;
const t = utils.log.style;


// CREATE TABLES
; ((tableNames = []) => {
    if (!tableNames.length) return;
    log('DROP TABLES...', t.fg.yellow);
    [...tableNames].reverse().forEach(table => {
        let sql = `DROP TABLE ${table.toUpperCase()}`; log(sql, t.fg.blue)
        db.exec(sql, err => err ? console.error(err) : undefined);
    });

    db.get('PRAGMA foreign_keys = ON;')
    log('CREATING ALL TABLES...', t.fg.yellow);
    tableNames.forEach(tableName => {
        let sql, fields = Object.entries(schema.tables[tableName]).map(([key, value]) => `${key} ${value}`);
        log(sql = sqlHelper.create.table(tableName.toUpperCase(), fields), '\n', t.fg.blue);
        db.exec(sql, err => err ? console.error(err) : undefined);
    });
    log('TABLES HAVE BEEN CREATED.', t.fg.yellow);
})(Object.keys(schema.tables));
