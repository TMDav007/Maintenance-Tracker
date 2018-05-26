/**
 * @desc this is an error message
 * 
 * @param {object} res 
 * @param {string} status 
 * @param {string} message 
 * @param {integer} statusCode 
 * 
 * @return {object} returns an error message
 */

const errorResponse = (res, status, message,statusCode) => {
  return  res.status(statusCode).json({
        status,
        message
    });
}

export default { errorResponse };