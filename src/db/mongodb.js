/**
 * @class
 * @classdesc This is the class for accessing a MongoDB database
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires moongoose
 * @requires ../exceptions/database-exception
 */
const mongoose = require('mongoose');

const DatabaseException = require('../exceptions/database-exception');

module.exports = class MongoDB {
	/**
	 * @constructor
	 * @param {string} host
	 * @param {string} port
	 * @param {string} username
	 * @param {string} password
	 * @param {string} database
	 */
	constructor(host, port, username, password, database) {
		this._host = host;
		this._port = port;
		this._username = username;
		this._password = password;
		this._database = database;
	}
	/**
	 * @method
	 * @private
	 * @return {object}
	 */
	_getOptions() {
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		if (this._username) {
			options.user = this._username;
		}
		if (this._password) {
			options.pass = this._password;
		}
		return options;
	}
	/**
	 * @method
	 * @private
	 * @return {string}
	 */
	_getUri() {
		let uri = 'mongodb://';
		uri += this._host ? this._host : '';
		uri += this._port ? ':' + this._port : '';
		uri += this._database ? '/' + this._database : '';
		return uri;
	}
	/**
	 * @async
	 * @method
	 * @public
	 * @description Start the connection with the MongoDB database
	 * @return {Promise}
	 */
	async connect() {
		return new Promise((resolve, reject) => {
			mongoose
				.connect(this._getUri(), this._getOptions())
				.then((client) => {
					if (process.env.NODE_ENV === 'development') {
						console.log('MongoDB is connected!');
					}
					resolve(client);
				})
				.catch((error) => {
					reject(new DatabaseException('MongoDB connection error!', 500, error));
				});
		});
	}
	/**
	 * @async
	 * @method
	 * @public
	 * @description Start the connection with the MongoDB database
	 * @throws DatabaseException
	 */
	async connectWithRetry() {
		try {
			await this.connect();
		} catch (error) {
			throw error;
		}
	}
	/**
	 * @method
	 * @public
	 * @param {callback} done
	 */
	disconnect(done) {
		mongoose.disconnect(done);
	}
};
