var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
//app.use(bodyParser.urlencoded({extended: false})); //needed for testing purposes on gregindex.html
app.use(bodyParser.json());

module.exports = app;

app.use(express.static(path.join(__dirname, '../public/')));

//This mimics a user session being saved
var currentUser;

var knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'cg_db',
    user:     'commonground',
    password: 'commonground123'
  }
});

app.get('/discussions', (req, res) => {
  knex('discussion').select('*')
    .then((data) => {
      console.log('discussions data', data)
      res.send(data)
    })
})

app.get('/discussion/:discussionId', function(req, res) {
  let id = req.params.discussionId;
  console.log('id', id, req.params);
  knex('commonground').where({discussion_id: id}).select('*')
    .then(function(data) {
      console.log('data', data)
      var commongroundsResponse = {};
      commongroundsResponse.data = data;
      res.send(commongroundsResponse);
    })
})

app.get('/comments/:campId', function(req, res) {
  let id = req.params.campId;
  console.log('id', id, req.params);
  knex('comment').where({commonground_id: id}).select('*')
    .then(function(data) {
      console.log('data', data)
      var commentsResponse = {};
      commentsResponse.data = data;
      res.send(commentsResponse);
    })
})

app.get('/profile', function(req, res) {
  knex('users').select('*')
  .where({id: 18})
    .then(function(data) {
      console.log('datatatatata', data)
      res.send(data[0]);
    })
})

app.post('/profile', function(req,res) {
  currentUser = req.body;

  knex.raw(`
    INSERT INTO users (fullname, facebookid, age, hometown, gender, race, industry, politicalleaning, religion, yearlyincome)
    VALUES ('${req.body.fullname}', ${req.body.facebookid}, ${req.body.age} ,'${req.body.hometown}', ${req.body.gender}, ${req.body.race}, ${req.body.industry}, ${req.body.politicalleaning}, ${req.body.religion}, ${req.body.yearlyincome})
    ON CONFLICT (facebookid) DO UPDATE
    SET (fullname, age, hometown, gender, race, industry, politicalleaning, religion, yearlyincome) = ('${req.body.fullname}', ${req.body.age} ,'${req.body.hometown}', ${req.body.gender}, ${req.body.race}, ${req.body.industry}, ${req.body.politicalleaning}, ${req.body.religion}, ${req.body.yearlyincome})
    RETURNING id
    `)
  .then(function(data){
    currentUser.id = data.rows[0].id
  });
})

app.post('/discuss', function(req,res) {
  console.log(req.body);

  knex('discussion').returning('id').insert({input: req.body.topic, user_id: 1}) //currentUser.id --- hard coding for now
    .then(function(data){
      console.log('data discuss', data)
      res.status(200).send(data)
    })
    .then(function(){})
  //   console.log(data);
  //   knex('commonground').insert({input: req.body.commonground1, discussion_id: data[0], user_id: currentUser.id}).then(function(){})
  //   knex('commonground').insert({input: req.body.commonground2, discussion_id: data[0], user_id: currentUser.id}).then(function(){})
  // })
})

app.post('/commonground', function(req, res){
  console.log('req body commonground', req.body)
  knex('commonground').returning(['id', 'discussion_id', 'input']).insert({input: req.body.commonground, discussion_id: req.body.discussionId, user_id: 1})
    .then(function(data){
      console.log('data commonground res --------------------------', data)
      res.status(200).send(data)
    })
    .then(function(){})
})

app.post('/comment', function(req,res){
  console.log(req.body);

  knex('comment').returning(['id', 'input', 'commonground_id', 'upvotecounter', 'downvotecounter', 'delta']).insert({input: req.body.comment, user_id: 1, commonground_id: req.body.commongroundId })
    .then(function(data){
      console.log('----- data comment res -------------------', data[0])
      var commentResObj = {
            id: data[0].id,
            input: data[0].input,
            commonground_id: data[0].commonground_id,
            upvotecounter: data[0].upvotecounter,
            downvotecounter: data[0].downvotecounter,
            delta: data[0].delta
          }
      res.status(200).send(commentResObj)
    }) //currentUser.id --- hard coding for now
    .then(function(){})
})

app.post('/vote', function(req,res){
  console.log(req.body);
  var commentId = req.body.commentId
  var vote = req.body.vote
  knex('vote').insert({input: req.body.vote, user_id: 1, comment_id: req.body.commentId })
  .then(function(data){
    if (vote === '1') {
      knex('comment').returning(['id', 'upvotecounter', 'downvotecounter']).where({id: commentId}).increment('upvotecounter', 1)
      .then(function(data){
          console.log('vote data data~~~~~~~~~', data)
          var voteResObj = {
            id: data[0].id,
            upvotecounter: data[0].upvotecounter,
            downvotecounter: data[0].downvotecounter
          }
          console.log('voteResObj ---------------', voteResObj)
          let diff = data[0].upvotecounter - data[0].downvotecounter;
          knex('comment').where('id', data[0].id).update({delta: diff}).then(function(diffData){
            res.status(200).send(voteResObj);
          })
        });
    } else {
      knex('comment').returning(['id', 'upvotecounter', 'downvotecounter']).where({id: commentId}).increment('downvotecounter', 1)
      .then(function(data){
          var downvoteResObj = {
            id: data[0].id,
            upvotecounter: data[0].upvotecounter,
            downvotecounter: data[0].downvotecounter
          }
          let diff = data[0].upvotecounter - data[0].downvotecounter;
          knex('comment').where('id', data[0].id).update({delta: diff}).then(function(diffData){
            res.status(200).send(downvoteResObj);
          })
        });
    }
  }).then(function(){});
});

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
