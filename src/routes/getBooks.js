'use strict';

const books = require('../models/Books');
const getRenderableBook = require('../lib/getRenderableBook');

module.exports = function getBooks(request, response, next) {
  books.get()
    .then( data => {
      console.log('getBooks',{data});
      if(!data.length) {
        return response.render('pages/searches/new');
      } 
      //console.log(data[50]); 
      response.render('pages/index', {books: data.map(getRenderableBook)});
    })
    .catch( next );

};
