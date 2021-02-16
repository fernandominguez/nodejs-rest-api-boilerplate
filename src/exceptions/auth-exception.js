/**
 * @class
 * @classdesc API AuthException class
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires ./error-type
 * @requires ./extended-exception
 */
const { AuthError } = require('./error-types');
const ExtendedException = require('./extended-exception');

module.exports = class AuthException extends ExtendedException {
	/**
	 * @constructor
	 * @param {string} message
	 * @param {int} code
	 * @param {ExtendedException|null} previous
	 */
	constructor(message, code = 0, previous = null) {
		super(message, code, previous);
		this.setType(AuthError);
	}
};
