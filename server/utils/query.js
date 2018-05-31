/**
 * @desc query to get all request by an admin
 * 
 * @return {string} query
 */
const getAllRequestsQuery = () => { 
    const query = `
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
    return query;
}

/**
 * @desc query to get a user request
 * 
 * @param {integer} condition 
 * 
 * @return {string} query
 */
const getAllUsersRequestsQuery = (condition) => {
    const query = `
            SELECT 
            requests.id,
            requests.request_title,
            requests.request_body,
            requests.request_status,
            requests.date
            FROM requests
            WHERE requests.user_id = ${condition}
        `;
    return query;
}

/**
 * @desc query to get a users request
 * 
 * @param {integer} condition1 
 * @param {integer} condition2 
 * 
 * @return {string} query
 */
const getAUsersRequestQuery = (condition1, condition2) => {
    const query = `
        SELECT 
        requests.id,
        requests.request_title,
        requests.request_body,
        requests.request_status,
        requests.date
        FROM requests
        WHERE requests.id = ${condition1}
        AND requests.user_id = ${condition2};
        `;
    return query;
}

/**
 * @desc query to get create a request
 * 
 * @param {string} value1 
 * @param {string} value2 
 * @param {string} value3 
 * @param {integer} value4 
 * 
 * @return {string} query
 */
const createARequestQuery = (value1, value2, value3, value4) => {
    const query = `
            INSERT INTO requests (
                request_title,
                request_body,
                date,
                user_id
            )
            VALUES (
                '${value1}',
                '${value2}',
                '${value3}',
                '${value4}'
            ) returning *;
        `;
    return query;
}

const requestIsUniqueQuery = (value1, value2, value3) => {
    const query = `
    SELECT
    request_title,
    request_body,
    request_status,
    date
    from requests
    WHERE request_title='${value1}'
    AND request_body='${value2}'
    AND request_status='processing'
    AND requests.user_id='${value3}';
    `;
    return query;
}

/**
 * @desc query to check a request before update
 * 
 * @param {string} value1 
 * @param {string} value2 
 * @param {integer} value3 
 * @param {integer} value4 
 * 
 * @return {string} query
 */
const checkRequestQuery = (value1, value2,) => {
    const query = `
            SELECT 
            request_title,
            request_body
            from requests
            WHERE requests.id=${value1}
            AND requests.user_id=${value2}
            AND request_status='processing';
    `;
    return query;
} 

/**
 * @desc query to modify a request
 * 
 * @param {string} value1 
 * @param {string} value2 
 * @param {string} value3 
 * @param {integer} value4 
 * @param {integer} value5 
 * 
 * @return {string} query
 */
const modifyARequestQuery = (value1, value2, value3, value4) => {
    const query =  `
            UPDATE requests
            SET 
            request_title='${value1}',
            request_body='${value2}'
            WHERE requests.id=${value3}
            AND requests.user_id=${value4}
            returning *;
            `;
    return query;
}

/**
 * @desc query a create a new user
 * 
 * @param {string} value1 
 * @param {string} value2 
 * @param {string} value3 
 * @param {string} value4 
 * @param {string} value5
 * 
 * @return {string} query 
 */
const createUserQuery = (value1, value2,value3, value4, value5) => {
    const query =  `
    INSERT INTO users (
        first_name,
        last_name,
        phone_number,
        email,
        password
    ) 
    VALUES (
        '${value1}',
        '${value2}',
        '${value3}',
        '${value4}',
        crypt('${value5}', gen_salt('${process.env.KEY}', 5))
    ) RETURNING *;    
`;
return query;
}

/**
 * @desc query to login a user
 * 
 * @param {string} value1 
 * @param {string} value2 
 * 
 * @return {string} a query
 */
const loginQuery = (value1, value2) => {
    const query = `
            SELECT * 
            FROM users
            WHERE email = '${value1}'
            AND password = crypt('${value2}', password)
`;
    return query;
} 

/**
 * 
 * @param {string} value1 
 * @param {integer} value2 
 */
const adminQuery = (value1, value2) => {
    const query = `
        UPDATE requests
        SET 
        request_status='${value1}'
        WHERE id=${value2}
        AND request_status='processing'
        returning *;
    `;

    return query;
}

export default { 
    getAllRequestsQuery,
    getAllUsersRequestsQuery,
    getAUsersRequestQuery,
    createARequestQuery,
    checkRequestQuery,
    createUserQuery,
    loginQuery,
    adminQuery,
    requestIsUniqueQuery,
    modifyARequestQuery
};
