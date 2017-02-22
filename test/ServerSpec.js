process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require ('../server/index');
const knex = require('../db/knex')
const should = chai.should();

chai.use(chaiHttp)

describe('Server API routes', () => {

  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('Get all discussions', () => {
    it('should list ALL discussions on /discussions GET', (done) => {
      chai.request(server)
        .get('/discussions')
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('id')
          res.body[0].should.have.property('input')
          res.body[0].should.have.property('createdat')
          res.body[0].should.have.property('user_id')
          done();
        });
    });
  });
  describe('Get /discussion/:discussionId', () => {
    it('should return a SINGLE discussion', (done) => {
      chai.request(server)
        .get('/discussion/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.property('id')
          res.body.should.have.property('input')
          res.body.should.have.property('createdat')
          res.body.should.have.property('user_id')
        })
    });
  });
  it('should list all commonground comments on /comments/<campId> GET');
  
  it('should be inserting a comment into the db on /comment Post', (done) => {
    chai.request(server)
    .post('/comment')
    .send('')//need to fill this out
    .end((err,res) => {
      res.should.have.status(200);
      res.body.should.be.a.('array');
      done();
    })
  });

  it('should be inserting a comment into the db on /commonground Post');

  it('should be inserting a vote into the db on /vote Post');

  it('should be getting data from the db on /Profile GET');
  it('should be inserting or updating db information on /Profile POST');

  it('should be inserting or updating db information on /Profile POST');

  it('should be pulling data from the db on /analytics/:campName/:demographic GET');
  it('should be pulling data from the db on /voteanalytics/:commentId/:demographic GET');

  it('should redirict to /../public/index.html on /* GET');  
})