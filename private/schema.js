export default {
    db: 'private/DATABASE.db',
    keyTable: {
        categories: 'cg_id',
        products: 'pr_id',
    },
    tables: {
        categories: {
            cg_id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            cg_name: 'TEXT UNIQUE'
        },
        products: {
            pr_id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            image: "TEXT",
            prd_name: 'TEXT',
            prd_salary: 'REAL',
            prd_registered: "INTEGER DEFAULT (strftime('%s', CURRENT_TIMESTAMP))",
            cg_pr_id: 'INTEGER REFERENCES CATEGORIES(cgid) ON UPDATE CASCADE ON DELETE RESTRICT',
        }
    }
}
