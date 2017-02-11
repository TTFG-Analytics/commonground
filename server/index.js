var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded());

module.exports = app;

app.use(express.static(path.join(__dirname, '../public/')));

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






var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
