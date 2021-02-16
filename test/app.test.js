/**
 * @description Unit tests for the Node.js RESTful API
 * @author Fernando Domínguez <dominguez.fernando@gmail.com> (https://fernandominguez.es)
 * @license MIT
 * @requires chai
 * @requires chai-http
 * @requires dotenv-flow
 * @requires jsonwebtoken
 * @requires ../src/db/mongodb
 * @requires ../src/app
 * @requires ../src/routes/endpoints
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require('dotenv-flow');
const jwt = require('jsonwebtoken');

// Loading environment variables
process.env.NODE_ENV = 'test';
dotenv.config({ silent: true });

// Load App required files for the tests
const Database = require('../src/db/mongodb');
const server = require('../src/app');

const { AUTH } = require('../src/routes/endpoints');

/**
 * Return a Mocked API_KEY fot the unit tests
 * @return {string}
 */
async function getApikey() {
	// Mocked API_KEY options
	const options = {
		issuer: 'issuer',
		subject: 'test@issuer.com',
		audience: `api.the-api.url/${process.env.API_VER}`,
		expiresIn: '1h',
		algorithm: 'HS256',
	};
	// Mocked API_KEY payload
	const payload = {
		user: 'Test User',
	};
	// Mocked well formed API_KEY
	return await jwt.sign(payload, process.env.JWT_SECRET, options);
}

// Assertion
chai.should();
chai.use(chaiHttp);

/**
 * API Unit Tests
 */
describe('This2File API [app.test]:', function () {
	const db = new Database(
		// eslint-disable-next-line mocha/no-setup-in-describe
		process.env.MONGO_HOSTNAME,
		// eslint-disable-next-line mocha/no-setup-in-describe
		process.env.MONGO_PORT,
		// eslint-disable-next-line mocha/no-setup-in-describe
		process.env.MONGO_USERNAME,
		// eslint-disable-next-line mocha/no-setup-in-describe
		process.env.MONGO_PASSWORD,
		// eslint-disable-next-line mocha/no-setup-in-describe
		process.env.MONGO_DATABASE
	);

	before(function () {
		return db.connect();
	});

	after(function (done) {
		db.disconnect(done);
	});

	describe('Test Http GET requests:', function () {
		describe('GET endpoint not found:', function () {
			it('When endpoint not exists, return 404 Error.', async function () {
				// Mocked valid API_KEY
				const API_KEY = await getApikey();
				await chai
					.request(server)
					.get('/noendpoint')
					.set('Authorization', `Bearer ${API_KEY}`)
					.then((res) => {
						res.should.have.status(404);
						res.body.error.name.should.be.eq('Error');
						res.body.error.status.should.be.eq(404);
						res.body.error.message.should.be.eq('Invalid Request');
						res.body.error.statusCode.should.be.eq(404);
						res.body.message.should.be.eq('Route not found!');
					});
			});
		});
		// eslint-disable-next-line mocha/no-setup-in-describe
		const route = `/${process.env.API_VER}${AUTH}`;
		describe(`GET ${route}:`, function () {
			it(`When ${route} and valid API_KEY, return an Authorized JSON object.`, async function () {
				// Mocked valid API_KEY
				const API_KEY = await getApikey();
				await chai
					.request(server)
					.get(route)
					.set('Authorization', `Bearer ${API_KEY}`)
					.then((res) => {
						res.should.have.status(200);
						res.body.should.be.a('array');
						res.body.length.should.not.be.eq(0);
						for (let i = 0; i < res.body.length; i++) {
							res.body[i].should.be.a('object');
							res.body[i].message.should.be.eq('Authorized');
							res.body[i].project.should.exist;
							res.body[i].project.length.should.not.be.eq(0);
						}
					});
			});
			it(`When ${route} and invalid API_KEY, return 401 Authentication Error.`, async function () {
				// Mocked invalid API_KEY
				const API_KEY = 'INVALID_API_KEY';
				await chai
					.request(server)
					.get(route)
					.set('Authorization', `Bearer ${API_KEY}`)
					.then((res) => {
						res.should.have.status(401);
						res.body.should.be.a('object');
						res.body.code.should.be.eq(401);
						res.body.type.should.be.eq('Authentication Error');
						res.body.message.should.be.eq('Unauthorized!');
					});
			});
			it(`When ${route} and no API_KEY, return 403 Authentication Error.`, async function () {
				await chai
					.request(server)
					.get(route)
					.then((res) => {
						res.should.have.status(403);
						res.body.should.be.a('object');
						res.body.code.should.be.equals(403);
						res.body.type.should.be.equals('Authentication Error');
						res.body.message.should.be.equals('No token provided!');
					});
			});
		});
	});
});
