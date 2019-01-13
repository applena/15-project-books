'use strict';

const books = require('../models/Books');
const getRenderableBook = require('../lib/getRenderableBook');
const handleError = require('../middleware/handleError');
const Shelf = require('../models/bookshelf');

module.exports = function getBook(request, response) {
  // expects an array with one object in it
  let id = request.params.id;
  books.get(id)
    .then(result => {
      let renderableBooks = result.map(getRenderableBook)
      Shelf.get()
        .then(data => {
          response.render('pages/books/show', {
            book: renderableBooks[0], bookshelves: data
          });
        })
        .catch(err => handleError(err, response));
    })
};
