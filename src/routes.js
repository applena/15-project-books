'use strict';

const express = require('express');
//const swaggerUI = require('swagger-ui-express');
//const router = express.Router();
const handleError = require('./middleware/handleError');
//const Book = require('./models/Book');
//const createShelf = require('./lib/mongo/createShelf');
// const pg = require('pg');
// const notFound = require('./middleware/404');
//const DataModel = require('./models/model');
const router = express.Router();
const books = require('./models/mongo/Books');
const superagent = require('superagent');
const Shelf = require('./models/mongo/bookshelf');

//const swaggerDocs = require('../../docs/swagger.json');

//lets you access swagger docs on line
//router.use('/api/v1/doc/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// ROUTES
router.get('/', getBooks);
router.get('/books', getJsonBooks);
router.get('/books/:id', getBook);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

router.get('/searches/new', newSearch);
router.post('/searches', createSearch);

// FUNCTIONS

function getJsonBooks(request, response){
  books.get()
    .then( data => {
      let count = data.length;
      response.status(200).json({count, data});
    })
}

function getBooks(request, response, next) {
  books.get()
    .then( data => {
      if(data.length === 0) {
        response.render('pages/searches/new');
      } else {
        console.log(data); response.render('pages/index', {books: data})
      }
    })
    .catch( next );

}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => {
      return apiResponse.body.items.map(bookResult => {
        let info = bookResult.volumeInfo;
        let book = {
          title: info.title || 'No title available',
          author: info.authors[0] || 'No authors available',
          isbn: info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available',
          image_url: info.imageLinks ? info.imageLinks.smallThumbnail : 'https://i.imgur.com/J5LVHEL.jpg',
          description: info.description || 'No description available',
          id: info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '',
        };
        
        console.log(book);
        books.post(book);
        return book;
      })
    })
    .then(results => {
      response.render('pages/searches/show', {results: results});
    })
    .catch(err => handleError(err, response));

}

function newSearch(request, response) {
  response.render('pages/searches/new');
}


function getBook(request, response) {
  // expects an array with one object in it
  let id = request.params.id;
  books.get(id)
    .then(result => {
      Shelf.get(result.bookshelf_id)
        .then(data => {
          console.log(result, data, "++++++++++++++++++++++++++++++++++++++++");
          response.render('pages/books/show', {
            book: result, bookshelves: data
          });
        })
        .catch(err => handleError(err, response));
    })
}

function createBook(request, response) {
  // expects the record that was just added to the database
  books.post(request.body)
    .then(result => response.redirect(`/books/${result._id}`))
    .catch(err => handleError(err, response));
}

// function newSearch(request, response) {
//   response.render('pages/searches/new');
// }

function updateBook(request, response, next) {
  // expects the record that was just updated in the database
  books.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteBook(request, response, next) {
  // Expects no return value (the resource should be gone)
  books.delete(request.params.id)
    .then( response.status(200).json({status: 'success'}) )
    .catch( next );
}

module.exports = router;
