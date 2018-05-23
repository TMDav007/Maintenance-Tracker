import jwt from 'jsonwebtoken';
import pg from 'pg';

import developmentConfig from './../config/developmentConfig';
import testConfig from './../config/testConfig';

let config;

if (process.env.NODE_ENV === 'development') {
  config = developmentConfig;
} else {
  config = testConfig;
}

const client = new pg.Client(config);
client.connect();
require('dotenv').config();

/**
 * it is a class that control all event method
 */
class UsersController {
  /**
 * it create a new user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static async signUp(req, res) {
    try {
      const {
        firstName, lastName, phoneNumber, email, password
      } = req.body;
      // create a new user
      const createUser = `
            INSERT INTO users (
                first_name,
                last_name,
                phone_number,
                email,
                password
            ) 
            VALUES (
                '${firstName}',
                '${lastName}',
                '${phoneNumber}',
                '${email}',
                crypt('${password}', gen_salt('${process.env.KEY}', 5))
            ) RETURNING *;    
        `;
      const result = await client.query(createUser);
      return res.status(201).json({
        status: 'success',
        data: {
          newUser: result.rows[0]
        },
        message: 'user created successfully'
      });
    } catch (error) { res.status(500).send(error.message); }
  }

  /**
 * it create a new user
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static async login(req, res) {
    try {
      const {
        email, password
      } = req.body;

      const checkEmailAndPassword = `
            SELECT * 
            FROM users
            WHERE email = '${email}'
            AND password = crypt('${password}', password)
      `;

      const foundEmail = await client.query(checkEmailAndPassword);
      if (!foundEmail.rows[0]) {
        return res.status(400).json({
          status: 'error',
          message: 'email or password is incorrect'
        });
      }
      const token = await jwt.sign({
        id: foundEmail.rows[0].id, user_role: foundEmail.rows[0].user_role
      }, process.env.SECRET, { expiresIn: 86400 });

      return res.status(200).json({
        status: 'success',
        data: {
          token
        },
        message: 'login successful'
      });
    } catch (error) { res.status(500).send(error.message); }
  }
}

export default UsersController;
