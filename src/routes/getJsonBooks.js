'use strict';

const books = require('../models/Books');

module.exports = (request, response) => {
  books.get()
    .then( data => {
      let count = data.length;
      response.status(200).json({count, data});
    })
};
