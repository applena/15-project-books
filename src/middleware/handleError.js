'use strict';

module.exports =(error, response) => {
  response.render('pages/error', {error: error});
}
