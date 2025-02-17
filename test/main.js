import { sql, utils, schema } from '../src/map.js';
import AbstractDAO, { db } from '../src/@db/AbstractDAO.js'
const prd = 'PRODUCTS', cg = 'CATEGORIES'

// db.all('PRAGMA foreign_key_check;', console.log)
// Object.keys(schema.tables).forEach(table =>
//     db.get(`PRAGMA foreign_key_list(${table});`, console.log)
// )

// db.exec(sql.qDelete(cg, { cg_id: 2 }))
// db.all(sql.qSelect(prd, '*', { pr_cg_id: [2] }), console.log)
// db.all(sql.qSelect(cg, '*', { cg_id: 2 }), console.log)

db.exec(`DROP TABLE IF EXISTS cha; DROP TABLE IF EXISTS con;`, console.log)

db.exec('PRAGMA foreign_keys = ON;')
db.run(`CREATE TABLE cha (
    id INTEGER PRIMARY KEY,
    ten TEXT
);`)

db.run(`
    CREATE TABLE con (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cha INTEGER,
    ten TEXT,
    FOREIGN KEY (id_cha) REFERENCES cha(id) ON DELETE CASCADE
);`)
await utils.promise(_ => 0,1e3)
db.exec(`INSERT INTO cha(ten) VALUES ('Nguyễn Văn A'), ('Trần Thị B'); INSERT INTO con(id_cha, ten) VALUES (1, 'Con của A 1'),(1, 'Con của A 2'),(2, 'Con của B 1');`)
db.exec(`DELETE FROM cha WHERE id = 1;`, console.log)
db.each('SELECT * FROM cha', console.log)
db.each('SELECT * FROM con', console.log)