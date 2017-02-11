var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded());

module.exports = app;

var knex = require('knex')({
    client: 'postgresql',
    connection: {
      database: 'cg_db',
      user:     'Greg',
      password: 'commonground'
    }
  });

app.post('/import', function(req,res){
  console.log("this is the req.body: ", req.body);

  console.log("this route was hit");

  knex('users').returning('id').insert({name: req.body.name, age: req.body.age, hometown: req.body.hometown, gender: req.body.gender, race: req.body.race, occupation: req.body.occupation, politicalleaning:req.body.politicalleaning, religion: req.body.religion, yearlyincome:req.body.yearlyincome})
  .then(function(data){
    console.log('here is the req', req.body);

    console.log("this is the data", data[0], Array.isArray(data));
    knex('discussion').insert({input: req.body.discussinput, user_id: data[0]})
    .then(function(data){ console.log("ending data", data) });
  })



    // function(data){console.log("this is what is being returned", data)});





  // knex.raw(`INSERT INTO users (name, age, hometown, gender, race, occupation, politicalleaning, religion, yearlyincome) VALUES ('${req.body.name}',${req.body.age},'${req.body.hometown}',${req.body.gender},${req.body.race},${req.body.occupation},${req.body.politicalleaning},${req.body.religion},${req.body.yearlyincome})`).then(function(rows){console.log('Inserted or Replaced!', rows)});

  // knex.raw(`INSERT INTO discussion (input) VALUES ('${req.body.discussinput}',${req.body.user_id})`).then(function(rows){console.log('Inserted or Replaced!', rows)});

  res.status(200).send("random string");
})


app.get('/', function (req, res) {
  console.log('JUST REFRESHED!');
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
