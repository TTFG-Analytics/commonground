process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require ('../server/index');
const knex = require('../db/knex')
const should = chai.should();

chai.use(chaiHttp)

describe('Server API routes', () => {

  beforeEach((done) => {
    console.log('----------------------------------')
    knex.migrate.rollback()
    .then(() => {
      console.log('++++++++++++++++++++++++++++++++++')
      knex.migrate.latest()
      .catch((err) => console.error(err))
      .then(() => {
        console.log('*********************************')
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
      .send({
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum'
      })
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      })
    });
  });

  describe('POST /commonground', () => {  
    it('should be inserting a commonground into the db on /commonground Post', (done) =>{      
      chai.request(server)
      .post('/commonground')
      .send({
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('Lorem')
        res.body.should.have.property('Lorem')
        res.body.should.have.property('Lorem')
        res.body.should.have.property('Lorem')
        res.body.should.have.property('Lorem')
        done();
      })
    });
  })

  describe('POST /vote', () => {  
    it('should be inserting a vote into the db', (done) => {
      chai.request(server)
      .post('/vote')
      .send({
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
        // lorem: 'ipsum',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('id')
        res.body.should.have.property('upvotecounter')
        res.body.should.have.property('downvotecounter')
        done();
      })
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

  describe('POST /profile', () => {
    it('should be uploading user profile data to the db', (done) => {
      chai.request(server)
      .post('/profile')
      .send({
        id: "50",
        facebookid: "737373737373737373",
        fullname: "James Joyce",
        title: "General Ulysses of Authors",
        age: "135",
        hometown: "Rathgar, Ireland",
        gender: "Male",
        race: "1",
        industry: "10",
        politicalleaning: "3",
        religion: "0",
        yearlyincome: "4",
        email: "jamesjoyce@aol.com",
        facebookpicture: "insert url here",
        locale: "IRL",
        admin: "0"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.property('id');
        res.body.id.should.equal('id');
        res.body.should.have.property('facebookid');
        res.body.facebookid.should.equal('737373737373737373');
        res.body.should.have.property('fullname');
        res.body.fullname.should.equal('James Joyce');
        res.body.should.have.property('title');
        res.body.fullname.should.equal('James Joyce');
        res.body.should.have.property('age');
        res.body.age.should.equal('135');
        res.body.should.have.property('hometown');
        res.body.hometown.should.equal('Rathgar, Ireland');
        res.body.should.have.property('gender');
        res.body.gender.should.equal('male');
        res.body.should.have.property('race');
        res.body.race.should.equal('1');
        res.body.should.have.property('industry');
        res.body.industry.should.equal('10');
        res.body.should.have.property('politicalleaning');
        res.body.politicalleaning.should.equal('3');
        res.body.should.have.property('religion');
        res.body.religion.should.equal('0');
        res.body.should.have.property('yearlyincome');
        res.body.yearlyincome.should.equal('4');
        res.body.should.have.property('email');
        res.body.email.should.equal('james.jouce@aol.com');
        res.body.should.have.property('facebookpicture');
        res.body.facebookpicture.should.equal('insert url here');
        res.body.should.have.property('locale');
        res.body.local.should.equal('IRL');
        res.body.should.have.property('admin');
        res.body.admin.should.equal('0');
        res.body.should.have.property('timestamp');
        done()
      });
    });  
  });

  describe('GET /analytics/:campName/:demographic', () => {  
    it('should be pulling campground data from the db', (done) => {
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
        res.should.have.status(302);
        res.header['Location'].should.include('/')
        done()
      });
    });  
  });

})