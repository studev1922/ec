import os from 'os'
import dotenv from "dotenv";
import express from 'express';
import viewEngine from './configs/view-engine.js';
import controller from './controls/controller.js';

// VARIABLES
const properties = dotenv.config().parsed;
const application = express();
const ipHost = properties.HOST || 'localhost';
const idHost2 = os.networkInterfaces()['Wi-Fi'];
const port = properties.PORT || 8080;
const path = properties.PATH || 'api';
const [hostDesk, IPv4] = [
    os.hostname(),
    idHost2 ? idHost2[1]?.address : undefined
];
const domains = [ipHost, IPv4, hostDesk]
for (let i = 0; i < domains.length; i++) if (domains[i]) domains[i] = `http://${domains[i]}:${port}`;

viewEngine(application); // configuration
controller(application, path, domains); // controller

// START SERVER
application.listen(port, () => {
    console.log('--++++++++++++++++++++++ PORT URL ++++++++++++++++++++++--');
    for (const domain of domains)
        if (domain) {
            console.log('\t------------------------------------');
            console.log(`- Client ${domain}/index.html`);
            console.log(`- RESTapi on ${domain}/${path}`);
        }
});