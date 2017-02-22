const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require ('../server/index');
const should = chai.should();

chai.use(chaiHttp)

describe('Discussions', () => {
  it('should list ALL discussions on /discussions GET');
  it('should list a SINGLE discussions on /discussions/<id> GET');
})

describe('comments', () => {
  it('should list all commonground comments on /comments/<campId> GET');
  it('should be inserting a comment into the db on /comments Post');
})

describe('comments', () => {
  it('should be inserting a comment into the db on /commonground Post');
})

describe('vote', () => {
  it('should be inserting a vote into the db on /vote Post');
})

describe('Profile', () => {
  it('should be getting data from the db on /Profile GET');
  it('should be inserting or updating db information on /Profile POST');
})

describe('Login', () => {
  it('should be inserting or updating db information on /Profile POST');
})

describe('Analytics', () => {
  it('should be pulling data from the db on /analytics/:campName/:demographic GET');
  it('should be pulling data from the db on /voteanalytics/:commentId/:demographic GET');
})

describe('Redirect', () => {
  it('should redirict to /../public/index.html on /* GET');
})