import { utils, schema } from '../index.js';
import { db } from './AbstractDAO.js';
const log = utils.log.default;
const t = utils.log.style;

; ((tableNames = []) => {
    log('SHOW DATA FROM DATABASE', t.fg.yellow)
    tableNames.forEach(tb => {
        let sql = `SELECT * FROM ${tb}`;
        log(sql, t.fg.cyan, t.tp.bright);
        db.each(sql, (err, row) => err ? console.error(err) : console.dir(row));
    });
})(Object.keys(schema.tables));