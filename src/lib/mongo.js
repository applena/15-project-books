'use strict';

const mongoose = require('mongoose');
const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};

const connect = mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

module.exports = connect;
