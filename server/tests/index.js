import { expect } from 'chai';
import request from 'supertest';
import app from './../server';

let token, token2;

// Test for sign up
describe('user validation', () => {
  it('it should signup user', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiffihi',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        confirmPassword: 'Opeyemi22',
        user_role: 'admin'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('newUser');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('it should not signup user with an existing email', (done) => {
    // variable detail
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiffihi',
        email: 'fifi@yahoo.com',
        phoneNumber: '0809483746',
        password: 'Opeyemi22',
        confirmPassword: 'Opeyemi22',
        user_role: 'admin'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should signup user with an existing phone number', (done) => {
    // variable detail
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiffihi',
        email: 'fifii@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        confirmPassword: 'Opeyemi22',
        user_role: 'admin'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with an empty first name', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: '',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with no first name', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with no email', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with invalid email', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        email: 'hsdhfjdsj',
        phoneNumber: '08095483746',
        password: 'Opeyemi22',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with an empty first name', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: '',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemuy2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with short first name', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'f',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemuy2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with unmatched password', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemuy2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with short password', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Ope2',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with an unconfirmed password', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemuy2',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with no Phone number', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        password: 'Opeyemi22',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with no last name', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemuy2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with short last name', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'f',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemuy2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user an empty lastName', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: '',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Opeyemuy2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not signup user with short phone number', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '080946',
        password: 'Opeyemuy22',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with no last name', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: 'Ope2',
        role: 'user',
        confirmPassword: 'Opeyemi22'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not signup user with an empty password', (done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'fififi',
        lastName: 'fiff',
        email: 'fifi@yahoo.com',
        phoneNumber: '08095483746',
        password: '',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// Test for login
describe('user validation{login)', () => {
  it('it should not login with an incorrect email ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tuwalase'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should login ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'abraham@yahoo.com',
        password: 'abraham'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('token');
        expect(res.body.status).to.equal('success');
        /* eslint-disable prefer-destructuring */
        token = res.body.data.token;
        done();
      });
  });
  it('it should login to give a different token ', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'opemipo@yahoo.com',
        password: 'opemipo'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('token');
        expect(res.body.status).to.equal('success');
        /* eslint-disable prefer-destructuring */
        token2 = res.body.data.token;
        done();
      });
  });
  it('should not login with an incorrect password ', (done) => {
  // variable details
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'opemipo@yahoo.com',
        password: 'opemi1'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('should not login with an no email ', (done) => {
    // variable details
    request(app)
      .post('/api/v1/auth/login')
      .send({
        password: 'opppp'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('should not login with an no password ', (done) => {
  // variable details
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'opemipo@yahoo.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// Test to GET all users Requests
describe('GET all users requests', () => {
  it('it should GET all users Request', (done) => {
    request(app)
      .get('/api/v1/users/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('requests');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not GET users Request', (done) => {
    request(app)
      .get('/api/v1/users/requests')
      .set('x-access-token', token2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('request not found');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not GET users Request with no access', (done) => {
    request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('forbidden to non user');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// Test to GET a user's Request
describe('GET a user request', () => {
  it('it should GET a user Request', (done) => {
    request(app)
      .get('/api/v1/users/requests/2')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('request');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not GET a user Request', (done) => {
    request(app)
      .get('/api/v1/users/requests/5')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('request not found');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not GET Request with no access', (done) => {
    request(app)
      .get('/api/v1/users/requests/3')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('forbidden to non user');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not GET Request with no access', (done) => {
    request(app)
      .get('/api/v1/users/requests/d')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Input must be an Integer');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// it should create a request
describe('create a request', () => {
  it('it should  create a users request', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestTitle: 'Request to fix the AC',
        requestBody: 'The AC stopped working some days ago, I will like it to get fixed on time. Thank you',
        date: '2019-04-09',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.haveOwnProperty('request');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should not  create for an unauthorized user ', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .send({
        requestTitle: 'Request to fix the AC',
        requestBody: 'The AC stopped working some days ago, I will like it to get fixed on time. Thank you',
        date: '2019-04-09',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should no create users request without a request title', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestBody: 'The AC stopped working some days ago, I will like it to get fixed on time. Thank you',
        date: '2019-04-09',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should no create users with short request title', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestTitle: 'thebfh',
        requestBody: 'The AC stopped working some days ago, I will like it to get fixed on time. Thank you',
        date: '2019-04-09',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not create users request with no request body', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        date: '2019-04-09',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not create users request with short request body', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'jdfhdd',
        date: '2019-04-09',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not create request with no date ', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'the request body is required noejur',
        userId: 2
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });

  it('it should not create request with no userId ', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'the request body is required noejur',
        date: '98-04-995',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
  it('it should not create request when userId is not integer ', (done) => {
    request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'the request body is required noejur',
        date: '98-04-995',
        userId: 'id'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data).to.haveOwnProperty('error');
        expect(res.body.status).to.equal('fail');
        done();
      });
  });
});

// Test to modify a user's Request
describe('UPDATE a user request', () => {
  it('it should GET update a users request', (done) => {
    request(app)
      .put('/api/v1/users/requests/2')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'the request body is required noejur',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.haveOwnProperty('request');
        expect(res.body.data.request).to.be.an('object');
        expect(res.body.data.request).to.be.haveOwnProperty('id');
        expect(res.body.data.request).to.be.haveOwnProperty('request_title');
        expect(res.body.data.request).to.be.haveOwnProperty('request_body');
        expect(res.body.data.request).to.be.haveOwnProperty('request_status');
        expect(res.body.data.request).to.be.haveOwnProperty('date');
        expect(res.body.data.request).to.be.haveOwnProperty('user_id');
        expect(res.body.status).to.equal('success');
        done();
      });
  });
  it('it should GET update a users request', (done) => {
    request(app)
      .put('/api/v1/users/requests/s')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'the request body is required noejur',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Input must be an Integer');
        expect(res.body.status).to.equal('failed');
        done();
      });
  });
  it('it should GET update a users request', (done) => {
    request(app)
      .put('/api/v1/users/requests/3.6')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'the request body is required noejur',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Input must be an Integer');
        expect(res.body.status).to.equal('failed');
        done();
      });
  });
  it('it should GET update a users request', (done) => {
    request(app)
      .put('/api/v1/users/requests/6')
      .set('x-access-token', token)
      .send({
        requestTitle: 'fix the tv now',
        requestBody: 'the request body is required noejur',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('request not found');
        expect(res.body.status).to.equal('failed');
        done();
      });
  });
});

