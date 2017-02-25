process.env.NODE_ENV = 'development';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require ('../server/index');
// const knex = require('../db/knex')
const should = chai.should();
const chalk = require('chalk')

chai.use(chaiHttp)

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'cg_db',
    user:     'commonground',
    password: 'commonground123'
  }
});

describe(chalk.yellow('Server API routes'), () => {

  beforeEach((done) => {
    knex.migrate.rollback()
    .catch((err) => console.error(err))
    .then(() => {
      knex.migrate.latest()
      .catch((err) => console.error(err))
      .then(() => {
        return knex.seed.run()
        .catch((err) => console.error(err))
        .then(() => {
          console.log(chalk.blue('knex rolledback, remigrated, and reseeded'));
          done();
        });
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .catch((err) => console.error(err))
    .then(() => {
      done();
    });
  });

  describe('GET all discussions', () => {
    it(chalk.cyan('should list ALL discussions on /discussions GET'), (done) => {
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
    it(chalk.cyan('should return a SINGLE discussion'), (done) => {
      chai.request(server)
      .get('/discussion/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('input');
        res.body.data[0].should.have.property('createdat');
        res.body.data[0].should.have.property('user_id');
        res.body.data[0].should.have.property('discussion_id');
        done();
      });
    });
  });

  describe('GET /comments/<campId>', () => {
    it(chalk.cyan('should return ALL commonground comments'), (done) => {
      chai.request(server)
      .get('/comments/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('input');
        res.body.data[0].should.have.property('createdat');
        res.body.data[0].should.have.property('upvotecounter');
        res.body.data[0].should.have.property('downvotecounter');
        res.body.data[0].should.have.property('delta');
        res.body.data[0].should.have.property('flag');
        res.body.data[0].should.have.property('commonground_id');
        res.body.data[0].should.have.property('user_id');
        done();
      });
    });
  });

  // describe('POST /comment', () => {
  //   it(chalk.cyan('should be inserting a comment into the db'), (done) => {
  //     chai.request(server)
  //     .post('/comment')
  //     .send({
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum'
  //     })
  //     .end((err,res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a('array');
  //       done();
  //     })
  //   });
  // });

  // describe('POST /commonground', () => {  
  //   it(chalk.cyan('should be inserting a commonground into the db'), (done) =>{      
  //     chai.request(server)
  //     .post('/commonground')
  //     .send({
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum'
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('Lorem')
  //       res.body.should.have.property('Lorem')
  //       res.body.should.have.property('Lorem')
  //       res.body.should.have.property('Lorem')
  //       res.body.should.have.property('Lorem')
  //       done();
  //     })
  //   });
  // })

  // describe('POST /vote', () => {  
  //   it(chalk.cyan('should be inserting a vote into the db'), (done) => {
  //     chai.request(server)
  //     .post('/vote')
  //     .send({
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //       // lorem: 'ipsum',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('object')
  //       res.body.should.have.property('id')
  //       res.body.should.have.property('upvotecounter')
  //       res.body.should.have.property('downvotecounter')
  //       done();
  //     })
  //   });
  // });

  describe('GET /profile', () => {
    it(chalk.cyan('should be getting user profile data from the db'), (done) => {
      chai.request(server)
      .get('/profile')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.JSON;
        res.body.should.be.a('object');
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
        res.body.should.have.property('createdat');
        done()
      });
    });  
  });

  // describe('POST /Login', () => {
  //   it(chalk.cyan('should be uploading user facebooklogin data to the db'), (done) => {
  //     chai.request(server)
  //     .post('/login')
  //     .send({
  //       fullname: "James Joyce",
  //       facebookid: "737373737373737373",
  //       gender: "Male",
  //       email: "jamesjoyce@aol.com",
  //       facebookpicture: "http://picturelocatedhere.lol",
  //       locale: "IRL"
  //     })
  //     .end((err, res) => {
  //       console.log(chalk.magenta.inverse(JSON.stringify(res.body)))
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('array');
  //       res.body.should.have.property('facebookid');
  //       res.body.facebookid.should.equal('737373737373737373');
  //       res.body.should.have.property('fullname');
  //       res.body.fullname.should.equal('James Joyce');
  //       res.body.should.have.property('gender');
  //       res.body.gender.should.equal('male');
  //       res.body.should.have.property('email');
  //       res.body.email.should.equal('james.joyce@aol.com');
  //       res.body.should.have.property('facebookpicture');
  //       res.body.facebookpicture.should.equal('http://picturelocatedhere.lol');
  //       res.body.should.have.property('locale');
  //       res.body.local.should.equal('IRL');
  //       done()
  //     });
  //   });  
  // });

  // describe('POST /profile', () => {
  //   it(chalk.cyan('should be uploading user profile data to the db'), (done) => {
  //     chai.request(server)
  //     .post('/profile')
  //     .send({
  //       id: "50",
  //       facebookid: "737373737373737373",
  //       fullname: "James Joyce",
  //       title: "General Ulysses of Authors",
  //       age: "135",
  //       hometown: "Rathgar, Ireland",
  //       gender: "Male",
  //       race: "1",
  //       industry: "10",
  //       politicalleaning: "3",
  //       religion: "0",
  //       yearlyincome: "4",
  //       email: "jamesjoyce@aol.com",
  //       facebookpicture: "insert url here",
  //       locale: "IRL",
  //       admin: "0"
  //     })
  //     .end((err, res) => {
  //       console.log(chalk.magenta.inverse(JSON.stringify(res.body)))
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('array');
  //       res.body.should.have.property('id');
  //       res.body.id.should.equal('id');
  //       res.body.should.have.property('facebookid');
  //       res.body.facebookid.should.equal('737373737373737373');
  //       res.body.should.have.property('fullname');
  //       res.body.fullname.should.equal('James Joyce');
  //       res.body.should.have.property('title');
  //       res.body.fullname.should.equal('James Joyce');
  //       res.body.should.have.property('age');
  //       res.body.age.should.equal('135');
  //       res.body.should.have.property('hometown');
  //       res.body.hometown.should.equal('Rathgar, Ireland');
  //       res.body.should.have.property('gender');
  //       res.body.gender.should.equal('male');
  //       res.body.should.have.property('race');
  //       res.body.race.should.equal('1');
  //       res.body.should.have.property('industry');
  //       res.body.industry.should.equal('10');
  //       res.body.should.have.property('politicalleaning');
  //       res.body.politicalleaning.should.equal('3');
  //       res.body.should.have.property('religion');
  //       res.body.religion.should.equal('0');
  //       res.body.should.have.property('yearlyincome');
  //       res.body.yearlyincome.should.equal('4');
  //       res.body.should.have.property('email');
  //       res.body.email.should.equal('james.jouce@aol.com');
  //       res.body.should.have.property('facebookpicture');
  //       res.body.facebookpicture.should.equal('insert url here');
  //       res.body.should.have.property('locale');
  //       res.body.local.should.equal('IRL');
  //       res.body.should.have.property('admin');
  //       res.body.admin.should.equal('0');
  //       res.body.should.have.property('timestamp');
  //       done()
  //     });
  //   });  
  // });
//commonground.input
//column name
  // describe('GET /analytics/:campName/:demographic', () => {  
  //   it(chalk.cyan('should be pulling campground data from the db'), (done) => {
  //     chai.request(server)
  //     .get('/analytics/"Man-Made"/"age"')
  //     .end((err,res) => {
  //       res.should.have.status(200); 
  //       res.should.be.json;
  //       res.should.body.should.be.a('array')
  //       console.log(chalk.green.inverse(JSON.stringify(res)))

  //       // need
  //       // to
  //       // fill
  //       // in
  //       // here
  //       done();
  //     });
  //   });
  // });
//id
//column name
  // describe('GET /voteanalytics/:commentId/:demographic', () => {  
  //   it(chalk.cyan('should be pulling comment vote data from the db'), (done) => {
  //     chai.request(server)
  //     .get('/voteanalytics/"1"/"gender"')
  //     .end((err,res) => {
  //      res.should.have.status(200);
  //      res.should.be.json;
  //      res.should.body.should.be.a('array')
  //      console.log(chalk.green.inverse(JSON.stringify(res)))
  //      console.log(err)
  //       // need
  //       // to
  //       // fill
  //       // in
  //       // here
  //       done(); 
  //     })
  //   });
  // });  

  
  // describe('GET /../public/index.html', () => {
  //   it(chalk.cyan('should redirict user on faulty route'), (done) => {
  //     chai.request(server)
  //     .get('/haberdashery')
  //     .end((err, res) => {
  //       res.should.have.status(302);
  //       res.header['Location'].should.include('/')
  //       done()
  //     });
  //   });  
  // });

})