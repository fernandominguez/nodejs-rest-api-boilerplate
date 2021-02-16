/**
 * @class
 * @classdesc API Exception class
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @extends Error
 */
module.exports = class Exception extends Error {
	/**
	 * @constructor
	 * @param {string} message
	 * @param {int} code
	 * @param {Exception|null} previous
	 */
	constructor(message, code = 0, previous = null) {
		super(message);
		this._code = code;
		this._previous = previous;
	}
	/**
	 * @public
	 * @return {int}
	 */
	getCode() {
		return this._code;
	}
	/**
	 * @public
	 * @return {Exception}
	 */
	getPrevious() {
		return this._previous;
	}
};
