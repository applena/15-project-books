'use strict';

const DataModel = require('./model.mongo');
const schema = require('./bookSchema');
const bookshelf = require('./Bookshelves');



/**
 *class that models the book object
 *
 * @class Books
 * @extends {DataModel}
 * @module Models
 */
class Books extends DataModel {
  /**
   *
   * creates a new record
   * @param {Object} entry
   * @returns
   * @memberof DataModel
   */
  post(entry) {
    if(!entry.bookshelf){
      let newRecord = new this.schema(entry);
      return newRecord.save();
    }
    
    // see if the bookshelf already exists
    return bookshelf.getByName(entry.bookshelf)
      .then(results => {
        if(results.length){
          entry.bookshelf_id = results.id;
          delete entry.bookshelf;
          let newRecord = new this.schema(entry);
          return newRecord.save();
        }

        return bookshelf.post({name:entry.bookshelf})
          .then(results => {
            entry.bookshelf_id = results.id;
            delete entry.bookshelf;
            let newRecord = new this.schema(entry);
            return newRecord.save();
          }).catch((err)=>{
            console.error('bookshelf.post', err);
          })
      }).catch((err)=>{
        console.error('bookshelf.getByName', err);
      })
  }
}

module.exports = new Books(schema);
