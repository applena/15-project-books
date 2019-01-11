'use strict';

//404
module.exports = (request, response) => response.status(404).send('This route does not exist');
