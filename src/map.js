import dotenv from "dotenv";

// project
import sql from './@db/sql-helper.js';
import schema from '../private/schema.js';
import utils from './utils/index.js';
import jsonToken from './model/services/jsonToken.js';
import * as fileHelper from './model/services/fileHelper.js';

// VARIABLES
const properties = dotenv.config().parsed;
const path = properties.PATH || 'api';
const allowOrigins = JSON.parse(properties.ALLOW_ORIGINS || '["http://localhost:8080", "http://localhost:5500"]');
const domains = JSON.parse(properties.DOMAINS || '["http://localhost:8080"]');

export {
    path,
    domains,
    allowOrigins,
    utils,
    sql,
    schema,
    fileHelper,
    jsonToken
}

