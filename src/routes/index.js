'use strict';

const express = require('express');
//const swaggerUI = require('swagger-ui-express');
const router = express.Router();

//const swaggerDocs = require('../../docs/swagger.json');

//lets you access swagger docs on line
//router.use('/api/v1/doc/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ROUTES

// Books
router.get('/', require('./getBooks'));
router.get('/books', require('./getJsonBooks'));
router.get('/books/:id', require('./get.books.id'));
router.post('/books', require('./post.books'));
router.put('/books/:id', require('./put.books.id'));
router.delete('/books/:id', require('./delete.books.id'));

// Searches
router.get('/searches/new', require('./get.searches.new'));
router.post('/searches', require('./post.searches'));

module.exports = router;
