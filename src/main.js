import os from 'os';
import dotenv from "dotenv";
import express from 'express';

// configuration
import viewEngine from './config/view-engine.js';
// control
import controller from './control/controller.js';

// VARIABLES
const properties = dotenv.config().parsed;
const app = express();
const port = properties.PORT || 8080;

const ipHost = properties.HOST || 'localhost';
const idHost2 = os.networkInterfaces()['Wi-Fi'];
const [hostDesk, IPv4] = [
    os.hostname(),
    idHost2 ? idHost2[1]?.address : undefined
];
const domains = [ipHost, IPv4, hostDesk]
for (let i = 0; i < domains.length; i++) if (domains[i]) domains[i] = `http://${domains[i]}:${port}`;

viewEngine(app); // configuration
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
