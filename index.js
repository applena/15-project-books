'use strict';

require('dotenv').config();

if(process.env.DB==='mongo'){
  if(process.env.DBMOCK==='true'){
    console.log('starting in memory mongo');
    require('./src/lib/mongo.mock');
  }else{
    console.log('starting mongo');
    require('./src/lib/mongo');
  }
}else{
  console.log('starting sql');
  require('./src/lib/sql');
}

require('./src/app').start(process.env.PORT);
