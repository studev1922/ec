import AbstractDAO from "./AbstractDAO.js";
import schema from "../../../../private/schema.js";
import sql from "../../db/sql-helper.js";
import log, { style } from '../../../utils/log.js';
import dao from '../dao.js';

const table = 'users';
export default class UserDAO extends AbstractDAO {
    #PRD = 'products'
    #AUTH = 'authorities'
    // Array.isArray(this.keyID) ? keyID.reduce((acc, key) => ({ ...acc, [key]: -1 }), {}) : { [keyID]: -1 }

    constructor() {
        super(table.toUpperCase(), Object.keys(schema.tables[table]), schema.keyTable[table])
    }

    async select_all(fields, by) {
        let prd, auth;
        fields?.forEach((v, i) => v === this.#PRD ? (prd = i) : (v === this.#AUTH ? (auth = i) : 0));
        // if (prd > -1) {
        //     prd = fields[prd];
        //     fields.splice(prd, 1);
        // }
        if (auth > -1) {
            auth = fields[auth];
            fields.splice(auth, 1);
        }
        auth = 'authorities'

        return super.select_all(fields, by)
            .then(data => Promise.all(
                data.map(async obj => {
                    // if (prd) obj[this.#PRD] = await dao.products.select_all('r_id', { u_id: obj[schema.keyTable.users] })
                    if (auth) obj[this.#AUTH] = (
                        await dao.authorities.select_by_uid(
                            obj[schema.keyTable.users], 'r_id'
                        )
                    ).map(e => e['r_id'])
                    return obj;
                })
            ))
            .catch(err => {
                console.log(err);
                throw new Error(err);
            })
    }
}