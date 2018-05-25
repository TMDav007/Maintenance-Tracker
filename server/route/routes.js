import UsersController from './../controller/UsersController';
import RequestsController from './../controller/RequestsController';
import Middleware from './../middleware/Middleware';

const {
  signUp, login
} = UsersController;

const { getRequests, getARequest, createARequest } = RequestsController;

const {
  validateSignup, validateLogin, validateRequest, authenicateUser, checkMail, checkPhoneNumber
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

  // requests
  app.get('/api/v1/users/requests', authenicateUser, getRequests);
  app.get('/api/v1/users/requests/:requestId', authenicateUser, getARequest);
  app.post('/api/v1/users/requests', validateRequest, authenicateUser, createARequest);
};

export default routes;
