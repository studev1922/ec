import { sql, utils, schema } from '../src/map.js';
import AbstractDAO, { db } from '../src/@db/AbstractDAO.js'

db.all('PRAGMA foreign_key_check;', console.log)
Object.keys(schema.tables).forEach(table =>
    db.get(`PRAGMA foreign_key_list(${table});`, console.log)
)
