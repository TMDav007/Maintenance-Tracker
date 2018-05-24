import pg from 'pg';
import jwt from 'jsonwebtoken';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';

let config;

const pgConnect = () => {
  if (process.env.NODE_ENV === 'development') {
    config = developmentConfig;
  } else {
    config = testConfig;
  }

  const client = new pg.Client(config);
  return client;
};

const tokens = async (req) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token;

  const decoded = await jwt.verify(token, process.env.SECRET);
  return decoded;
};

export default { pgConnect, tokens };

