/**
 * @description The middleware for managing the not found endpoints
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 */

/**
 * @param {request} req
 * @param {response} res
 */
module.exports = (req, res) => {
	res.status(404).send({
		error: {
			name: 'Error',
			status: 404,
			message: 'Invalid Request',
			statusCode: 404,
		},
		message: 'Route not found!',
	});
};
