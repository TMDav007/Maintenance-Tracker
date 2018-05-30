import jwt from 'jsonwebtoken';

import utils from './../utils/index';
import query from './../utils/query';

const { pgConnect } = utils;
const { createUserQuery, loginQuery } = query

const client = pgConnect();
client.connect();


/**
 * it is a class that control all event method
 */
class UsersController {
  /**
 * @desc it create a new user
 * 
 * @param {object} req
 * @param {object} res
 * 
 * @return {object} an object
 */
  static async signUp(req, res) {
    try {
      const {
        firstName, lastName, phoneNumber, email, password
      } = req.body;

      const result = await client.query(createUserQuery(firstName,lastName,phoneNumber,email, password));
      return res.status(201).json({
        status: 'success',
        data: {
          newUser: result.rows[0]
        },
        message: 'user created successfully'
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
  }

/**
 *@desc it login a user
 * 
 * @param {object} req
 * @param {object} res
 * 
 * @return {object} an object
 */
  static async login(req, res) {
    try {
      const {
        email, password
      } = req.body;

      const foundEmail = await client.query(loginQuery(email, password));
      if (!foundEmail.rows[0]) {
        return res.status(400).json({
          status: 'error',
          message: 'email or password is incorrect'
        });
      }
      const token = await jwt.sign(foundEmail.rows[0], process.env.SECRET, { expiresIn: 86400 });

      return res.status(200).json({
        status: 'success',
        data: {
          token
        },
        message: 'login successful'
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

export default UsersController;
