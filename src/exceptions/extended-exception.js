/**
 * @class
 * @classdesc API ExtendedException class
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires ./exception
 */
const Exception = require('./exception');

module.exports = class ExtendedException extends Exception {
	/**
	 * @constructor
	 * @param {string} message
	 * @param {int} code
	 * @param {Exception|null} previous
	 */
	constructor(message, code = 0, previous = null) {
		super(message, code, previous);
	}
	/**
	 * @public
	 * @return {string}
	 */
	getType() {
		return this._type;
	}
	/**
	 * Return the error object to send on the response
	 * @public
	 * @return {object}
	 */
	send() {
		const error = {
			code: this._code,
		};
		if (this._type && process.env.NODE_ENV !== 'production') {
			error.type = this._type;
		}
		if (this.message) {
			error.message = this.message;
		}
		if (this._previous && process.env.NODE_ENV !== 'production') {
			error.error = this._previous;
		}
		if (this.stack && process.env.NODE_ENV !== 'production') {
			error.stack = this.stack;
		}
		if (process.env.NODE_ENV === 'development') {
			console.error(error);
		}
		return error;
	}
	/**
	 * @public
	 * @param {string} type
	 */
	setType(type) {
		this._type = type ? type : this._type;
	}
};
