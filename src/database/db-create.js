import fs from 'fs';
import sqlite3 from 'sqlite3';
import schema from '../../private/schema.js';
import log, { style } from '../utils/log.js';
import sqlhelper from '../model/db/sql-helper.js';

fs.existsSync(schema.db) ? (
    fs.unlinkSync(schema.db),
    log(`DELETE file "${schema.db}"`, style.fg.red)
) : log(`${schema.db} already exist!`, style.fg.yellow);
const db = new sqlite3.Database(schema.db);

// CREATE DATABASE
((tableNames = []) => {
    if (!tableNames.length) return;
    
    log('CREATING ALL TABLES...', style.fg.yellow);
    tableNames.forEach(tableName => {
        let sql, fields = Object.entries(schema.tables[tableName]).map(([key, value]) => `${key} ${value}`);
        log(sql = sqlhelper.create.table(tableName.toUpperCase(), fields), '\n', style.fg.blue);
        db.exec(sql, err => err ? console.error(err) : undefined);
    });
    log('TABLES HAVE BEEN CREATED.', style.fg.yellow);
})(Object.keys(schema.tables));
