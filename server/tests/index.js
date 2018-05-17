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
