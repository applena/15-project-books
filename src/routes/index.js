'use strict';

const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../../docs/swagger.json');


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

// Swagger
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocs));

module.exports = router;
