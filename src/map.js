import dotenv from "dotenv";
import sql from './@db/sql-helper.js';

// project
import schema from '../private/schema.js';
import utils from './utils/index.js';
import * as fileHelper from './model/services/fileHelper.js';

// VARIABLES
const properties = dotenv.config().parsed;
const path = properties.PATH || 'api';
const origins = JSON.parse(properties.ORIGINS || '["http://localhost:8080", "http://localhost:5500"]');
const domains = JSON.parse(properties.DOMAINS || '["localhost"]');

export {
    path,
    domains,
    origins,
    utils,
    sql,
    schema,
    fileHelper
}

