import express from 'express';
import { path, domains, services, utils, schema } from '../map.js';
import dao from '../model/dao/index.js';

const { fileHelperAPIs } = services.fileHelper;
const log = utils.log.default;
const t = utils.log.style;


/**
 * 
 * @param {Promise} _pr 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
async function response(_pr, res) {
    await _pr.then(rows => res.status(200).json(rows))
        .catch(err => res.status(500).json(err));
    return res;
}

/**
 * @param {String} path 
 */
function router(app, dao, path) {
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

    app.get(path, (req, res) => response(dao.select_all(req.query['f'] || req.body['fields'], req.body['by']), res));
    app.post(path, (req, res) => {
        let { body } = req;
        let fields = req.query['f'] || req.query['fields'] || Object.keys(body);
        let returning = req.query['r'] || req.query['returning'];
        return response(dao.insert(body, fields, returning), res);
    });
    app.put(path, (req, res) => {
        let { body } = req;
        let fields = req.query['f'] || req.query['fields'] || Object.keys(body);
        let returning = req.query['r'] || req.query['returning'];
        return response(dao.update(body, fields, returning), res);
    });
    app.delete(path, (req, res) => {
        let { body, query } = req, isAbsolute = query['isAbsolute'];
        isAbsolute = typeof isAbsolute == 'undefined' ? undefined : /true/.test(isAbsolute);
        return response(dao.delete(body, isAbsolute), res);
    });
}

export default function (app, pathFolders = []) {

    // FILE APIs CONTROLLER
    fileHelperAPIs(app, path, ...pathFolders);

    app.use((_req, res, next) => {
        domains.forEach(domain => res.setHeader("Access-Control-Allow-Origin", domain))
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTION");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        _req.headers.origin
            ? log(`${_req.headers.origin} : ${_req.url}`, t.fg.yellow)
            : log(_req.url, t.fg.cyan);
        next();
    });

    // Rounters
    const another_paths = [];

    Object.keys(schema.keyTable).forEach(key => {
        another_paths.push(`/api/${key}`);
        router(app, dao[key], `/api/${key}`)
    })

    // another paths when not found!
    app.use('*', (req, res) =>
        res.status(404).json({
            another_paths,
            message: `'${req.url}' not found!`,
        })
    );

};
