var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded({extended: false})); //needed for testing purposes on gregindex.html
// app.use(bodyParser.json());

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

app.get('/discussion', function(req, res) {
  var discussionInput = req.body.search;
  knex('commonground').select('*')
    .then(function(data) {
      console.log('data', data)
      var commongroundsResponse = {};
      commongroundsResponse.data = [];
      var cgCount = 0;
      data.forEach(function(commonground) {
        let commongroundObj = {};
        commongroundObj.id = commonground.id;
        commongroundObj.input = commonground.input;
        commongroundObj.discussionId = commonground.discussion_id;
        console.log('commongroundObj in foreach', commongroundObj)
        knex('comment').where({commonground_id: commonground.id}).select('*')
          .then(function(comments) {
            commongroundObj.comments = comments;
            commongroundsResponse.data.push(commongroundObj)
            console.log('comments obj', commongroundObj.comments)
            cgCount++
            if(cgCount === data.length){
              console.log('cgCount', cgCount, '----------commongroundRes after foreach-------', commongroundsResponse);
              res.send(commongroundsResponse)
            }
          })
      })
    })
})

app.post('/user', function(req,res) {
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
  knex('commonground').returning('id').insert({input: req.body.commonground, discussion_id: req.body.discussionId, user_id: 1})
    .then(function(data){
      console.log('data commonground res', data)
      res.status(200).send(data)
    })
    .then(function(){})
})

app.post('/comment', function(req,res){
  console.log(req.body);

  knex('comment').returning('id').insert({input: req.body.comment, user_id: 1, commonground_id: req.body.commongroundId })
    .then(function(data){
      res.status(200).send(data)
    }) //currentUser.id --- hard coding for now
    .then(function(){})
})

app.post('/vote', function(req,res){
  console.log(req.body);

  knex('vote').returning('comment_id').insert({input: req.body.vote, user_id: currentUser.id, comment_id: req.body.commentId })
  .then(function(data){
    if (req.body.vote === '1') {
      knex('comment').where('id', data[0]).increment('upvotecounter', 1).then(function(){});
    } else {
      knex('comment').where('id', data[0]).increment('downvotecounter', 1).then(function(){});
    }
  }).then(function(){});
});


var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
