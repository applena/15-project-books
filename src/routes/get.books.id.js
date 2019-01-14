'use strict';

const books = require('../models/Books');
const getRenderableBook = require('../lib/getRenderableBook');
const handle404 = require('../middleware/404');
const handleError = require('../middleware/handleError');
const Shelf = require('../models/Bookshelves');

/** 
 * gets a book
 * @param {string} id  the id of the book object
 * @module Routes
*/
module.exports = function getBook(request, response) {
  // expects an array with one object in it
  let id = request.params.id;
  books.get(id)
    .then(result => {
      if(!result.length){
        return handle404(request,response);
      }
      Shelf.get()
        .then(bookshelves => {
          let renderableBooks = result.map(getRenderableBook)
          response.render('pages/books/show', {
            book: renderableBooks[0], bookshelves: bookshelves
          });
        })
        .catch(err => handleError(err, response));
    });
};
