import pg from 'pg';
import dotenv from 'dotenv';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';
import seed from './seed';

const { createAndSeed } = seed;

dotenv.config();

let config;

if (process.env.NODE_ENV === 'development') {
  config = developmentConfig;
} else if (process.env.NODE_ENV === 'test') {
  config = testConfig;
} else {
  config = process.env.DATABASE_URL;
}

const client = new pg.Client(config);
client.connect();

client.query(createAndSeed, () => {
  client.end();
});
