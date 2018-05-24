import utils from './../utils/index';

const { pgConnect, tokens } = utils;

const client = pgConnect();
client.connect();

/**
 * it is a class that control all a requests method
 */
class RequestsController {
  /**
 * @desc it gets all users requests
 *
 * @param {string} req
 * @param {string} res
 *
 * @return {object} an object
 */
  static async getRequests(req, res) {
    try {
      const token = await tokens(req);
      const getAllUserRequestsQuery = `
            SELECT 
            requests.id,
            requests.request_title,
            requests.request_body,
            requests.request_status,
            requests.date
            FROM requests
            WHERE requests.user_id = ${token.id}
        `;

      const requests = await client.query(getAllUserRequestsQuery);

      // check if there's is a request
      if (requests.rows.length < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'request not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          requests: requests.rows,
        }
      });
    } catch (error) { res.status(500).send(error.message); }
  }
}

export default RequestsController;
