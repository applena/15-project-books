'use strict';

const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  title: {type: String, required:false },
  author: { type: String, required: false},
  isbn: { type: String, required: false},
  image_url: {type: String, required: false},
  description: { type: String, required: false },
  id: { type: String, required: false },
  bookshelf: {type: String, required: false},
  bookshelf_id: {type: String, required: false}
});

module.exports = mongoose.model('books', booksSchema);
