'use strict';

// const pg = require('pg');
// const superagent = require('superagent');
// const getBookshelves = require('../lib/getBookshelves');

// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));


/**
 * class representing a mongo model
 * @param {string} schema - mongo schema
 * @class DataModel
 */
class DataModel {

  constructor(schema) {
    this.schema = schema;
  }


  /**
   * retrieves one or more records
   *
   * @param {string} _id
   * @returns
   * @memberof DataModel
   */
  // get(id) {
  //   // let SQL = 'SELECT * FROM books;';
  //   // return client.query(SQL)
  // }

  // get(id){
  //   getBookshelves()
  //   .then(shelves => {
  //     // let SQL = 'SELECT * FROM books WHERE id=$1;';
  //     let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
  //     let values = [id];
  //     client.query(SQL, values)
  //       .then(result => response.render('pages/books/show', {book: result.rows[0], bookshelves: shelves.rows}))
  //       .catch(err => handleError(err, response));
  //   });
  
  

  /**
   *
   * creates a new record
   * @param {Object} entry
   * @returns
   * @memberof DataModel
   */
  // post(data) {
  //   let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  //   if (data[1] === 'title') { url += `+intitle:${data[0]}`; }
  //   if (data[1] === 'author') { url += `+inauthor:${data[0]}`; }
  
  //   return superagent.get(url)
  // }

  /**
   * repleaces a record in the database
   *
   * @param {string} _id
   * @param {Object} entry
   * @returns
   * @memberof DataModel
   */
  // put(_id, entry) {
  //   return this.schema.updateOne({_id}, entry);
  // }


  /**
   * deletes a record
   *
   * @param {string} _id
   * @returns
   * @memberof DataModel
   */
  // delete(_id) {
  //   return this.schema.deleteOne({_id});
  // }

}

module.exports = DataModel;
