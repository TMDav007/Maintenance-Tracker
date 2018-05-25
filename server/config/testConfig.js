import dotenv from 'dotenv';

dotenv.config();


const testConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_TEST,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

export default testConfig;
