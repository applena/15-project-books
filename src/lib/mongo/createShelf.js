'use strict';

const Shelf = require('../../models/mongo/bookshelf');

//create shelf
module.exports = (shelf) => {
  return Shelf.getByName(shelf.toLowerCase())
    .then( result => {
      if(!result.length){
        return Shelf.post({name:shelf})
      }
    })
    .catch( console.error );

  // console.log(shelfRecord);

}
