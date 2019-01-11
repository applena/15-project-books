'use strict';

const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));


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
  get() {
    let SQL = 'SELECT * FROM books;';
    return client.query(SQL)
  }
  

  /**
   *
   * creates a new record
   * @param {Object} entry
   * @returns
   * @memberof DataModel
   */
  post(entry) {
    let newRecord = new this.schema(entry);
    return newRecord.save();
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
    return this.schema.updateOne({_id}, entry);
  }


  /**
   * deletes a record
   *
   * @param {string} _id
   * @returns
   * @memberof DataModel
   */
  delete(_id) {
    return this.schema.deleteOne({_id});
  }

}

module.exports = DataModel;
