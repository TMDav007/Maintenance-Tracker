import dbConnect from './index';

const { pgConnect } = dbConnect;
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
    const { requestStatus } = req.body;
    
    if (!Number.isInteger(Number(requestId))) {
        return res.status(400).json({
            status: 'failed',
            message: 'Input must be an Integer'
          });
      }
  
    if (requestStatus !==   queryCondition) {
      return res.status(403).json({
        status: 'failed',
        message: `Input must be ${queryCondition}!!!`
      });
    }
    const query = `
          UPDATE requests
          SET 
          request_status='${requestStatus}'
          WHERE id=${requestId}
          AND request_status='processing'
          returning *;
        `;
  
        const result = await client.query(query);
        if (result.rows.length < 1) {
          return res.status(404).json({
            status: 'failed',
            message: 'request not found'
          });
        }
  
        return res.status(200).json({
          status: "success",
          data: {
            request: result.rows[0]
          }
        });
  
  }

  export default { query };