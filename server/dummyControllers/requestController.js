import requests from './../dummyModels/request';
import dummyControllerFunction from './controllerFunction';

const { checkForAdmin } = dummyControllerFunction;

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
}

export default RequestController;

