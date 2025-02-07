import * as log from './log.js';
import util from './util.js';

export default {
    log,
    promise: util._promise,
    generateSecret: util.generateSecret
}