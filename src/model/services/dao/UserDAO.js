import AbstractDAO from "./AbstractDAO.js";
import schema from "../../../../private/schema.js";

const table = 'users'
export default class UserDAO extends AbstractDAO {
    constructor() {
        super(table.toUpperCase(), Object.keys(schema.tables[table]), schema.keyTable[table])
    }
}