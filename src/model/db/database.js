import sqlite3 from 'sqlite3';
// import sqlHelper from './sql-helper.js';
import schema from "../../../private/schema.js";

const db = new sqlite3.Database(schema.db);

export default db;