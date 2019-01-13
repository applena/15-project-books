'use strict';

const books = require('../models/Books');
const getRenderableBook = require('../lib/getRenderableBook');
const handleError = require('../middleware/handleError');
const Shelf = require('../models/Bookshelves');

module.exports = function getBook(request, response) {
  // expects an array with one object in it
  let id = request.params.id;
  books.get(id)
    .then(result => {
      Shelf.get()
        .then(bookshelves => {
          let renderableBooks = result.map(getRenderableBook)
          response.render('pages/books/show', {
            book: renderableBooks[0], bookshelves: bookshelves
          });
        })
        .catch(err => handleError(err, response));
    })
};
