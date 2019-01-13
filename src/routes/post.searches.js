'use strict';

const books = require('../models/Books');
const getRenderableBook = require('../lib/getRenderableBook');
const handleError = require('../middleware/handleError');
const superagent = require('superagent');

module.exports = function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => {
      return apiResponse.body.items.map(bookResult => {
        let info = bookResult.volumeInfo;
        // construct sparse dataset to save into the db
        let book = {
          title: info.title,
          author: info.authors[0],
          isbn: info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : undefined,
          image_url: info.imageLinks ? info.imageLinks.smallThumbnail : undefined,
          description: info.description,
          // id: info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '',
        };
        
        console.log({book});
        books.post(book);
        return book;
      })
    })
    .then(results => {
      // map database to rendable results (with defaults for no data)
      response.render('pages/searches/show', {results: results.map(getRenderableBook)});
    })
    .catch(err => handleError(err, response));

};
