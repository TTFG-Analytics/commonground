var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded());

module.exports = app;

//This mimics a user session being saved
var currentUser;

var knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'cg_db',
    user:     'Greg',
    password: 'commonground'
  }
});

app.post('/import', function(req,res){

  currentUser = req.body;

  knex('users').returning('id').insert({name: req.body.name, age: req.body.age, hometown: req.body.hometown, gender: req.body.gender, race: req.body.race, occupation: req.body.occupation, politicalleaning:req.body.politicalleaning, religion: req.body.religion, yearlyincome:req.body.yearlyincome})
  .then(function(data){ currentUser.id = data[0] });
})

app.post('/discuss', function(req,res){
  console.log(req.body);

  knex('discussion').returning('id').insert({input: req.body.topic, user_id: currentUser.id})
  .then(function(data){
    console.log(data);
    knex('commonground').insert({input: req.body.commonground1, discussion_id: data[0], user_id: currentUser.id}).then(function(){})
    knex('commonground').insert({input: req.body.commonground2, discussion_id: data[0], user_id: currentUser.id}).then(function(){})
  })
})

app.post('/comment', function(req,res){
  console.log(req.body);

  knex('comment').insert({input: req.body.comment, user_id: currentUser.id, commonground_id: req.body.commongroundId }).then(function(){});

})

app.post('/vote', function(req,res){
  console.log(req.body);

  knex('vote').insert({input: req.body.vote, user_id: currentUser.id, comment_id: req.body.commentId }).then(function(){});

})


app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
