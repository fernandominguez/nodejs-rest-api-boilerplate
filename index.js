/**
 * @description The API server
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires http
 * @requires ./src/app
 */
const http = require('http');

const app = require('./src/app');

// Enable KeepAlive to speed up HTTP requests
http.globalAgent.KeepAlive = true;

http.createServer(app);
