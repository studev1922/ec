import dotenv from "dotenv";
import sql from './@db/sql-helper.js';

// project
import schema from '../private/schema.js';
// utils
import utils from './utils/index.js';
// services
import services from './model/services/index.js';

// VARIABLES
const properties = dotenv.config().parsed;
const path = properties.PATH || 'api';
const domains = ['localhost'];

export {
    path,
    domains,
    utils,
    sql,
    schema,
    services
}

