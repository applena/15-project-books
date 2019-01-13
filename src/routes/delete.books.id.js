'use strict';

const books = require('../models/Books.'+process.env.DB);
const handleError = require('../middleware/handleError');

module.exports = function deleteBook(request, response) {
  // Expects no return value (the resource should be gone)
  books.delete(request.params.id)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
};
