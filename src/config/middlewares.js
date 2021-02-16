/**
 * @description API middlewares configuration
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires compression
 * @requires body-parser
 * @requires cors
 * @requires helmet
 * @requires dotenv-flow
 * @requires ../services/routes-service
 * @requires ../services/routes-notfound-service
 */
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv-flow');

const routes = require('../services/routes-service');
const routesNotFound = require('../services/routes-notfound-service');

module.exports = (app) => {
	// Load environment variables intro process.env
	dotenv.config({ silent: true });
	app.use(compression());
	// Parse request of content-type - application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));
	// Parse request of content-type - application/json
	app.use(bodyParser.json());
	app.use(helmet());
	app.use(cors());
	// Routes
	app.use('/' + process.env.API_VER, routes);
	app.use(routesNotFound);
};
