import { schema, sql, utils } from "../../map.js";
import AbstractDAO from "../../@db/AbstractDAO.js";

class dao extends AbstractDAO {
    #NAME = 'products';
    constructor() {
        super(this.#NAME.toUpperCase(), schema.tables[this.#NAME], schema.keyTable[this.#NAME])
    }
}

export default new dao()