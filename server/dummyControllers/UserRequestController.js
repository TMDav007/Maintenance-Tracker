import requests from './../dummyModels/requests';
import dummyControllerFunction from './dummyControllerFunction';

const {
  checkForAdmin, getUser, checkName, checkForRequest
} = dummyControllerFunction;

/**
 * it is a class that control all request api;
 */
class UserRequestController {
  /**
     * it GET all requests
     * @param {string} req
     * @param {string} res
     * @returns {object} object
     */
  static getAllRequests(req, res) {
    const admin = checkForAdmin();
    if (!admin) {
      return res.status(403).json({
        status: 'error',
        message: 'you dont have the priviledge for this request'
      });
    }
    // get all request
    if (requests.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          requests
        }
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'requests not found'
      });
    }
  }

  /**
   * it Update a request
   * @param {string} req
   * @param {string} res
   * @returns {obiect} update request
   */
  static updateRequest(req, res) {
    // get request id
    const requestId = req.params.id;
    if (!Number.isInteger(Number(requestId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Input must be an Integer'
      });
    }
    // get request
    const foundRequest = checkForRequest(parseInt(requestId, 10));
    // check if request is found
    if (foundRequest) {
      const {
        name, request, requestDetails, date
      } = req.body;

      foundRequest.name = name || foundRequest.name;
      foundRequest.request = request || foundRequest.request;
      foundRequest.requestDetails = requestDetails || foundRequest.requestDetails;
      foundRequest.date = date || foundRequest.date;

      res.status(200).json({
        status: 'success',
        data: {
          request: foundRequest
        },
        message: 'Request updated successful'
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'request not found'
      });
    }
  }

  /**
   * it ADD a request
   * @param {string} req
   * @param {string} res
   * @returns {obiect} add request
   */
  static addRequest(req, res) {
    const id = requests.length + 1;
    const {
      name, request, requestDetails, date
    } = req.body;

    // check if name is already exisitng
    const foundName = checkName(name);
    if (foundName) {
      res.status(400).json({
        status: 'error',
        message: 'name is already exisitng'
      });
    } else {
      const newRequest = {
        id, name, request, requestDetails, date
      };
      requests.push(newRequest);
      res.status(201).json({
        status: 'success',
        data: {
          request: newRequest
        }
      });
    }
  }

  /**
 * it GET a requests
 * @param {string} req
 * @param {string} res
 * @return {object} an object
 */
  static getARequest(req, res) {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Input must be an integer'
      });
    }

    // get a request
    const newRequest = requests.filter(request => request.id === parseInt(id, 10));

    // if request is not found
    if (newRequest.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'request not found'
      });
    }
    // get user in users db
    const user = getUser(newRequest);

    // check if user not found exist in user db
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'user not found in the database'
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          request: newRequest
        }
      });
    }
  }
}

export default UserRequestController;
