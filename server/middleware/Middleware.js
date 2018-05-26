import validator from 'validator';
import Validator from 'validatorjs';
import dotenv from 'dotenv';

import utils from './../utils/index';

const { pgConnect, tokens } = utils;

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
    const {
      requestTitle, requestBody, date, userId
    } = req.body;

    const data = {
      requestTitle,
      requestBody,
      date,
      userId
    };

    const rules = {
      requestTitle: 'required|min:10',
      requestBody: 'required|min:10',
      date: 'required',
      userId: 'required|integer'
    };

    const errorMessages = {
      requestTitle: 'the request title is required| the request title should have a minimum of 10 charaters',
      requestBody: 'the request body is required| the request body should have a minimum of 10 charaters',
      date: 'date is required',
      userId: 'the user id is required|user id must be an integer'
    };

    const validation = new Validator(data, rules, errorMessages);

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
   * @desc validates the signup fields
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} next
   */
  static validateSignup(req, res, next) {
    const fails = [];
    if (!req.body.firstName || req.body.firstName === undefined) {
      fails.push('first name is required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    if (req.body.firstName === '') {
      fails.push('first name cannot be empty');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    if (req.body.firstName.length <= 1) {
      fails.push('first name should be greater than 1 character');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (!req.body.lastName || req.body.lastName === undefined) {
      fails.push('last name is required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    if (req.body.lastName === '') {
      fails.push('last name cannot be empty');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    if (req.body.lastName.length <= 1) {
      fails.push('last name should be greater than 1 character');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (!req.body.email || req.body.email === undefined) {
      fails.push('email is required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    if (!validator.isEmail(req.body.email.toString())) {
      fails.push('Valid email required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (req.body.phoneNumber === undefined) {
      fails.push('valid phone number is required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (req.body.phoneNumber.length <= 8) {
      fails.push('phone number must exceed 8 characters');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (!req.body.password || req.body.password === undefined) {
      fails.push('valid password required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (req.body.password.length <= 6) {
      fails.push('Password must exceed 6 characters');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (!req.body.confirmPassword || req.body.confirmPassword === undefined) {
      fails.push('you need to confirm your password');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    if (!validator.equals(req.body.password, req.body.confirmPassword)) {
      fails.push('Passwords must match');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    return next();
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
    const fails = [];
    if (req.body.email === undefined) {
      fails.push('Email is required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (!validator.isEmail(req.body.email.toString())) {
      fails.push('Valid email required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (req.body.password === undefined) {
      fails.push('Valid password required');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }

    if (req.body.password.length <= 6) {
      fails.push('Password must exceed 6 characters');
      return res.status(400).send({
        status: 'fail',
        message: fails
      });
    }
    return next();
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


