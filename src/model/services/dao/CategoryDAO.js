import AbstractDAO from "./AbstractDAO.js";
import schema from "../../../../private/schema.js";

const table = 'categories'
export default class CategoryDAO extends AbstractDAO {
    constructor() {
        super(table.toUpperCase(), Object.keys(schema.tables[table]), schema.keyTable[table])
    }
}