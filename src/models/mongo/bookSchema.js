'use strict';

const mongoose = require('mongoose');
//const books = require('../mongo/Books');

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

// books.pre('save', function(book) {
//   //when I call a .find, this will run before the querry
//   try {
//     this.populate('products');//this will populate the virtual products
//   }
//   catch(errors) { console.log('Find Error', errors);}
// });

module.exports = mongoose.model('books', booksSchema);
