'use strict';

/**
 * 404 page middleware
 * @param {object} request The request object
 * @param {object} response The response object
 * @module Middleware
 */
module.exports = (request, response) => {
  console.log('404', request.method, request.path);
  return response.sendStatus(404);
};
