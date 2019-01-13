'use strict';

require('dotenv').config();
// override for testing to ensure we are using in-memory db
process.env.DB = 'mongo';
process.env.DBMOCK = true;

const rootDir = process.cwd();
const supergoose = require('../supergoose.js');

// now when app requires mocked resources, it will load the mocks
const {server} = require(`${rootDir}/src/app.js`);
const mockRequest = supergoose.server(server);




beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

let bookObj = {"image_url":"http://test.url", "title":"bob", "author":"bobby", "isbn":5, "description":"bob does stuff"};

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
  it('gets all books when .get() is called', (done) => {
    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
        done();
      });
  });

  let bookid;
  it ('adds an entry to the db', (done) => {
    return mockRequest
      .post('/books')
      .send(bookObj)
      .then(request => {
        let location = request.headers.location.split('/');
        bookid = location[location.length-1];
        expect(request.status).toBe(302);
        done();
      })

  });

  it('gets an entry by id', (done) => {

    return mockRequest
      .get('/books/'+bookid)
      .then(results => {
        expect(results.status).toBe(200);
        done();
      });
  })

  it('updates an entry', (done) => {
    bookObj._method = 'put';
    return mockRequest
      .post('/books/'+bookid)
      .send(bookObj)
      .then(request => {
        expect(request.status).toBe(302);
        done();
      });
  });

  it('deletes an entry', (done) => {

    mockRequest.delete('/books/'+bookid).then((request)=>{
      expect(request.status).toBe(302);
      mockRequest.get('/books/'+bookid)
        .then(results => {
          expect(results.status).toBe(500);
          done();
        });
    });
  });
});
