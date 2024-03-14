import AbstractDAO from "./AbstractDAO.js";
import schema from "../../../../private/schema.js";

const table = 'products'
export default class ProductDAO extends AbstractDAO {
    constructor() {
        super(table.toUpperCase(), Object.keys(schema.tables[table]), schema.keyTable[table])
    }
}