import UsersController from './../controller/UsersController';
import RequestsController from './../controller/RequestsController';
import AdminController from './../controller/AdminController';
import Middleware from './../middleware/Middleware';

const {
  signUp, login
} = UsersController;

const {
  getRequests, getARequest, createARequest, updateARequest
} = RequestsController;

const {
  getAllRequests, approveARequest, disapproveARequest, resolveARequest
}
 = AdminController;

const {
  validateSignup, validateLogin, validateRequest,
  authenicateUser, authenicateAdmin, checkMail, checkPhoneNumber
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

  app.post('/api/v1/auth/signup', validateSignup, checkMail, checkPhoneNumber, signUp);
  app.post('/api/v1/auth/login', validateLogin, login);

  app.get('/api/v1/users/requests', authenicateUser, getRequests);
  app.get('/api/v1/users/requests/:requestId', authenicateUser, getARequest);
  app.post('/api/v1/users/requests', validateRequest, authenicateUser, createARequest);
  app.put('/api/v1/users/requests/:id', authenicateUser, updateARequest);

  app.get('/api/v1/requests', authenicateAdmin, getAllRequests);
  app.put('/api/v1/requests/:requestId/approve', authenicateAdmin, approveARequest);
  app.put('/api/v1/requests/:requestId/disapprove', authenicateAdmin, disapproveARequest);
  app.put('/api/v1/requests/:requestId/resolve', authenicateAdmin, resolveARequest);
};

export default routes;
