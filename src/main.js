import dotenv from "dotenv";
import express from 'express';

import { domains } from './map.js';
// configuration
import configuration from './config/configuration.js';
// control
import controller from './control/controller.js';

// VARIABLES
const properties = dotenv.config().parsed;
const app = express();
const port = properties.PORT || 8080;

configuration(app); // authentication, assets static
controller(app, ['/images/product']); // controller

app.listen(port, () => { // START SERVER
    console.log('--++++++++++++++++++++++ PORT URL ++++++++++++++++++++++--');
    for (const domain of domains)
        if (domain) {
            console.log('\t------------------------------------');
            // console.log(`- Client ${domain}/index.html`);
            console.log(`- RESTapi on ${domain}`);
        }
});
