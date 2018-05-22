import validator from 'validator';
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


/** middleware class */
class Middleware {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next
   */
  static validateSignup(req, res, next) {
    const errors = [];
    if (!req.body.firstName || req.body.firstName === undefined) {
      errors.push('first name is required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (req.body.firstName === '') {
      errors.push('first name cannot be empty');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (req.body.firstName.length <= 1) {
      errors.push('first name should be greater than 1 character');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (!req.body.lastName || req.body.lastName === undefined) {
      errors.push('last name is required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (req.body.lastName === '') {
      errors.push('last name cannot be empty');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (req.body.lastName.length <= 1) {
      errors.push('last name should be greater than 1 character');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (!req.body.email || req.body.email === undefined) {
      errors.push('email is required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (!validator.isEmail(req.body.email.toString())) {
      errors.push('Valid email required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (req.body.phoneNumber === undefined) {
      errors.push('valid phone number is required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (req.body.phoneNumber.length <= 8) {
      errors.push('phone number must exceed 8 characters');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (!req.body.password || req.body.password === undefined) {
      errors.push('valid password required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (req.body.password.length <= 6) {
      errors.push('Password must exceed 6 characters');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (!req.body.confirmPassword || req.body.confirmPassword === undefined) {
      errors.push('you need to confirm your password');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    if (!validator.equals(req.body.password, req.body.confirmPassword)) {
      errors.push('Passwords must match');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    return next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next
   */
  static validateLogin(req, res, next) {
    const errors = [];
    if (req.body.email === undefined) {
      errors.push('Email is required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (!validator.isEmail(req.body.email.toString())) {
      errors.push('Valid email required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (req.body.password === undefined) {
      errors.push('Valid password required');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }

    if (req.body.password.length <= 6) {
      errors.push('Password must exceed 6 characters');
      return res.status(400).send({
        status: 'error',
        message: errors
      });
    }
    return next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} done
   * @returns {object} done
   */
  static async checkMail(req, res, done) {
    try {
      const {
        email
      } = req.body;

      // check if phone number is existing
      const checkEmail = `
            SELECT * 
            FROM users
            WHERE email = '${email}'   
      `;

      const foundEmail = await client.query(checkEmail);
      if (foundEmail.rows[0]) {
        return res.status(409).json({
          status: 'error',
          message: 'email is already existing'
        });
      }
    } catch (error) { res.status(500).send(error.message); }
    return done();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} done
   * @returns {object} done
   */
  static async checkPhoneNumber(req, res, done) {
    try {
      const {
        phoneNumber
      } = req.body;

      // check if phone number is existing
      const checkPhoneNumber = `
            SELECT * 
            FROM users
            WHERE phone_number = '${phoneNumber}'   
      `;

      const foundPhoneNumber = await client.query(checkPhoneNumber);
      if (foundPhoneNumber.rows[0]) {
        return res.status(409).json({
          status: 'error',
          message: 'phone number is already existing'
        });
      }
    } catch (error) { res.status(500).send(error.message); }
    return done();
  }
}

export default Middleware;