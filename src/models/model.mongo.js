'use strict';


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
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject)
      .then(results => {
        return results.map(book => {
          book.id = book._id;
          delete book._id;
          return book;
        })
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
