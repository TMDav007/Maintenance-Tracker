import { expect } from 'chai';
import request from 'supertest';
import app from './../server';

let token;

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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
        done();
      });
  });

  it('it should login ', (done) => {
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
        token = res.body.data.token;
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
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
        expect(res.body.status).to.equal('error');
        done();
      });
  });
});
