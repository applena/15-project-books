'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');

const methodOverride = require('method-override');

// Esoteric Resources
const errorHandler = require( './middleware/handleError.js');
const notFound = require( './middleware/404.js' );
const apiRouter = require('./routes');

// Application Setup
const app = express();

// App Level MW
app.use(cors());
//app.use(morgan('dev'));

app.use(express.json());

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride((request) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))

// Routes
app.use(apiRouter);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);


// Set the view engine for server-side templating
app.set('view engine', 'ejs');

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
