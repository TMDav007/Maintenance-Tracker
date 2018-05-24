import pg from 'pg';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';
import seed from './seed';

const { createAndSeed } = seed;

require('dotenv').config();

let config;

if (process.env.NODE_ENV === 'development') {
  config = developmentConfig;
} else {
  config = testConfig;
}
const client = new pg.Client(config);

client.connect();

client.query(createAndSeed, () => {
  client.end();
});

