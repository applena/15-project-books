'use strict';

const express = require('express');
const modelFinder = require('../middleware/model-finder.js');
const swaggerUI = require('swagger-ui-express');
const router = express.Router();
const handleError = require('./middleware/handleError');
const superagent = require('superagent');
const Book = require('./models/Book');
const getBookshelves = require('./lib/getBookshelves');
const createShelf = require('./lib/createShelf');
const pg = require('pg');
const notFound = require('./middleware/404');
const DataModel = require('./models/model');

const app = express();
router.param('model', modelFinder);

const swaggerDocs = require('../../docs/swagger.json');

//lets you access swagger docs on line
router.use('/api/v1/doc/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// ROUTES
app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.get('/books/:id', getBook);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);


const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.get('*', notFound);

// FUNCTIONS

function getBooks(request, response) {
  let model = new DataModel();
  model.get()
    .then(results => {
      if(results.rows.rowCount === 0) {
        response.render('pages/searches/new');
      } else {
        response.render('pages/index', {books: results.rows})
      }
    })
    .catch(err => handleError(err, response));
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {results: results}))
    .catch(err => handleError(err, response));
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}


function getBook(request, response) {
  getBookshelves()
    .then(shelves => {
      // let SQL = 'SELECT * FROM books WHERE id=$1;';
      let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
      let values = [request.params.id];
      client.query(SQL, values)
        .then(result => response.render('pages/books/show', {book: result.rows[0], bookshelves: shelves.rows}))
        .catch(err => handleError(err, response));
    })
}

function createBook(request, response) {
  createShelf(request.body.bookshelf)
    .then(id => {
      let {title, author, isbn, image_url, description} = request.body;
      let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
      let values = [title, author, isbn, image_url, description, id];

      client.query(SQL, values)
        .then(result => response.redirect(`/books/${result.rows[0].id}`))
        .catch(err => handleError(err, response));
    })

}

function updateBook(request, response) {
  let {title, author, isbn, image_url, description, bookshelf_id} = request.body;
  // let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE id=$7;`;
  let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
  let values = [title, author, isbn, image_url, description, bookshelf_id, request.params.id];

  client.query(SQL, values)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(err => handleError(err, response));
}

function deleteBook(request, response) {
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let values = [request.params.id];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}