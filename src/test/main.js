import sql from "../model/db/sql-helper.js";
import db from "../model/db/database.js";
import log, { style } from '../utils/log.js';

const { qSelect, qInsert, qUpdate, qDelete } = sql;
const data1 = { cg_id: 1, cg_name: 'Khác', cg_create_at: 1709996608 }
const data2 = [
    { cg_id: 2, cg_name: 'Táo', cg_create_at: 1709996608 },
    { cg_id: 3, cg_name: 'Trái Lê', cg_create_at: 1709996608 },
    { cg_id: 4, cg_name: 'Nho', cg_create_at: 1709996608 }
];

let table = 'CATEGORIES'

db.all(qSelect(table), console.log);