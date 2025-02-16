import dotenv from "dotenv";
import express from 'express';

import { origins } from './map.js';
// configuration
import viewEngine from './config/view-engine.js';
// control
import controller from './control/controller.js';

// VARIABLES
const properties = dotenv.config().parsed;
const app = express();
const port = properties.PORT || 8080;

viewEngine(app); // configuration
controller(app, ['/images/product']); // controller

app.listen(port, () => { // START SERVER
    console.log('--++++++++++++++++++++++ PORT URL ++++++++++++++++++++++--');
    for (const domain of origins)
        if (domain) {
            console.log('\t------------------------------------');
            // console.log(`- Client ${domain}/index.html`);
            console.log(`- RESTapi on ${domain}`);
        }
});
