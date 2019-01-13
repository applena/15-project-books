'use strict';

const client = require('../lib/sql');

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
  get(_id) {
    let SQL = 'SELECT * FROM books' + (_id ? ' WHERE id=$1' : '') + ';';
    return client.query(SQL, _id ? [_id] : undefined)
      .then(results => {
        return results.rows;
      });
  }
  

  /**
   *
   * creates a new record
   * @param {Object} entry
   * @returns
   * @memberof DataModel
   */
  post(entry) {
    let {title, author, isbn, image_url, description} = entry;
    let SQL = 'INSERT INTO books(title, author, isbn, image_url, description, bookshelf_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;';
    let values = [title, author, isbn, image_url, description];

    client.query(SQL, values)
      .then(result => result);
  }

  
  /**
   * repleaces a record in the database
   *
   * @param {string} _id
   * @param {Object} entry
   * @returns
   * @memberof DataModel
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
   * @memberof DataModel
   */
  delete(_id) {
    let SQL = 'DELETE FROM books WHERE id=$1;';
    let values = [_id];
  
    return client.query(SQL, values)
  }

}

module.exports = DataModel;
