/**
 * @class
 * @classdesc This is the service class for Authentication
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires jsonwebtoken
 * @requires ../exceptions/auth-exception
 */
const jwt = require('jsonwebtoken');

const AuthException = require('../exceptions/auth-exception');

module.exports = class Authentication {
	/**
	 * @constructor
	 */
	constructor() {
		// TODO: Add database connection for authentication
	}

	/**
	 * @method
	 * @description Verify the Authorization token on the request header [Authorization].
	 * @param {string} token
	 * @throws AuthException
	 * @return {object}
	 */
	verifyToken(token) {
		if (token) {
			try {
				const payload = jwt.verify(token, process.env.JWT_SECRET);
				if (payload.aud != `api.the-api.url/${process.env.API_VER}`) {
					throw new AuthException('payload.audience is not valid!', 401);
				}
				// TODO: 'issuer' must be a valid Id for the user from the database
				if (payload.iss != 'issuer') {
					throw new AuthException('payload.issuer is not valid!', 401);
				}
				// TODO: Add the database check for the received issuer
				return {
					status: 200,
					data: payload,
				};
			} catch (error) {
				throw new AuthException('Unauthorized!', 401, error);
			}
		} else {
			throw new AuthException('No token provided!', 403);
		}
	}
};
