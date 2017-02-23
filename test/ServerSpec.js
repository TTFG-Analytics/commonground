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

  describe('GET all discussions', () => {
    it('should list ALL discussions on /discussions GET', (done) => {
      chai.request(server)
      .get('/discussions')
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('input');
        res.body[0].should.have.property('createdat');
        res.body[0].should.have.property('user_id');
        done();
      });
    });
  });

  describe('GET /discussion/:discussionId', () => {
    it('should return a SINGLE discussion', (done) => {
      chai.request(server)
      .get('/discussion/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.property('id');
        res.body.should.have.property('input');
        res.body.should.have.property('createdat');
        res.body.should.have.property('user_id');
        done();
      });
    });
  });

  describe('GET /comments/<campId>', () => {
    it('should return ALL commonground comments', (done) => {
      chai.request(server)
      .get('/discussion/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('input');
        res.body[0].should.have.property('createdat');
        res.body[0].should.have.property('upvotecounter');
        res.body[0].should.have.property('downvotecounter');
        res.body[0].should.have.property('delta');
        res.body[0].should.have.property('flag');
        res.body[0].should.have.property('commonground_id');
        res.body[0].should.have.property('user_id');
        done();
      });
    });
  });

  describe('POST /comment', () => {
    it('should be inserting a comment into the db', (done) => {
      chai.request(server)
      .post('/comment')
      .send('')//need to fill this out
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a.('array');
        done();
      })
    });
  });

  describe('POST /commonground', () => {  
    it('should be inserting a commonground into the db on /commonground Post', (done) =>{      
    
    });
  })

  describe('POST /vote', () => {  
  it('should be inserting a vote into the db on /vote Post', (done) => {
  
  });
});

  describe('GET /profile', () => {
    it('should be getting user profile data from the db', (done) => {
      chai.request(server)
      .get('/profile')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.property('id');
        res.body.should.have.property('facebookid');
        res.body.should.have.property('fullname');
        res.body.should.have.property('title');
        res.body.should.have.property('age');
        res.body.should.have.property('hometown');
        res.body.should.have.property('gender');
        res.body.should.have.property('race');
        res.body.should.have.property('industry');
        res.body.should.have.property('politicalleaning');
        res.body.should.have.property('religion');
        res.body.should.have.property('yearlyincome');
        res.body.should.have.property('email');
        res.body.should.have.property('facebookpicture');
        res.body.should.have.property('locale');
        res.body.should.have.property('admin');
        res.body.should.have.property('timestamp');
        done()
      });
    });  
  });

  describe('POST /vote', () => {  
    it('should be inserting or updating user data in the db', (done) => {
  
  });
});

  describe('GET /analytics/:campName/:demographic', () => {  
    it('should be pulling campground data from the db', (done) => {
      chai.request(server)
      .get('/profile')
      .end((err,res) => {
        res.should.have.status(200); 
        res.should.be.json;
        res.should.body.should.be.a.('array')
        // need
        // to
        // fill
        // in
        // here
        done();
      });
    });
  });

  describe('GET /voteanalytics/:commentId/:demographic', () => {  
    it('should be pulling comment vote data from the db', (done) => {
      chai.request(server)
      .get('/profile')
      .end((err,res) => {
       res.should.have.status(200);
       res.should.be.json;
       res.should.body.should.be.a('array')
        // need
        // to
        // fill
        // in
        // here
        done(); 
      })
    });
  });  

  
  describe('GET /../public/index.html', () => {
    it('should redirict user on faulty route', (done) => {
      chai.request(server)
      .get('/haberdashery')
      .end((err, res) => {
        res.should.have.status(300);
        done()
      });
    });  
  });

})