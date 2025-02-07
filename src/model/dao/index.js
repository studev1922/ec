import { schema, utils } from "../../map.js";
import AbstractDAO from "../../@db/AbstractDAO.js";

// class CategoryDAO extends AbstractDAO { }
// class ProductDAO extends AbstractDAO { }

const dao = {};

for (const table of Object.keys(schema.keyTable)) {
    await utils.promise(_ => {
        dao[table] = new AbstractDAO(
            table.toUpperCase(),
            Object.keys(schema.tables[table]),
            schema.keyTable[table])
    }).then(_ => utils.log.default(`${table}DAO CREATED.`, utils.log.style.fg.yellow))
}

export default dao