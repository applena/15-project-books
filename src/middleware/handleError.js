'use strict';

/**
 * handleErrorr
 * @param {object} error 
 * @param {object} response 
 * @module Middleware
 */
module.exports = (error, response) => {
  response.render('pages/error', {error: error});
}
