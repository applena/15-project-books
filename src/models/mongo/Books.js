'use strict';

const DataModel = require('./model');
const schema = require('./bookSchema');
const bookshelf = require('./bookshelf');

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
          entry.bookshelf_id = results._id;
          delete entry.bookshelf;
          let newRecord = new this.schema(entry);
          return newRecord.save();
        }

        return bookshelf.post({name:entry.bookshelf})
          .then(results => {
            entry.bookshelf_id = results._id;
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
