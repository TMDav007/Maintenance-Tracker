import pg from 'pg';
import dotenv from 'dotenv';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';
import seed from './seed';
import utils from './../utils/index';

const { createAndSeed } = seed;
const { pgConnect } = utils;

dotenv.config();

const client = pgConnect();
client.connect();

client.query(createAndSeed, (err) => {
  if (err) {
    console.log(err);
  }
  client.end();
});
