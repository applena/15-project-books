'use strict';

const books = require('../models/Books');
const handleError = require('../middleware/handleError');

/** 
 * puts a book record in the database
*/
module.exports = function createBook(request, response) {
  // expects the record that was just added to the database
  books.post(request.body)
    .then(result => {
      // console.log('post book', result); 
      response.redirect(`/books/${result.id}`)
    })
    .catch(err => handleError(err, response));
};
