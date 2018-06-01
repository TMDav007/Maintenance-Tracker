import utils from './../utils/index';
import queries from './../utils/query';
import response from './../utils/errorMessage';

const { pgConnect, tokens } = utils;
const { errorResponse} = response;
const { getAllUsersRequestsQuery, getAUsersRequestQuery,
       createARequestQuery, modifyARequestQuery,
       checkRequestQuery, requestIsUniqueQuery } = queries;

const client = pgConnect();
client.connect();

/**
 * it is a class that control all a requests method
 * 
 * @class RequestsController
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
      const requests = await client.query(getAllUsersRequestsQuery(token.id));

      if (requests.rows.length < 1) {
        return errorResponse(res, 'fail', 'request not found', 404);
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
   *@desc  it gets a users requests
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
      const request = await client.query(getAUsersRequestQuery(requestId, token.id));
      if (request.rows.length < 1) {
        return errorResponse(res, 'fail', 'request not found', 404);
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
  static async createRequest(req, res) {
    try {
      const token = await tokens(req);
      const { requestTitle, requestBody, date} = req.body;
      const requestIsUnique = await client.query(requestIsUniqueQuery(requestTitle, requestBody, token.id))
    
       if (requestIsUnique.rows.length !== 0) {
        return errorResponse(res, 'fail', 'request already exist', 409);
       }
      const request = await client.query(createARequestQuery(requestTitle,requestBody, date, token.id));
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
  static async updateRequest(req, res) {
    try {
      const token = await tokens(req);
      const { id } = req.params;
      const { request_title, request_body } = req.body;

      if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
          status: 'failed',
          message: 'Input must be an Integer'
        });
      }

      const request = await client.query(checkRequestQuery(id, token.id));
      if (request.rows.length < 1) {
        return errorResponse(res, 'failed', 'request not found', 404);
      }
      const mergedRequest= { ...request.rows[0], ...req.body };
      const updatedRequest = await client.query(modifyARequestQuery(mergedRequest.request_title, mergedRequest.request_body, id, token.id));
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
}

export default RequestsController;
