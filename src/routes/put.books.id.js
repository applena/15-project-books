'use strict';

const books = require('../models/Books');
const handleError = require('../middleware/handleError');

/** 
 * updates a book
 * @param {string} id the id of the book to be updated
 * @param {Object} entry the data object to be updated
*/
module.exports = function updateBook(request, response) {
  // expects the record that was just updated in the database
  books.put(request.params.id, request.body)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(err => handleError(err, response));
};
