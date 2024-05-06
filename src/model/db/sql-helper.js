const actions = {
    insert: 'INSERT',
    update: 'UPDATE',
    delete: 'DELETE',
    after: 'AFTER', before: 'BEFORE'
}

const _execValue = (value) => typeof value === 'string' ? `'${value}'` : value;
const _fields = (fields) => fields ? `(${fields})` : '';
const _byFields = (obj, fields) => fields.reduce((pre, cur) => {
    if (obj.hasOwnProperty(cur)) pre[cur] = obj[cur];
    return pre;
}, {});
const _conditions = (obj = { id: -1 }, isAbsolute) => {
    let condition = [], withCond = isAbsolute ? ' AND ' : ' OR ';

    for (const by of Object.keys(obj)) {
        let v = obj[by];
        v = Array.isArray(v)
            ? `${by} IN (${v.map(_execValue)})`
            : typeof v === 'string' && (v.startsWith('%') || v.endsWith('%'))
                ? `${by} LIKE ${_execValue(v)}`
                : `${by} = ${_execValue(v)}`;

        condition.push(v);
    }

    return condition.join(withCond);
}

const create = {
    /**
     * @param {String} table_name named table
     * @param  {...any} fields in the table
     * @returns the query create table
     */
    table: (table_name, ...fields) => `CREATE TABLE ${table_name} (${fields.join(',')});`,
    tableDropOnExist: (table_name, ...fields) => `DROP TABLE IF EXISTS ${table_name};\n${create.table(table_name, ...fields)}`,
    tableIfNotExist: (table_name, ...fields) => create.table(`IF NOT EXISTS ${table_name}`, ...fields),
    /**
     * 
     * @param {String} trigger_name name of trigger
     * @param {Boolean} isAfter is AFTER or BEFORE
     * @param {String | Array<String>} actions 'INSERT', 'UPDATE', 'DELETE'
     * @param {String} on_table acctions on name of table
     * @param {String} trigger_body
     * @returns {String} new query generated.
     */
    trigger: (trigger_name, isAfter, actions = ['INSERT'], on_table, trigger_body = '') => `CREATE TRIGGER ${trigger_name} ${isAfter ? 'AFTER' : 'BEFORE'} ${Array.isArray(actions) ? actions.join(' OR ') : actions} ON ${on_table} FOR EACH ROW BEGIN ${trigger_body} END;`,
    triggerDropOnExist: (trigger_name, isAfter, actions = ['INSERT'], on_table, trigger_body = '') => `DROP TRIGGER IF EXISTS ${table_name};\n${create.trigger(trigger_name, isAfter, actions, on_table, trigger_body)}`,
    triggerIfNotExist: (trigger_name, isAfter, actions = ['INSERT'], on_table, trigger_body = '') => `DROP TRIGGER IF EXISTS ${table_name};\n${create.trigger(trigger_name, isAfter, actions, on_table, trigger_body)}`,
}

const qSelect = (table, fields = '*', by, isAbsolute) => `SELECT ${fields} FROM ${table} ${by ? 'WHERE ' + _conditions(by, isAbsolute) : ''}`;

const qInsert = (table, data, fields, returning) => {
    returning = typeof returning === 'undefined' ? '' : !returning ? ' RETURNING *' : ` RETURNING ${returning}`;
    let isArray = Array.isArray(data);

    if (fields === '*') fields = Object.keys(isArray ? data[0] : data);
    else if (typeof fields === 'string' && fields.length) fields = fields.split(',');

    let _orReturning = (values) => returning ? values : values.join('),(');
    let constraint = _fields(fields);
    let rows = fields
        ? (isArray
            ? _orReturning(data.map(e => Object.values(_byFields(e, fields)).map(_execValue)))
            : Object.values(_byFields(data, fields)).map(_execValue)
        )
        : (isArray
            ? _orReturning(data.map(e => Object.values(e).map(_execValue)))
            : Object.values(data).map(_execValue)
        );

    let _once = (row) => `INSERT INTO ${table}${constraint} VALUES (${row})${returning};`
    return returning
        ? isArray
            ? rows.map(_once)
            : _once(rows)
        : _once(rows);
}

const qUpdate = (table, data, by, fields, returning) => {
    returning = typeof returning === 'undefined' ? '' : !returning ? ' RETURNING *' : ` RETURNING ${returning}`;
    let isArray = Array.isArray(data);
    let _set = (obj) => fields.map(f => typeof obj[f] === 'undefined' ? null : `${f}=${_execValue(obj[f])}`).filter(e => e);
    let _updateOne = (obj) => `UPDATE ${table} SET ${_set(obj)} WHERE ${by}=${obj[by]} ${returning};`

    if (!fields || fields === '*') fields = Object.keys(isArray ? data[0] : data);
    else if (typeof fields === 'string') fields = fields.split(',');

    return isArray ? data.map(_updateOne) : _updateOne(data);
}
const qDelete = (table, obj = { id: -1 }, isAbsolute = true) => `DELETE FROM ${table} WHERE ${_conditions(obj, isAbsolute)}`;

export default {
    actions, create,
    qSelect, qInsert, qUpdate, qDelete
};
