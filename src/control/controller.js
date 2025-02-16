import express from 'express';
import { path, fileHelper, schema } from '../map.js';
import dao from '../model/dao/index.js';

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
        return response(dao.(body, isAbsolute), res);
    });
}

export default function (app, pathFolders = []) {

    // FILE APIs CONTROLLER
    fileHelper.fileHelperAPIs(app, path, ...pathFolders);

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
