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
      const { requestId } = req.params;
      const { requestStatus } = req.body;

      if (!Number.isInteger(Number(requestId))) {
        return res.status(400).json({
          status: 'failed',
          message: 'Input must be an Integer'
        });
      }
      if (requestStatus !== 'pending') {
        return res.status(403).json({
          status: 'failed',
          message: 'Input must pending!!! '
        });
      }

      const approveARequestQuery = `
            UPDATE requests
            SET 
            request_status='${requestStatus}'
            WHERE id=${requestId}
            AND request_status='processing'
            returning *;
          `;

      const approvedRequest = await client.query(approveARequestQuery);

      if (approvedRequest.rows.length < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'request not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          request: approvedRequest.rows[0]
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
