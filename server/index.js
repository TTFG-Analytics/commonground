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

app.get('/analytics/:campName/:demographic', (req, res) => {
  knex.select(`${req.params.demographic}`, 'users.id').from('users').distinct('users.id')
    .innerJoin('comment', 'users.id', 'comment.user_id')
    .innerJoin('commonground', 'comment.commonground_id', 'commonground.id')
    .whereRaw(`commonground.input=('${req.params.campName}')`)
    .then(data => {
      knex.select(`${req.params.demographic}`, 'users.id', 'vote.input').from('users', 'vote').distinct('users.id')
        .innerJoin('vote', 'users.id', 'vote.user_id')
        .innerJoin('comment', 'vote.comment_id', 'comment.id')
        .innerJoin('commonground', 'comment.commonground_id', 'commonground.id')
        .whereRaw(`commonground.input=('${req.params.campName}')`)
        .then(data2 => {
          var ans = data2.concat(data)
          console.log('responseArr analytics array ---------------', ans)
          res.send(ans)
        })
    })
})

app.get('/voteanalytics/:commentId/:demographic', (req, res) => {
  console.log('req params', req.params)
  knex.select(`${req.params.demographic}`, 'users.id', 'vote.input').from('users', 'vote').distinct('users.id').orderBy('users.id').innerJoin('vote', 'users.id', 'vote.user_id')
    .whereRaw(`vote.comment_id=('${req.params.commentId}')`)
    .then(data => {
      console.log('comment vote analytics', data)
      res.send(data)
    })
})

app.get('/comments/:campId', function(req, res) {
  console.log('req params', req.params)
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

// /login route puts user facebook data in database upon login
app.post('/login', function(req,res) {
  currentUser = req.body;
  knex.raw(`
    INSERT INTO users (fullname, facebookid, gender, email, facebookpicture, locale)
    VALUES ('${req.body.name}', '${req.body.id}', '${req.body.gender}', '${req.body.email}', '${req.body.picture.data.url}', '${req.body.locale}')
    ON CONFLICT (facebookid) DO UPDATE
    SET (fullname, gender, email, facebookpicture, locale) = ('${req.body.name}', '${req.body.gender}', '${req.body.email}', '${req.body.picture.data.url}', '${req.body.locale}')
    RETURNING id
    `).then(function(data){
      currentUser.id = data.rows[0].id
    });
    res.status(200).send();
})

// profile route upserts data into database that user inputs in profile page.
// may need updating once profile page is built
app.post('/profile', function(req,res) {
  console.log('REQ.BODY', req.body);
  knex.raw(`
    UPDATE users
    SET (title, age, hometown, race, industry, politicalleaning, religion, yearlyincome) = ('${req.body.title}', '${req.body.age}', '${req.body.hometown}', '${req.body.race}', '${req.body.industry}', '${req.body.politicalleaning}', '${req.body.religion}')
    `).then(function(data){
      console.log(data);
    });
    res.status(200).send();
})

app.post('/discuss', function(req,res) {
  console.log(req.body);
  knex('discussion').returning('id').insert({input: req.body.topic, user_id: 11}) //currentUser.id --- hard coding for now
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
  knex('commonground').returning(['id', 'discussion_id', 'input']).insert({input: req.body.commonground, discussion_id: req.body.discussionId, user_id: 16})
    .then(function(data){
      console.log('data commonground res --------------------------', data)
      res.status(200).send(data)
    })
    .then(function(){})
})

app.post('/comment', function(req,res){
  console.log("THIS IS THE CURRENT req.body", req.body);
  knex('comment').returning(['id', 'input', 'commonground_id', 'upvotecounter', 'downvotecounter', 'delta']).insert({input: req.body.comment, user_id: 16, commonground_id: req.body.commongroundId })
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
      knex('users_join').insert({user_id: 16, commonground_id: data[0].commonground_id, comment_id:data[0].id}).then(function(){});
      res.status(200).send(commentResObj)
    }) //currentUser.id --- hard coding for now to 16
    .then(function(){})
})

app.post('/vote', function(req,res){
  console.log(req.body);
  var commentId = req.body.commentId
  var vote = req.body.vote
  knex('vote').returning('id').insert({input: req.body.vote, user_id: 16, comment_id: req.body.commentId })
  .then(function(data1){
    if (vote === '1') {
      knex('comment').returning(['id', 'upvotecounter', 'downvotecounter', 'commonground_id']).where({id: commentId}).increment('upvotecounter', 1)
      .then(function(data2){
          console.log('DATA 1: ', data1)
          console.log('DATA 2: ', data2)
          var voteResObj = {
            id: data2[0].id,
            upvotecounter: data2[0].upvotecounter,
            downvotecounter: data2[0].downvotecounter
          }
          console.log('voteResObj ---------------', voteResObj)
          let diff = data2[0].upvotecounter - data2[0].downvotecounter;
          knex('comment').where('id', data2[0].id).update({delta: diff}).then(function(diffdata2){
            res.status(200).send(voteResObj);
          });
          knex('users_join').insert({user_id: 16, commonground_id: data2[0].commonground_id, vote_id: data1[0]}).then(function(){});
        });
    } else {
      knex('comment').returning(['id', 'upvotecounter', 'downvotecounter', 'commonground_id']).where({id: commentId}).increment('downvotecounter', 1)
      .then(function(data2){
          console.log('DATA 1: ', data1)
          console.log('DATA 2: ', data2)
          var downvoteResObj = {
            id: data2[0].id,
            upvotecounter: data2[0].upvotecounter,
            downvotecounter: data2[0].downvotecounter
          }
          let diff = data2[0].upvotecounter - data2[0].downvotecounter;
          knex('comment').where('id', data2[0].id).update({delta: diff}).then(function(diffData){
            res.status(200).send(downvoteResObj);
          })
          knex('users_join').insert({user_id: 16, commonground_id: data2[0].commonground_id, vote_id: data1[0]}).then(function(){});
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


// app.get('/ages', (req, res) =>{
//   knex('users').select('age')
//     .then((data) => {
//       console.log('age data', data)
//       res.send(data)
//     })
// })

// app.get('/discussionAges/:discussionId', (req, res) => {
//   console.log('req params ages', req.params)
//   knex.raw(`
//     SELECT users.age FROM users INNER JOIN comment on users.id=comment.user_id
//     INNER JOIN commonground on comment.commonground_id=commonground.id
//     INNER JOIN discussion on commonground.discussion_id=discussion.id where discussion.id=('${req.params.discussionId}')
//     `)
//     .then(data => {
//       console.log('ages data', data);
//       res.send(data)
//     })
// })

// app.get('/discussionPolitics/:discussionId', (req, res) => {
//   console.log('req params', req.params)
//   knex.raw(`
//     SELECT users.politicalleaning FROM users INNER JOIN comment on users.id=comment.user_id
//     INNER JOIN commonground on comment.commonground_id=commonground.id
//     INNER JOIN discussion on commonground.discussion_id=discussion.id where discussion.id=('${req.params.discussionId}')
//   `)
//   .then(data => {
//     console.log('politics data', data);
//     res.send(data)
//   })
// })

// app.get('/campAges/:campId', (req, res) => {
//   console.log('req params ages', req.params)
//   knex.raw(`
//     SELECT users.age FROM users INNER JOIN comment on users.id=comment.user_id
//     INNER JOIN commonground on comment.commonground_id=commonground.id where commonground.id=('${req.params.campId}')
//     `)
//     .then(data => {
//       console.log('ages data', data);
//       res.send(data)
//     })
// })

// app.get('/campPolitics/:campId', (req, res) => {
//   console.log('req params', req.params)
//   knex.raw(`
//     SELECT users.politicalleaning FROM users INNER JOIN comment on users.id=comment.user_id
//     INNER JOIN commonground on comment.commonground_id=commonground.id where commonground.id=('${req.params.campId}')
//   `)
//   .then(data => {
//     console.log('politics data', data);
//     res.send(data)
//   })
// })