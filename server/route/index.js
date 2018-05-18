import RequestController from './../dummyControllers/UserRequestController';

const {
  getAllRequests, getARequest, addRequest, updateRequest
} = RequestController;

const routes = (app) => {
  app.get('', (req, res) =>
    res.status(200).send({
      message: 'Welcome to Maintenance-Tracker App, add "/api/v1/" to use the api'
    }));

  app.get('/api/v1/', (req, res) =>
    res.status(200).send({
      message: 'to view api, add /request'
    }));

  // Requests
  app.get('/api/v1/users/requests', getAllRequests);
  app.put('/api/v1/users/requests/:id', updateRequest);
  app.post('/api/v1/users/requests', addRequest);
  app.get('/api/v1/users/requests/:id', getARequest);
};

export default routes;
