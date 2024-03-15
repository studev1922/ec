import db from "../../db/database.js";
import sql from "../../db/sql-helper.js";

import AbstractDAO from "./AbstractDAO.js";
import schema from "../../../../private/schema.js";

const table = 'authorities' // AUTHORITIES
export default class AuthDAO extends AbstractDAO {
    constructor() {
        super(table.toUpperCase(), Object.keys(schema.tables[table]), schema.keyTable[table])
    }

    select_by_uid(uid, fields) {
        return super.select_all(fields, { u_id: uid })
    }

    select_by_rid(rid, fields) {
        return super.select_all(fields, { r_id: rid })
    }
}