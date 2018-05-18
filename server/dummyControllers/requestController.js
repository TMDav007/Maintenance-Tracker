import requests from './../dummyModels/requests';
import dummyControllerFunction from './dummyControllerFunction';

const { checkForAdmin, checkForRequest } = dummyControllerFunction;

/**
 * it is a class that control all request api;
 */
class RequestController {
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
    const requestId = parseInt(req.params.id, 10);
    if (!Number.isInteger(requestId)) {
      res.status(400).json({
        status: 'error',
        message: 'Input must be an Integer'
      });
    }
    // get request
    const foundRequest = checkForRequest(requestId);

    // check if request is found
    if (foundRequest) {
      const {
        name, request, requestDetails, date
      } = req.body;

      foundRequest[0].name = name || foundRequest[0].name;
      foundRequest[0].request = request || foundRequest[0].request;
      foundRequest[0].requestDetails = requestDetails || [0].requestDetails;
      foundRequest[0].date = date || foundRequest[0].date;

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
}

export default RequestController;

