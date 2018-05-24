import pg from 'pg';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';
import prodConfig from './../config/productConfig';
import seed from './seed';

const { createAndSeed } = seed;

require('dotenv').config();

let config;
const herokuConnect = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'development') {
  config = developmentConfig;
} else if (process.env.NODE_ENV === 'test') {
  config = testConfig;
} else {
  config = prodConfig;
}
const client = new pg.Client(herokuConnect);
// console.log(config, process.NODE_ENV);

client.connect();

client.query(createAndSeed, (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log(res);
  client.end();
});

