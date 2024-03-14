export default {
    db: 'private/fruit_database.db',
    keyTable: {
        users: 'uid',
        roles: 'rid',
        authorities: ['u_id', 'r_id'],
        categories: 'cgid',
        products: 'prdid',
    },
    tables: {
        users: {
            uid: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            name: 'TEXT NOT NULL',
            username: 'TEXT NOT NULL',
            password: 'TEXT NOT NULL'
        },
        roles: {
            rid: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            r_name: 'TEXT NOT NULL',
        },
        authorities: {
            u_id: 'INTEGER REFERENCES USERS(uid) ON UPDATE CASCADE ON DELETE CASCADE',
            r_id: 'INTEGER REFERENCES ROLES(rid) ON UPDATE CASCADE ON DELETE RESTRICT, UNIQUE(u_id, r_id)'
        },
        categories: {
            cgid: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            cg_name: 'TEXT UNIQUE',
            cg_create_at: "INTEGER DEFAULT (strftime('%s', CURRENT_TIMESTAMP))"
        },
        products: {
            prdid: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            prd_name: 'TEXT',
            prd_salary: 'REAL',
            prd_create_at: "INTEGER DEFAULT (strftime('%s', CURRENT_TIMESTAMP))",
            cg_pr_id: 'INTEGER REFERENCES CATEGORIES(cgid) ON UPDATE CASCADE ON DELETE RESTRICT',
        }
    }
}