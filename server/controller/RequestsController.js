import utils from "./../utils/index";

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
   * @param {object} res
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

      if (requests.rows.length < 1) {
        return res.status(404).json({
          status: 'fail',
          message: 'request not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          requests: requests.rows
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
   *@desc  it gets all users requests
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async getARequest(req, res) {
    try {
      const token = await tokens(req);
      const { requestId } = req.params;

      if (!Number.isInteger(Number(requestId))) {
        return res.status(400).json({
          status: 'fail',
          message: 'Input must be an Integer'
        });
      }

      const getAUserRequestQuery = `
          SELECT 
          requests.id,
          requests.request_title,
          requests.request_body,
          requests.request_status,
          requests.date
          FROM requests
          WHERE requests.id = ${requestId}
          AND requests.user_id = ${token.id};
      `;

      const request = await client.query(getAUserRequestQuery);

      if (request.rows.length < 1) {
        return res.status(404).json({
          status: 'fail',
          message: 'request not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          request: request.rows[0]
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
   *@desc  it create creates a requests
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} an object
   */
  static async createARequest(req, res) {
    try {
      const { requestTitle, requestBody, date, userId } = req.body;

      const createARequestQuery = `
                INSERT INTO requests (
                  request_title,
                  request_body,
                  date,
                  user_id
                )
                VALUES (
                  '${requestTitle}',
                  '${requestBody}',
                  '${date}',
                  '${userId}'
                ) returning *;
              `;

      const request = await client.query(createARequestQuery);

      return res.status(201).json({
        status: 'success',
        data: {
          request: request.rows[0]
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
   *@desc  it modifies a requests
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} the updated request
   */
  static async updateARequest(req, res) {
    try {
      const token = await tokens(req);
      const { id } = req.params;
      const { requestTitle, requestBody } = req.body;

      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
          status: 'failed',
          message: 'Input must be an Integer'
        });
      }

      const modifyARequestQuery = `
            UPDATE requests
            SET 
            request_title='${requestTitle}',
            request_body='${requestBody}'
            WHERE requests.id=${id}
            AND requests.user_id=${token.id}
            returning *;
          `;

      const updatedRequest = await client.query(modifyARequestQuery);

      if (updatedRequest.rows.length < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'request not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          request: updatedRequest.rows[0]
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
 *@desc  it create creates a requests
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} the created request
 */
  static async createARequest(req, res) {
    try {
      const {
        requestTitle, requestBody, date, userId
      } = req.body;

      const createARequestQuery = `
                INSERT INTO requests (
                  request_title,
                  request_body,
                  date,
                  user_id
                )
                VALUES (
                  '${requestTitle}',
                  '${requestBody}',
                  '${date}',
                  '${userId}'
                ) returning *;
              `;

      const request = await client.query(createARequestQuery);

      return res.status(201).json({
        status: 'success',
        data: {
          request: request.rows[0]
        }
      });
    }  catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
  }

  /**
 *@desc  it modifies a requests
 *
 * @param {object} req
 * @param {object} res
 *
 * @return {object} the updated request
 */
  static async updateARequest(req, res) {
    try {
      const token = await tokens(req);
      const { id } = req.params;
      const { requestTitle, requestBody } = req.body;

      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
          status: 'failed',
          message: 'Input must be an Integer'
        });
      }

      const modifyARequestQuery = `
              UPDATE requests
              SET 
              request_title='${requestTitle}',
              request_body='${requestBody}'
              WHERE requests.id=${id}
              AND requests.user_id=${token.id}
              returning *;
            `;

      const updatedRequest = await client.query(modifyARequestQuery);

      if (updatedRequest.rows.length < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'request not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          request: updatedRequest.rows[0]
        }
      });
    }  catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

export default RequestsController;
