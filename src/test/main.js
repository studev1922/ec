import sql from "../model/db/sql-helper.js";
import db from "../model/db/database.js";
import log, { style } from '../utils/log.js';

const { qSelect, qInsert, qUpdate, qDelete } = sql;
const data1 = { cgid: 1, cg_name: 'Khác', cg_create_at: 1709996608 }
const data2 = [
    { cgid: 2, cg_name: 'Táo', cg_create_at: 1709996608 },
    { cgid: 3, cg_name: 'Trái Lê', cg_create_at: 1709996608 },
    { cgid: 4, cg_name: 'Nho', cg_create_at: 1709996608 }
];

let keyID = ['id_1', 'id_2']

db.each('DELETE FROM CATEGORIES WHERE cgid > 7', (e, r) => {
    console.log(e, r);
})


