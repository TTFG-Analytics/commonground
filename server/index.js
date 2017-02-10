var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded());

module.exports = app;

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: '../db/.knex/dev.sqlite3'
    }
  });

app.post('/import', function(req,res){
  console.log("this is the req.body: ", req.body);

  knex.raw(`INSERT OR REPLACE INTO user (id, name, age, hometown, gender, race, occupation, politicalLeaning, religion, yearlyIncome, createdAt) VALUES (${req.body.id},'${req.body.name}', ${req.body.age},'${req.body.hometown}', ${req.body.gender}, ${req.body.race}, ${req.body.occupation}, ${req.body.politicalLeaning}, ${req.body.religion}, ${req.body.yearlyIncome}, ${req.body.createdAt})`).then(function(rows){console.log('Inserted or Replaced!', rows)});

  res.status(200).send("random string");
})


app.get('/', function (req, res) {
  console.log('JUST REFRESHED!');
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
