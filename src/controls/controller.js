import { fileHelperAPIs } from '../model/services/fileHelper.js';
import express from 'express';
import dao, { AbstractDAO } from '../model/services/dao.js'

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
 * @param {Array<String>} actionFields 
 */
function router(application, dao, path, actionFields) {
    application.use(express.json());
    application
        .get(path, (req, res) => response(dao.select_all(req.query['f'] || req.body['fields'], req.body['by']), res))
        .post(path, (req, res) => {
            let { body } = req;
            let fields = req.query['fields'] || actionFields;
            return response(dao.insert(body, fields), res);
        })
        .put(path, (req, res) => {
            let { body } = req;
            let fields = req.query['fields'] || actionFields;
            return response(dao.update(body, fields), res);
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
export default function (application, path) {

    // FILE APIs CONTROLLER
    const pathFolders = ['/images/user', '/images/category', '/images/product'];
    fileHelperAPIs(application, path, ...pathFolders);


    // Rounters
    const another_paths = [], APIs = {
        categories: ['cg_name', 'cg_create_at'],
        products: ['prd_name', 'prd_salary', 'cg_pr_id'],
        users: ['name', 'username', 'password']
    }
    Object.keys(APIs).forEach(key => {
        another_paths.push(`/api/${key}`);
        router(application, dao[key], `/api/${key}`, APIs[key])
    })

    // another paths when not found!
    application.use('*', (req, res) =>
        res.status(404).json({
            another_paths,
            message: `'${req.url}' not found!`,
        })
    );

};
