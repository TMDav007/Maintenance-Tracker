import UsersController from './../controller/UsersController';
import Middleware from './../middleware/Middleware';

const {
  signUp, login
} = UsersController;
const {
  validateSignup, validateLogin, checkMail, checkPhoneNumber
} = Middleware;

const routes = (app) => {
  app.get('', (req, res) =>
    res.status(200).send({
      message: 'Welcome to Maintenance-Tracker App, add "/api/v1/" to use the api'
    }));

  app.get('/api/v1/', (req, res) =>
    res.status(200).send({
      message: 'to view api, add /request'
    }));

  // user
  app.post('/api/v1/auth/signup', validateSignup, checkMail, checkPhoneNumber, signUp);
  app.post('/api/v1/auth/login', validateLogin, login);
};

export default routes;
