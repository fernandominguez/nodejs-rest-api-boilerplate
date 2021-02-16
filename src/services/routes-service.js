/**
 * @description The Routes Service
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires express
 * @requires ./auth-service
 * @requires ../routes/routes-get
 */
const express = require('express');

const auth = require('./auth-service');
const routesGET = require('../routes/routes-get');

module.exports = new express.Router()
	// Use authorization service for the API GET routes
	.use(auth, routesGET);
