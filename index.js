'use strict';

require('dotenv').config();

if(process.env.DB==='mongo'){
  console.log('starting mongo');
  require('./src/lib/mongo')
}else{
  console.log('starting sql');
  require('./src/lib/sql');
}

require('./src/app').start(process.env.PORT);
