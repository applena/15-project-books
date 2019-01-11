'use strict';

const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  placeholderImage: 'https://i.imgur.com/J5LVHEL.jpg',
  title: {type: String, required:false },
  author: { type: String, required: false},
  isbn: { type: String, required: false},
  image_url: {type: String, required: false},
  description: { type: String, required: false },
  id: { type: String, required: false }
});

module.exports = booksSchema;
