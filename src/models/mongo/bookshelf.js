'use strict';

const DataModel = require('./model');
const schema = require('./bookshelvesSchema');

class Shelf extends DataModel {
  /**
   * retrieves a shelf by name
   *
   * @param {string} name
   * @returns
   * @memberof Shelf
   */
  getByName(name) {
    return this.schema.find({name});
  }
}

module.exports = new Shelf(schema);
