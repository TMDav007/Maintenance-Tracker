import pg from 'pg';
import jwt from 'jsonwebtoken';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';
import prodConfig from './../config/productConfig';

require('dotenv').config();

let config;
const herokuConnect = process.env.DATABASE_URL;
const pgConnect = () => {
  if (process.env.NODE_ENV === 'development') {
    config = developmentConfig;
  } else if (process.env.NODE_ENV === 'test') {
    config = testConfig;
  } else {
    config = prodConfig;
  }

  const client = new pg.Client(herokuConnect);
  console.log(client);
  return client;
};

const tokens = (req) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;

  const decoded = jwt.verify(token, process.env.SECRET);
  return decoded;
};

export default { pgConnect, tokens };

