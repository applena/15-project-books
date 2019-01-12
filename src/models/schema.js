'use strict';

const mongoose = require('mongoose');
//require('mongoose-schema-jsonschema')(mongoose);

const booksSchema = mongoose.Schema({
  title: {type: String, required:false },
  author: { type: String, required: false},
  isbn: { type: String, required: false},
  image_url: {type: String, required: false},
  description: { type: String, required: false },
  id: { type: String, required: false },
});

module.exports = mongoose.model('booksSchema', booksSchema);
