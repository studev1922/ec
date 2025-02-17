
import { utils, schema } from '../map.js';
import sqlHelper from './sql-helper.js';
import { db } from './AbstractDAO.js';

const log = utils.log.default;
const t = utils.log.style;
// CREATE TABLES
; ((tableNames = []) => {
    if (!tableNames.length) return;
    log('DROP TABLES...', t.fg.yellow);
    [...tableNames].reverse().forEach(table => {
        let query = `DROP TABLE IF EXISTS ${table.toUpperCase()}`;
        log(query, t.fg.blue)
        db.exec(query, err => err ? console.error(err) : undefined);
    });

    log('CREATING ALL TABLES...', t.fg.yellow);
    tableNames.forEach(tableName => {
        let query, fields = Object.entries(schema.tables[tableName]).map(([key, value]) => `${key} ${value}`);
        query = sqlHelper.create.table(tableName.toUpperCase(), fields);
        log(query, t.fg.blue);
        db.run(query, err => err ? console.error(err) : undefined);
    });
    log('TABLES HAVE BEEN CREATED.', t.fg.yellow);

})(Object.keys(schema.tables));
