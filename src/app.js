/**
 * @description API main entry point
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires express
 * @requires ./config/middlewares
 * @requires ./db/mongodb
 */
const express = require('express');

const middlewares = require('./config/middlewares');
const Database = require('./db/mongodb');

const app = express();

middlewares(app);

if (process.env.NODE_ENV !== 'test') {
	(async () => {
		// Database connection
		const db = new Database(
			process.env.MONGO_HOSTNAME,
			process.env.MONGO_PORT,
			process.env.MONGO_USERNAME,
			process.env.MONGO_PASSWORD,
			process.env.MONGO_DATABASE
		);
		try {
			await db.connect();
			app.listen(process.env.PORT, () => {
				console.log(`API server is ready on port ${process.env.PORT}!`);
			});
		} catch (error) {
			console.log(error);
		};
	})();
}

module.exports = app;
