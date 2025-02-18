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
            // prd_image_path: "TEXT",
            prd_name: 'TEXT',
            prd_price: 'NUMERIC(10, 2)',
            prd_registered: "INTEGER DEFAULT (strftime('%s', CURRENT_TIMESTAMP))",
            pr_cg_id: 'INTEGER, FOREIGN KEY (pr_cg_id) REFERENCES categories(cg_id) ON UPDATE CASCADE ON DELETE RESTRICT',
        },
        product_images: {
            prd_image_path: 'TEXT NOT NULL, UNIQUE(img_pr_id, prd_image_path)',
            img_pr_id: 'INTEGER, FOREIGN KEY (pr_id) REFERENCES products(cg_id) ON UPDATE CASCADE ON DELETE CASCADE',
        }
    }
}
