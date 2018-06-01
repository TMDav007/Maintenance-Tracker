import UsersController from './../controller/UsersController';
import RequestsController from './../controller/RequestsController';
import AdminController from './../controller/AdminController';
import Middleware from './../middleware/Middleware';

const {
  signUp, login
} = UsersController;

const {
  getRequests, getARequest, createRequest, updateRequest
} = RequestsController;

const {
  getAllRequests, approveARequest, disapproveARequest, resolveARequest
}
 = AdminController;

const {
  validateLogin, validateRequest, validateUser,
  authenicateUser, authenicateAdmin, checkMail, checkPhoneNumber
} = Middleware;

const routes = (app) => {
    
  app.post('/api/v1/auth/signup', validateUser, checkMail, checkPhoneNumber, signUp);
  app.post('/api/v1/auth/login', validateLogin, login);

  app.get('/api/v1/users/requests', authenicateUser, getRequests);
  app.get('/api/v1/users/requests/:requestId', authenicateUser, getARequest);
  app.post('/api/v1/users/requests', validateRequest, authenicateUser, createRequest);
  app.put('/api/v1/users/requests/:id', authenicateUser, updateRequest);

  app.get('/api/v1/requests', authenicateAdmin, getAllRequests);
  app.put('/api/v1/requests/:requestId/approve', authenicateAdmin, approveARequest);
  app.put('/api/v1/requests/:requestId/disapprove', authenicateAdmin, disapproveARequest);
  app.put('/api/v1/requests/:requestId/resolve', authenicateAdmin, resolveARequest);
};

export default routes;
