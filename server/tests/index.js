import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

// users requests
describe('/GET all users requests', () => {
  it('it should GET all users requests', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.eql('success');
        done();
      });
  });
});

describe('/PUT a users request', () => {
  it('it should PUT a users request', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/3')
      .send({ date: '12-03-2019' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.eql('success');
        done();
      });
  });
  it('it should not PUT a users requests', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/13')
      .send({ date: '12-03-2019' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status');
        res.body.status.should.eql('error');
        done();
      });
  });
  it('it should not PUT a users requests', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/s')
      .send({ date: '12-03-2019' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.status.should.eql('error');
        done();
      });
  });
});

