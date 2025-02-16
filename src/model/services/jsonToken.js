import dotenv from 'dotenv';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { utils } from '../../map.js';

const properties = dotenv.config().parsed;
const EXPIRESIN = properties.EXPIRESIN || '1h';
const iSSUER = properties.iSSUER;
const AUDIENCE = properties.AUDIENCE;

const ALGORITHMS = JSON.parse(properties.ALGORITHMS || '["HS256"]'); // console.log(ALGORITHMS);
var secret = properties.SECRET;
let t = utils.log.style;

if (!secret) {
    secret = utils.generateSecret(32);
    // console.log(`${t.fg.magenta + t.tp.bright}Your json token's ${t.reset + '"' + t.fg.red + t.bg.yellow + secret + t.reset}"`);
}
const option = { expiresIn: EXPIRESIN, issuer: iSSUER, audience: AUDIENCE, algorithms: ALGORITHMS }; // an hour [s,m,h...]


// RESTRTCT EXECUTE QUERY
const jsonToken = {
    sign: (object) => jwt.sign(object, secret, option),
    verify: (token) => {
        try {
            const object = jwt.verify(token, secret, option);
            return object;
        } catch (error) {
            moment.locale('en')
            const time = moment(error.expiredAt).format('LLLL')
            throw { message: `access token expired at: ${time}` }
        }
    }
}
export default jsonToken;