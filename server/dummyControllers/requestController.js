import requests from './../dummyModels/requests';
import dummyControllerFunction from './dummyControllerFunction';

const { checkForAdmin, checkName } = dummyControllerFunction;

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
      return res.status(201).json({
        status: 'success',
        data: {
          requests
        }
      });
    }
  }
}

export default RequestController;

