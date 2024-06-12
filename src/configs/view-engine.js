import fs from 'fs'
import dotenv from 'dotenv'
import express from "express";

const properties = dotenv.config().parsed;
const { STATIC_FOLDER } = properties;

export default function viewEngine(app) {
    if (!fs.existsSync(STATIC_FOLDER)) fs.mkdirSync(STATIC_FOLDER, { recursive: true });
    app.use(express.static(STATIC_FOLDER));
    app.use(express.static('client'));
};