'use strict';

const pg = require('pg');

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

module.exports = ()  => {
  // let SQL = 'SELECT DISTINCT bookshelf FROM books ORDER BY bookshelf;';
  let SQL = 'SELECT * FROM bookshelves ORDER BY name;';

  return client.query(SQL);
}