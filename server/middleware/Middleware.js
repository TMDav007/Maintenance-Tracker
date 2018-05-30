import validator from 'validator';
import Validator from 'validatorjs';
import dotenv from 'dotenv';

import utils from './../utils/index';
import validateObject from './validate';

const { pgConnect, tokens } = utils;
const { requestRules, requestErrorMessage,
     userRules, userErrorMessage, loginRules, loginErrorMessage } = validateObject;

const client = pgConnect();
client.connect();


dotenv.config();


/** middleware class */
class Middleware {
  /**
   * @desc authenticates a user
   *
   * @param {object} req
   *@param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static authenicateUser(req, res, next) {
    const token = tokens(req);
    if (!token) {
      return res.status(403).json({ status: 'fail', message: 'Token not provided or Invalid Token' });
    }
    return next();
  }

  /**
   * @desc authenticates an admin
   *
   * @param {object} req
   *@param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static async authenicateAdmin(req, res, next) {
    const token = tokens(req);
    if (!token) {
      return res.status(403).json({ status: 'fail', message: 'Token not provided or Invalid Token' });
    }
    if (token.user_role !== 'admin') {
      return res.status(403).json({ status: 'fail', message: 'Forbidden to non admin' });
    }
    return next();
  }
  /**
   * @desc it validates input for create request endpoint
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateRequest(req, res, next) {
    const { requestTitle, requestBody, date, userId} = req.body;

    const data = { requestTitle, requestBody, date, userId };


    const validation = new Validator(data, requestRules, requestErrorMessage);

    if (validation.passes()) {
      return next();
    }

    return res.status(400).json({
      status: 'fail',
      data: {
        error: validation.errors.all()
      }
    });
  }

  /**
   * @desc it validates user signup 
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateUser(req, res, next) {
    const {
      firstName, lastName, phoneNumber, email, password, password_confirmation
    } = req.body;

    const data = {
     firstName,
     lastName,
     phoneNumber,
     email,
     password,
     password_confirmation
    };

    const validation = new Validator(data, userRules, userErrorMessage);

    if (validation.passes()) {
      return next();
    }

    return res.status(400).json({
      status: 'fail',
      data: {
        error: validation.errors.all()
      }
    });
  }


  
  /**
   * @desc validates the login field
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateLogin(req, res, next) {
    const {
      email, password
    } = req.body;

    const data = {
     email,
     password,
    };

    const validation = new Validator(data, loginRules, loginErrorMessage);

    if (validation.passes()) {
      return next();
    }

    return res.status(400).json({
      status: 'fail',
      data: {
        error: validation.errors.all()
      }
    });
  }

  /**
   * @desc checks if an email exist
   *
   * @param {object} req
   * @param {object} res
   * @param {object} done
   *
   * @returns {object} done
   */
  static async checkMail(req, res, done) {
    try {
      const { email } = req.body;

      const checkEmail = `
            SELECT * 
            FROM users
            WHERE email = '${email}'   
      `;

      const foundEmail = await client.query(checkEmail);
      if (foundEmail.rows[0]) {
        return res.status(409).json({
          status: 'fail',
          message: 'email is already existing'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
    return done();
  }

  /**
   * @desc checks if phone number exist
   *
   * @param {object} req
   * @param {object} res
   * @param {object} done
   *
   * @returns {object} done
   */
  static async checkPhoneNumber(req, res, done) {
    try {
      const { phoneNumber } = req.body;

      const checkPhoneNumber = `
            SELECT * 
            FROM users
            WHERE phone_number = '${phoneNumber}'   
      `;

      const foundPhoneNumber = await client.query(checkPhoneNumber);
      if (foundPhoneNumber.rows[0]) {
        return res.status(409).json({
          status: 'fail',
          message: 'phone number is already existing'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
    return done();
  }
}

export default Middleware;
