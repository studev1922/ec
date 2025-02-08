import fs from 'fs'
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import { origins } from '../map.js';

const properties = dotenv.config().parsed;
const { STATIC_FOLDER } = properties;

export default function viewEngine(app) {
    if (!fs.existsSync(STATIC_FOLDER)) fs.mkdirSync(STATIC_FOLDER, { recursive: true });
    app.use(express.static(STATIC_FOLDER));
    app.use(express.static('client'));

    app.use(cors({
        origin: (origin, callback) => !origin || origins.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
    }));
};