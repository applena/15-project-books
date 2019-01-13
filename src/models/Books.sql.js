'use strict';

const client = require('../lib/sql');
const bookshelf = require('./bookshelf.sql');

class Books {

  /**
   *
   * creates a new record
   * @param {Object} entry
   * @returns
   * @memberof DataModel
   */
  createBook(entry) {
    let {title, author, isbn, image_url, description, bookshelf_id} = entry;
    let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
    let values = [title, author, isbn, image_url, description, bookshelf_id];

    // console.log(SQL, values, entry, '++++++++++++++++++++++');
    return client.query(SQL, values)
      .then(result => result.rows[0]);
  }
  /**
   *`
   * creates a new record
   * @param {Object} entry
   * @returns
   */
  post(entry) {
    if(!entry.bookshelf){
      return this.createBook(entry);
    }
    // see if the bookshelf already exists
    return bookshelf.getByName(entry.bookshelf)
      .then(results => {
        if(results.length){
          entry.bookshelf_id = results[0].id;
          return this.createBook(entry);
        }

        // console.log('creating bookshelf', entry.bookshelf);
        return bookshelf.post({name:entry.bookshelf})
          .then(bookshelf_id => {
            entry.bookshelf_id = bookshelf_id;
            return this.createBook(entry);
          }).catch((err)=>{
            console.error('bookshelf.post', err);
          })
      }).catch((err)=>{
        console.error('bookshelf.getByName', err);
      })
  }


  /**
   * retrieves one or more records
   *
   * @param {string} _id
   * @returns
   */
  get(_id) {
    let SQL = 'SELECT books.*,bookshelves.name AS bookshelf FROM books,bookshelves WHERE books.bookshelf_id=bookshelves.id' + (_id ? ' AND books.id=$1' : '') + ';';
    return client.query(SQL, _id ? [_id] : undefined)
      .then(results => {
        console.log(results.rows);
        return results.rows;
      });
  }

  
  /**
   * repleaces a record in the database
   *
   * @param {string} _id
   * @param {Object} entry
   * @returns
   */
  put(_id, entry) {

    let {title, author, isbn, image_url, description, bookshelf_id} = entry;
    // let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf=$6 WHERE id=$7;`;
    let SQL = `UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5, bookshelf_id=$6 WHERE id=$7;`;
    let values = [title, author, isbn, image_url, description, bookshelf_id, _id];
  
    return client.query(SQL, values)
      .then(results => results.rows)
      .catch(console.error);
  }


  /**
   * deletes a record
   *
   * @param {string} _id
   * @returns
   */
  delete(_id) {
    let SQL = 'DELETE FROM books WHERE id=$1;';
    let values = [_id];
  
    return client.query(SQL, values)
  }
}

module.exports = new Books();
