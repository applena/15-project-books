'use strict';

/**
 * newSearch GET /searches/new
 * @param {*} request 
 * @param {*} response 
 * @module Routes
 */
module.exports = function newSearch(request, response) {
  response.render('pages/searches/new');
};
