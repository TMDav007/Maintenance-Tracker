import utils from './../utils/index';
import adminQuery from './../utils/adminQuery';
import error from './../utils/errorMessage';
import queries from './../utils/query';

const { pgConnect } = utils;
const { integerError } = error;
const { query, checkInteger } = adminQuery;
const { getAllRequestsQuery } = queries

const client = pgConnect();
client.connect();

/**
 * It is a class that contoller the admin endpoint
 * 
 * @class AdminContoller
 */
class AdminController {
  /**
   * @desc it gets all requests
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} get all request
   */
  static async getAllRequests(req, res) {
    try {
      
      const requests = await client.query(getAllRequestsQuery());
      return res.status(200).json({
        status: 'success',
        data: {
          requests: requests.rows
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message
      });
    }
  }

  /**
   *@desc approve a requests by an admin
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} the approved  request
   */
  static async approveARequest(req, res) {
    try {
         return query(req, res, 'pending');
        } catch (error) {
          res.status(500).json({
            status: "fail",
            message: error.message
          });
      }
  }

  /**
   *@desc disapprove a requests by an admin
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} the disapproved request
   */
  static async disapproveARequest(req, res, test) {
    try {
    return  query(req, res, 'disapproved');
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error.message
      });
    }
  }

  /**
   *@desc resolve a requests by an admin
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} the resolve request
   */
  static async resolveARequest(req, res) {
      try {
        return query(req, res, 'resolved');
        } catch (error) {
          res.status(500).json({
            status: "fail",
            message: error.message
          });
      }
    }
}

export default AdminController;
