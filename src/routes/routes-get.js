/**
 * @description The Routes middleware for the GET requests
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires express
 * @requires ./endpoints
 */
const express = require('express');
const { AUTH } = require('./endpoints');

module.exports = new express.Router().get(AUTH, (req, res) => {
	res.status(200).send([
		{
			message: 'Authorized',
			project: 'Mock Project', // TODO: Retrieve project name from the database
		},
	]);
});
