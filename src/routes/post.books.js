'use strict';

const books = require('../models/Books');
const handleError = require('../middleware/handleError');

module.exports = function createBook(request, response) {
  // expects the record that was just added to the database
  books.post(request.body)
    .then(result => response.redirect(`/books/${result._id}`))
    .catch(err => handleError(err, response));
};
