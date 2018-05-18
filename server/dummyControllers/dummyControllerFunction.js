import users from './../dummyModels/users';
import requests from './../dummyModels/requests';

const checkForAdmin = () => {
  const admin = users.filter(user => user.role === 'admin');
  // check if user is admin to get all request
  if (admin.length !== 0) {
    return admin;
  }
};

const checkForRequest = (id) => {
  const foundRequest = requests.filter(request => request.id === id);
  // check if user is admin to get all request
  if (foundRequest.length !== 0) {
    return foundRequest;
  }
};


export default { checkForAdmin, checkForRequest };
