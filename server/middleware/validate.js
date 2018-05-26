export default {
    requestRules : { 
        requestTitle: 'required|min:10|string',
        requestBody: 'required|min:10|string',
        date: 'required|date',
        userId: 'required|integer'
    },

    requestErrorMessage: {
        requestTitle: 'the request title is required| the request title should have a minimum of 10 charaters',
        requestBody: 'the request body is required| the request body should have a minimum of 10 charaters',
        date: 'date should be valid with the format YYYY-MM-DD',
        userId: 'the user id is required|user id must be an integer'
    },

    userRules: {
        firstName: 'required|min:3|alpha',
        lastName: 'required|min:3|alpha',
        phoneNumber: 'required|min:7|numeric',
        email: 'required|email',
        password: 'required|min:7|confirmed',
        password_confirmation: 'required',
    },

    userErrorMessage: {
        firstName: 'the first name is required| the first name should have a minimum of 3 charaters| the first name should be an alphabet',
        lastName: 'the last name is required| the last name should have a minimum of 3 charaters| the last name should be an alphabet',
        phoneNumber: 'the phone number is required| the phone number should have a minimum length of 3| input a valid phone number',
        email: 'the email is required|the email must be valid',
        password: 'the password id required| the password length should have a minimum of 7|you need to confirm your password',
        password_confirmation: 'pass confirmation is required' 
    },

    loginRules: {
        email: 'required|email',
        password: 'required|min:7',
    },

    loginErrorMessage: {
        email: 'the email is required|the email must be valid',
        password: 'the password id required| the password length should have a minimum of 7'
    }
}