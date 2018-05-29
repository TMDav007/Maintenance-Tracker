import utils from './../utils/index';
import adminQuery from './../utils/adminQuery';
import error from './../utils/errorMessage';

const { pgConnect } = utils;
const { integerError } = error;
const { query, checkInteger } = adminQuery;

const client = pgConnect();
client.connect();

/**
 * it is a class that control all event method
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
      const getAllRequestsQuery = `
            SELECT 
            requests.id,
            request_title,
            request_body,
            request_status,
            requests.date,
            first_name,
            last_name,
            email
            FROM requests,users
            WHERE requests.user_id = users.id
        `;

      const requests = await client.query(getAllRequestsQuery);

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
        const approve = 'pending'
        const queryResult =  query(req, res, approve);
          return queryResult;
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
    const disapprove = 'disapproved'
    const queryResult =  query(req, res, disapprove);
      return queryResult;
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
        const resolved = 'resolved'
        const queryResult =  query(req, res, resolved);
          return queryResult;
        } catch (error) {
          res.status(500).json({
            status: "fail",
            message: error.message
          });
      }
    }
}

export default AdminController;
