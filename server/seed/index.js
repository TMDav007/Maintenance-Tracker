import pg from 'pg';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';
import userSeed from './userSeed';

const { userQuery } = userSeed;

require('dotenv').config();

let config;

if (process.env.NODE_ENV === 'development') {
  config = developmentConfig;
} else {
  config = testConfig;
}
const client = new pg.Client(config);

client.connect();

client.query(userQuery, () => {
  client.end();
});

