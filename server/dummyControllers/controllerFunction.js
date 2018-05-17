import users from './../dummyModels/user';

const checkForAdmin = () => {
  const admin = users.filter(user => user.role === 'admin');
  // check if user is admin to get all request
  if (admin.length !== 0) {
    return admin;
  }
};

export default { checkForAdmin };
