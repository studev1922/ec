import { schema, sql, utils } from "../../map.js";
import AbstractDAO from "../../@db/AbstractDAO.js";

const NAME = 'products';
class dao extends AbstractDAO {
    constructor() {
        super(NAME.toUpperCase(), schema.tables[NAME], schema.keyTable[NAME])
    }
}

export default new dao()