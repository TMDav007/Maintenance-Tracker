import utils from './../utils/index';
import adminQuery from './../utils/adminQuery';
import error from './../utils/errorMessage';
import queries from './../utils/query';

const { pgConnect } = utils;
const { errorResponse } = error;
const { query, checkInteger } = adminQuery;
const { getAllRequestsQuery, getAdminRequestQuery, deleteAdminRequestQuery } = queries

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

      /**
   *@desc  it deletes a users request
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async deleteUserRequest(req, res) {
    try {
      const { requestId } = req.params;
      if (!Number.isInteger(Number(requestId))) {
        return res.status(400).json({
          status: 'fail',
          message: 'Input must be an Integer'
        });
      }
      const requestExist = await client.query(getAdminRequestQuery(requestId));
      if (requestExist.rows.length === 0) {
        return errorResponse(res, 'fail', 'request not found', 404);
      }
      const request = await client.query(deleteAdminRequestQuery(requestId));
      return res.status(200).json({
        status: 'success',
        message: 'request successfully deleted'
      });
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

export default AdminController;
