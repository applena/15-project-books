'use strict';

const books = require('../models/Books');
const handleError = require('../middleware/handleError');

/**
 * deleteBook handle DELETE /books/:id
 * @param {*} request 
 * @param {*} response 
 * @author Lena Eivy
 * @module Routes
 */
module.exports = function deleteBook(request, response) {
  // Expects no return value (the resource should be gone)
  books.delete(request.params.id)
    .then(()=>{
      // console.log('book deleted', request.params.id);
      response.method = 'GET';
      response.redirect(200,'/');
    })
    .catch(err => handleError(err, response));
};
