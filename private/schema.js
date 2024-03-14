export default {
    db: 'private/fruit_database.db',
    keyTable: {
        users: 'uid',
        categories: 'cg_id',
        products: 'prd_id',
    },
    tables: {
        users: {
            uid: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            name: 'TEXT NOT NULL',
            username: 'TEXT NOT NULL',
            password: 'TEXT NOT NULL'
        },
        categories: {
            cg_id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            cg_name: 'TEXT UNIQUE',
            cg_create_at: "INTEGER DEFAULT (strftime('%s', CURRENT_TIMESTAMP))"
        },
        products: {
            prd_id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            prd_name: 'TEXT',
            prd_salary: 'REAL',
            prd_create_at: "INTEGER DEFAULT (strftime('%s', CURRENT_TIMESTAMP))",
            cg_pr_id: 'INTEGER REFERENCES CATEGORIES(cg_id) ON UPDATE CASCADE ON DELETE RESTRICT',
        }
    }
}