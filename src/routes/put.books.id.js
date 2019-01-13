'use strict';

const books = require('../models/Books.'+process.env.DB);
const handleError = require('../middleware/handleError');

module.exports = function updateBook(request, response) {
  // expects the record that was just updated in the database
  books.put(request.params.id, request.body)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(err => handleError(err, response));
};
