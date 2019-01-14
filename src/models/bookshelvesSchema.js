'use strict';

// const products = require('./productsSchema');
const mongoose = require('mongoose');

const bookshelf = mongoose.Schema({
  name: { type: String, required:true },
});


module.exports = mongoose.model('bookshelf', bookshelf);
