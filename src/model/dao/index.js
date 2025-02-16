import categories from './CategoryDAO.js';
import products from './ProductDAO.js';

export default { categories, products }

// import { schema, sql, utils } from "../../map.js";
// import AbstractDAO from "../../@db/AbstractDAO.js";
// const dao = {};

// for (const table of Object.keys(schema.keyTable)) {
//     await utils.promise(_ => {
//         dao[table] = new AbstractDAO(
//             table.toUpperCase(),
//             Object.keys(schema.tables[table]),
//             schema.keyTable[table])
//     }).then(_ => utils.log.default(`${table}DAO CREATED.`, utils.log.style.fg.yellow))
// }
// export default dao;
