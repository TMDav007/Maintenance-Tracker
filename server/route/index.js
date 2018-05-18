import RequestController from './../dummyControllers/RequestController';

const { getAllRequests, updateRequest } = RequestController;

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
};

export default routes;
