import utils from './../utils/index';

const { pgConnect } = utils;

const client = pgConnect();
client.connect();


/**
 * it is a class that control all event method
 */
class AdminController {
  /**
 * @desc it gets all requests
 *
 * @param {string} req
 * @param {string} res
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
          requests: requests.rows,
        }
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
