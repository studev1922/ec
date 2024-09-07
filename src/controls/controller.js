import { fileHelperAPIs } from '../model/services/fileHelper.js';
import express from 'express';
import dao, { AbstractDAO } from '../model/services/dao.js'
import log, { style as t } from '../utils/log.js';

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
 * @param {AbstractDAO} dao 
 * @param {String} path 
 */
function router(application, dao, path) {
    application.use(express.json({ limit: '10mb' }));
    application.use(express.urlencoded({ limit: '10mb', extended: true }));

    application
        .get(path, (req, res) => response(dao.select_all(req.query['f'] || req.body['fields'], req.body['by']), res))
        .post(path, (req, res) => {
            let { body } = req;
            let fields = req.query['f'] || req.query['fields'] || Object.keys(body);
            let returning = req.query['r'] || req.query['returning'];
            return response(dao.insert(body, fields, returning), res);
        })
        .put(path, (req, res) => {
            let { body } = req;
            let fields = req.query['f'] || req.query['fields'] || Object.keys(body);
            let returning = req.query['r'] || req.query['returning'];
            return response(dao.update(body, fields, returning), res);
        })
        .delete(path, (req, res) => {
            let { body, query } = req, isAbsolute = query['isAbsolute'];
            isAbsolute = typeof isAbsolute == 'undefined' ? undefined : /true/.test(isAbsolute);
            return response(dao.delete(body, isAbsolute), res);
        })
}

/**
 * 
 * @param {express.Express} application 
 * @param {String} path 
 */
export default function (application, path, domains = ['localhost']) {

    // FILE APIs CONTROLLER
    const pathFolders = ['/images/user', '/images/category', '/images/product'];
    fileHelperAPIs(application, path, ...pathFolders);

    application.use((_req, res, next) => {
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
    ['categories', 'products', 'users'].forEach(key => {
        another_paths.push(`/api/${key}`);
        router(application, dao[key], `/api/${key}`)
    })

    // another paths when not found!
    application.use('*', (req, res) =>
        res.status(404).json({
            another_paths,
            message: `'${req.url}' not found!`,
        })
    );

};
