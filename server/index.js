var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)
app.use(bodyParser.json());
const chalk = require('chalk')

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

io.on('connection', (client) => {
  client.emit('connection')
  client.on('discussion', (data) => {
     knex('discussion').returning(['id', 'input', 'user_id', 'createdat']).insert({input: data.topic, user_id: data.user}) //currentUser.id --- hard coding for now
    .then(function(data){
      io.emit('discussion', data[0])
    })
  })
})


app.get('/discussions', (req, res) => {
  knex('users').join('discussion', 'users.id', 'discussion.user_id').select('discussion.id',
    'discussion.input',
    'discussion.user_id',
    'discussion.createdat',
    'users.fullname').orderBy('createdat', 'desc')
    .then((data) => {
      res.status(200).send(data)
    })
})

//getting camps/commonground for a discussion
app.get('/discussion/:discussionId/:userFullname', (req, res) => {
  let id = req.params.discussionId;
  let fullname = req.params.userFullname;
  knex('commonground').where({discussion_id: id}).select('*')
    .then(function(data) {
      var commongroundsResponse = {};
      commongroundsResponse.data = data;
      knex.select('*').from('users_join')
        .innerJoin('users', 'users_join.user_id', 'users.id')
        .whereRaw(`users.fullname=('${fullname}') and users_join.discussion_id=('${id}')`)
        .then(data2 => {
          commongroundsResponse.discussionContribution = data2
          res.send(commongroundsResponse);
        })
      // ^ this knex query is meant to see if the user has contributed to the discussion already.
    })
});

app.get('/analytics/:campId/:demographic', (req, res) => {
  knex.raw(`select distinct on (users.id, vote.input) users.id, ${req.params.demographic}, vote.input
    from users, vote, comment
    where users.id=comment.user_id and vote.comment_id=comment.id and comment.commonground_id=('${req.params.campId}')
    union all select distinct on (users.id) users.id, ${req.params.demographic}, null as input 
    from users, comment
    where users.id=comment.user_id and comment.commonground_id=('${req.params.campId}')`)
    .then(data => {
      res.send(data.rows)
    })
}); //uses a select query to get users that voted and a union all to run another select query to get commenters

app.get('/voteanalytics/:commentId/:demographic', (req, res) => {
  knex.select(`${req.params.demographic}`, 'users.id', 'vote.input').from('users', 'vote')
    .distinct('users.id').orderBy('users.id').innerJoin('vote', 'users.id', 'vote.user_id')
    .whereRaw(`vote.comment_id=('${req.params.commentId}')`)
    .then(data => {
      res.send(data)
    })
});

app.get('/comments/:campId', function(req, res) {
  let id = req.params.campId;
  knex('comment').where({commonground_id: id}).select('*').orderBy('delta', 'desc')
    .then(function(data) {
      var commentsResponse = {};
      commentsResponse.data = data;
      res.send(commentsResponse);
    })
}) //grabs the comments for a commonground

app.get('/profile/:fbId', function(req, res) {
  knex('users').select('*')
  .where({facebookid: req.params.fbId})
    .then(function(data) {
      res.send(data[0]);
    }).catch((err) => console.log(chalk.red.inverse(err)));
})

// /login route puts user facebook data in database upon login
app.post('/login', function(req,res) {
  var fbPic = req.body.picture.data.url.replace(/([?])/g, '\\?')
  knex.raw(`
    INSERT INTO users (fullname, facebookid, gender, email, facebookpicture, locale)
    VALUES ('${req.body.name}', '${req.body.id}', '${req.body.gender}', '${req.body.email}', '${req.body.picture.data.url}', '${req.body.locale}')
    ON CONFLICT (facebookid) DO NOTHING
    RETURNING * `)
  .then(data =>{
    knex.select('*').from('users').where({
      facebookid: req.body.id
    })
    .then(selectdata => {
      res.status(200).send(selectdata);
    })
  })
})

// profile route upserts data into database that user inputs in profile page.
// may need updating once profile page is built
app.post('/profile', function(req,res) {
  console.log('profile REQ.BODY', req.body);
  knex('users').returning('*').where('id', req.body.id).update({
    age: `${req.body.age}`,
    race: `${req.body.race}`,
    industry: `${req.body.industry}`,
    politicalleaning: `${req.body.politicalleaning}`,
    religion: `${req.body.religion}`,
    yearlyincome: `${req.body.yearlyincome}`
  })
  .then((data) => {
    console.log('updated profile data........',data[0]);
    res.send(data[0]);
  }).catch((err) => console.log(chalk.red.inverse(err)));
})

app.post('/commonground', function(req, res){
  var commentResObj;

  knex('commonground').returning(['id', 'discussion_id', 'input']).insert({input: req.body.commonground, discussion_id: req.body.discussionId, user_id: 16})
    .then(function(data){
      //create namespace for sockets.io. This creates a namespace where users looking at a commonground see comments update instantaneously
      var cgNspName = data[0].id
      const cgNsp = io.of(`/${cgNspName}`);
      cgNsp.on('connection', (socketClient) => {
        console.log('object keys nsps........', Object.keys(io.nsps));
        cgNsp.emit('cgConnection', {namespace: `/${socketClient.nsp.name}`});

        socketClient.on('comment', (commentData) => {
          knex('comment').returning(['id', 'user_id', 'fullname', 'facebookpicture', 'input', 'commonground_id', 'delta', 'createdat']).insert({
            input: commentData.comment,
            user_id: commentData.userId,
            fullname: commentData.userName,
            commonground_id: commentData.commongroundId,
            facebookpicture: commentData.userPic
          })
          .then(function(data){
            commentResObj = {
              id: data[0].id,
              input: data[0].input,
              commonground_id: data[0].commonground_id,
              delta: data[0].delta,
              user_id: data[0].user_id,
              fullname: data[0].fullname,
              facebookpicture: data[0].facebookpicture,
              createdat: data[0].createdat
            }
            cgNsp.emit('comment', commentResObj);
            return commentResObj;
          }).then(function(){
          knex('commonground').where({id:commentResObj.commonground_id}).select('discussion_id')
          .then(function(data3){
            knex('users_join').where({user_id: commentResObj.user_id, discussion_id:data3[0].discussion_id}).select('id')
            .then(function(data4){
              console.log("This is data4", data4);
              if(!data4.length) {
                knex.raw(`
                INSERT INTO users_join (user_id, commonground_id, discussion_id, comment_id, vote_id)
                VALUES (${commentResObj.user_id}, ${commentResObj.commonground_id}, ${data3[0].discussion_id}, ${commentResObj.id}, NULL)
                `).then(function(data){
                  console.log("ADDED NEW FIELD IN JOIN TABLE")
                })
              } else {
                knex.raw(`
                UPDATE users_join SET commonground_id = ${commentResObj.commonground_id}, comment_id = ${commentResObj.id}, vote_id = NULL
                WHERE user_id = ${commentResObj.user_id} AND discussion_id = ${data3[0].discussion_id}
                `).then(function(data){
                  console.log("UPDATED!")
                })
              }
            })
          });
          })
        })
      })
      res.status(200).send(data);
  })
})

app.post('/vote', function(req,res){
  var commentId = req.body.commentId
  var vote = req.body.vote
  var user = req.body.userId
  knex('vote').returning('id').insert({input: req.body.vote, user_id: req.body.userId, comment_id: req.body.commentId })
  .then(function(data1){
    if (vote === '1') {
      knex('comment').returning(['id', 'commonground_id', 'upvotecounter', 'downvotecounter', 'delta']).where({id: commentId})
      .update({
        'upvotecounter': knex.raw('upvotecounter + 1'),
        'delta': knex.raw('delta + 1')
      })
      .then(function(data2){
          var voteResObj = {
            id: data2[0].id,
            upvotecounter: data2[0].upvotecounter,
            downvotecounter: data2[0].downvotecounter,
            delta: data2[0].delta
          }
          res.status(200).send(voteResObj);


          knex('commonground').where({id:data2[0].commonground_id}).select('discussion_id')
          .then(function(data3){
            console.log("data1 - Vote ID", data1)
            console.log("data2 - commentID", data2)
            console.log("data3 - discussion_id", data3)
            knex('users_join').where({user_id: req.body.userId, discussion_id:data3[0].discussion_id}).select('id')
            .then(function(data4){
              console.log("This is data4", data4);
              if(!data4.length) {
                knex.raw(`
                INSERT INTO users_join (user_id, commonground_id, discussion_id, vote_id, comment_id)
                VALUES (${req.body.userId}, ${data2[0].commonground_id}, ${data3[0].discussion_id}, ${data1[0]}, NULL)
                `).then(function(data){
                  console.log("ADDED NEW FIELD IN JOIN TABLE")
                })
              } else {
                knex.raw(`
                UPDATE users_join SET commonground_id = ${data2[0].commonground_id}, vote_id = ${data1[0]}, comment_id = NULL
                WHERE user_id = ${req.body.userId} AND discussion_id = ${data3[0].discussion_id}
                `).then(function(data){
                  console.log("UPDATED!")
                })
              }
            })
          });
        })

    } else {
      knex('comment').returning(['id', 'commonground_id', 'upvotecounter', 'downvotecounter', 'delta']).where({id: commentId})
      .update({
        'downvotecounter': knex.raw('downvotecounter + 1'),
        'delta': knex.raw('delta - 1')
      })
      .then(function(data2){
          console.log('DATA 2: ', data2)
          var downvoteResObj = {
            id: data2[0].id,
            upvotecounter: data2[0].upvotecounter,
            downvotecounter: data2[0].downvotecounter,
            delta: data2[0].delta
          }
          console.log('downvoteResObj ---------------', downvoteResObj)
          res.status(200).send(downvoteResObj);

          knex('commonground').where({id:data2[0].commonground_id}).select('discussion_id')
          .then(function(data3){
            console.log("data1 - Vote ID", data1)
            console.log("data2 - commentID", data2)
            console.log("data3 - discussion_id", data3)
            knex('users_join').where({user_id: req.body.userId, discussion_id:data3[0].discussion_id}).select('id')
            .then(function(data4){
              console.log("This is data4", data4);
              if(!data4.length) {
                knex.raw(`
                INSERT INTO users_join (user_id, commonground_id, discussion_id, vote_id, comment_id)
                VALUES (${req.body.userId}, ${data2[0].commonground_id}, ${data3[0].discussion_id}, ${data1[0]}, NULL)
                `).then(function(data){
                  console.log("ADDED NEW FIELD IN JOIN TABLE")
                })
              } else {
                knex.raw(`
                UPDATE users_join SET commonground_id = ${data2[0].commonground_id}, vote_id = ${data1[0]}, comment_id = NULL
                WHERE user_id = ${req.body.userId} AND discussion_id = ${data3[0].discussion_id}
                `).then(function(data){
                  console.log("UPDATED!")
                })
              }
            })
          });


          // knex('users_join').insert({user_id: 16, commonground_id: data2[0].commonground_id, vote_id: data1[0]}).returning('commonground_id')
          // .then(function(data3){
          //   console.log('This is commonground_id', data3[0])
          //   knex('commonground').where({id:data3[0]}).select('discussion_id')
          //   .then(function(data4){
          //     knex('users_join').where({commonground_id: data3[0]}).update({discussion_id: data4[0].discussion_id}).then(function(){})
          //   })
          // });
        });
    }
  }).then(function(){});
});

app.post('/delete', function(req, res) {
  console.log('req body delete', req.body)
  let commongroundId = req.body.campId
  if (req.body.commentId !== null) { //conditional to check if comment
    knex('comment').where('id', req.body.commentId).returning('commonground_id').del()
    .then(function(data){
        console.log("DELETED!", data)
        knex('comment').where('commonground_id', data[0]).select('*')
        .then(function(data1){
          console.log('other comments from delete', data1);
          res.status(200).send(data1);
        })

      })
  } else {
    console.log('commonground id', commongroundId)
    knex('comment').where('commonground_id', commongroundId).select('*')
    .then(function(data1){
      console.log('other comments from delete', data1);
      res.status(200).send(data1);
    })
  }
  // }
  // if () { //conditional to check if vote
  //   knex('vote').where('comment_id', req.body.vote_id).del() //CHECK REQ.BODY
  //   .then(function(data){
  //       console.log("DELETED!")
  //     })
  // }
})

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

var port = process.env.PORT || 4040;
http.listen(port); //needed to listen using the http server and not the express 'app' server
console.log("Listening on port " + port);