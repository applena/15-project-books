'use strict';

require('dotenv').config();
// override for testing to ensure we are using in-memory db
process.env.DB = 'mongo';
process.env.DBMOCK = true;

const rootDir = process.cwd();
const supergoose = require('../supergoose.js');
const supertest = require('supertest');

// now when app requires mocked resources, it will load the mocks
const {server} = require(`${rootDir}/src/app.js`);
const mockRequest = supergoose.server(server);




beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('api endpoints', () => {
  describe('errors', () => {
    it('should respond with a 404 on an invalid route', (done) => {

      return mockRequest
        .get('/foo')
        .then(results => {
          expect(results.status).toBe(404);
          done();
        });
    });
  
    it('should respond with a 404 on an invalid method', (done) => {
  
      return mockRequest
        .post('/api/v1/notes/12')
        .then(results => {
          expect(results.status).toBe(404);
          done();
        });
  
    });
  })
  it('gets all books when .get() is called', () => {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('gets a specific book by id', () => {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  describe('.post(entry)', () => {

  });

  describe('.put(id, entry)', () => {

  });

  describe('.delete(id)', () => {

  });
});
