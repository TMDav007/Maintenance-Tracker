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
  let decode;
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      decode = err;
    }
    decode = decoded;
  });
  return decode;
};

export default { pgConnect, tokens };

