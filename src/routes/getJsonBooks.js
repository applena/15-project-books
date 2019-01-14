'use strict';

const books = require('../models/Books');

/** 
 * gets all the books in the database and renders in json
*/
module.exports = (request, response) => {
  books.get()
    .then( data => {
      let count = data.length;
      response.status(200).json({count, data});
    })
};
