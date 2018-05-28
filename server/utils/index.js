import pg from 'pg';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';

dotenv.config();

let config;
const pgConnect = () => {
  if (process.env.NODE_ENV === 'development') {
    config = developmentConfig;
  } else if (process.env.NODE_ENV === 'test') {
    config = testConfig;
  } else {
    config = process.env.DATABASE_URL;
  }

  const client = new pg.Client(config);
  return client;
};

const tokens = (req) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;

  const decoded = jwt.verify(token, process.env.SECRET);
  return decoded;
};

export default { pgConnect, tokens };
