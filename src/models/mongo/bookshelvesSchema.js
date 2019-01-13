'use strict';

// const products = require('./productsSchema');
const mongoose = require('mongoose');

//allow virtual connection
const bookshelf = mongoose.Schema({
  name: { type: String, required:true },
});

// made a virtural field called products that adds a key of products to the categories object

module.exports = mongoose.model('bookshelf', bookshelf);
