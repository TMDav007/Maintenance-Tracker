import dbConnect from './index';
import adminQueries from './query';
import response from './errorMessage';

const { errorResponse } = response
const { pgConnect } = dbConnect;
const { adminQuery } = adminQueries;

const client = pgConnect();
client.connect();

/**
 * @desc it updates a request status by an admin
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {string} queryCondition 
 * 
 * @return {object} the updated row
 */
const query = async (req, res, queryCondition) => {
    const { requestId } = req.params;
    
    if (!Number.isInteger(Number(requestId))) {
        return errorResponse(res, 'failed', 'Input must be an Integer', 400);
      }
  

        const result = await client.query(adminQuery(queryCondition, requestId));
        if (result.rows.length < 1) {
          return errorResponse(res, 'failed', 'request not found', 404);
        }
  
        return res.status(200).json({
          status: "success",
          data: {
            request: result.rows[0]
          }
        });
  
  }

  export default { query };