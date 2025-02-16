import fs from 'fs'
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import { origins, jsonToken } from '../map.js';

const properties = dotenv.config().parsed;
const { STATIC_FOLDER } = properties;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader)
        try {
            jsonToken.verify(authHeader.split(' ')[1])
            req.user = user; // Save user to request
            next();
        } catch (err) {
            return res.status(403).json(err);
        }
    else res.status(401).json({ message: 'invalid authentication credentials.', path: origins[0] + '/api/login' })
};

/**
 * 
 * @param {express.Express} app 
 */
export default function viewEngine(app) {
    if (!fs.existsSync(STATIC_FOLDER)) fs.mkdirSync(STATIC_FOLDER, { recursive: true });
    app.use(express.static(STATIC_FOLDER)); // PUBLIC FOLDER
    app.use(express.static('client'));

    app.use(cors({
        origin: (origin, callback) => !origin || origins.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
    }));

    // app.use('/api', (req, res, next) => {
    //     req.method == 'GET' ? next() : authenticateJWT(req, res, next)
    // });
};