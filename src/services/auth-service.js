/**
 * @description The Authentication service
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires ../auth/authentication
 */
const Authentication = require('../auth/authentication');

/**
 * @param {request} req
 * @param {response} res
 * @param {callback} next
 */
module.exports = (req, res, next) => {
	const auth = new Authentication();
	try {
		const header = req.headers['authorization'];
		const token = header ? header.split(' ')[1] : null;
		req.payload = auth.verifyToken(token);
		next();
	} catch (exception) {
		res.status(exception.getCode()).send(exception.send());
	}
};
