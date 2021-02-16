/**
 * @class
 * @classdesc API DatabaseException class
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires ./error-types
 * @requires ./extended-exception
 */
const { DatabaseError } = require('./error-types');
const ExtendedException = require('./extended-exception');

module.exports = class DatabaseException extends ExtendedException {
	/**
	 * @constructor
	 * @param {string} message
	 * @param {int} code
	 * @param {ExtendedException|null} previous
	 */
	constructor(message, code = 0, previous = null) {
		super(message, code, previous);
		this.setType(DatabaseError);
	}
};
