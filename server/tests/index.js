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
describe('/POST a users requests', () => {
  it('it should POST a users requests', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        name: 'Okafor',
        request: 'Request to fix the AC',
        requestDetails: 'The AC stopped working some days ago, I will like it to get fixed on time. Thank you',
        date: '06-05-2018'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.eql('success');
        done();
      });
  });
  it('it should POST a users requests', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .send({
        name: 'Okafor-John',
        request: 'Request to fix the AC',
        requestDetails: 'The AC stopped working some days ago, I will like it to get fixed on time. Thank you',
        date: '06-05-2018'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.status.should.eql('error');
        done();
      });
  });
});

describe('/GET a users request', () => {
  it('it should GET a users request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.eql('success');
        done();
      });
  });
  it('it should not GET a users request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/13')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status');
        res.body.status.should.eql('error');
        done();
      });
  });
  it('it should not GET a users request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/s')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status');
        res.body.status.should.eql('error');
        done();
      });
  });
  it('it should not GET a users request', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status');
        res.body.status.should.eql('error');
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
