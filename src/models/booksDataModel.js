'use strict';

const DataModel = require('./model');
const schema = require('./schema');

class Books extends DataModel {

}

module.exports = new Books(schema);
