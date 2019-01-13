'use strict';

require('dotenv').config();
const pg = require('pg');

if(process.env.DB==='mongo'){
  const mongoose = require('mongoose');

  const mongooseOptions = {
    useNewUrlParser:true,
    useCreateIndex: true,
  };
  mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
}else{
// Database Setup
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.on('error', err => console.error(err));
}

require('./src/app.js').start(process.env.PORT);
