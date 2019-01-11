'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');
//const methodOverride = require('method-override');

// Application Setup
const app = express();

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// app.use(methodOverride((request, response) => {
//   if (request.body && typeof request.body === 'object' && '_method' in request.body) {
//     // look in urlencoded POST bodies and delete it
//     let method = request.body._method;
//     delete request.body._method;
//     return method;
//   }
// }))

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