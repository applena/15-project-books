'use strict';

const client = require('../lib/sql');

class Shelf {
  /**
   * retrieves a shelf by name
   *
   * @param {string} name
   * @returns
   * @memberof Shelf
   */
  getByName(name) {
    let SQL = 'SELECT * FROM bookshelves WHERE name=$1';
    let values = [name];
    return client.query(SQL, values)
      .then(results => {
        return results.rows;
      }).catch(console.error);
  }

  /**
   * retrieves one or more records
   *
   * @param {string} _id
   * @returns
   */
  get(_id) {
    let SQL = 'SELECT * FROM bookshelves' + (_id ? ' WHERE id=$1' : '') + ';';
    return client.query(SQL, _id ? [_id] : undefined)
      .then(results => {
        return results.rows;
      })
      .catch(console.error);
  }

  /**
   *
   * creates a new record
   * @param {Object} entry
   * @returns
   */
  post(entry) {
    let {name} = entry;
    let SQL = 'INSERT INTO bookshelves(name) VALUES($1) RETURNING id;';
    let values = [name];

    // console.log(SQL, values);

    return client.query(SQL, values)
      .then(result => {
        return result.rows[0].id;
      })
      .catch(console.error);
  }
  
  /**
   * replaces a record in the database
   *
   * @param {string} _id
   * @param {Object} entry
   * @returns
   */
  put(_id, entry) {

    let {name} = entry;
    let SQL = `UPDATE bookshelves SET name=$1, WHERE id=$2;`;
    let values = [name, _id];
  
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
    let SQL = 'DELETE FROM bookshelves WHERE id=$1;';
    let values = [_id];
  
    return client.query(SQL, values).catch(console.error)
  }
}

module.exports = new Shelf();
