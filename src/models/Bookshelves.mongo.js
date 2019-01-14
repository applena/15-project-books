'use strict';

const DataModel = require('./model.'+process.env.DB);
const schema = require('./bookshelvesSchema');



/**
 *shelf class that models shelf data
 *
 * @class Shelf
 * @extends {DataModel}
 */
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
