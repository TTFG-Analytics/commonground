import axios from 'axios'

//import sockets from 'socket.io'
// var connection = io.connect( "http://localhost:4040");

let discussionId = 0
let campId = 0
let commentId = 0
let upvoteId = 0
//these IDs are used to identify the camp that a discussion belongs to (for example)

export function createDiscussion(inputStr) {
  return {
    type: 'CREATE_DISCUSSION',
    id: discussionId++,
    inputStr
  }
}

export function createUpvote() {
  return {
    type: 'CREATE_UPVOTE_COUNTER',
    upvoteId: upvoteId++,
    count: 0
  }
}

export function increaseDownvotes() {
  return {
    type: 'DOWNVOTE'
  }
}

//get request section
export const GET_DISCUSSIONS_REQUEST = 'GET_DISCUSSIONS_REQUEST';

export const getDiscussionsSuccess = (discussions) =>{
  console.log('discussions get', discussions)
  return {
    type: 'GET_DISCUSSIONS_SUCCESS',
    discussions: discussions
  }
} //sends action that is picked up by getDiscussionsReducer

export const getDiscussions = () => {
  return (dispatch) => {
    return axios.get('/discussions')
      .then(response => {
        dispatch(getDiscussionsSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const getCampsSuccess = (camps) => {
  console.log('getCampsSuccess', camps)
  return {
    type: 'GET_CAMPS_SUCCESS',
    camps: camps.data
  }
} //sends action that is picked up by getCampsReducer

export const getCamps = (discussionId) => {
  console.log('discussionid', discussionId)
  return (dispatch) => {
    return axios.get('/discussion/' + discussionId)
      .then(response => {
        console.log('get camps res', response)
        dispatch(getCampsSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const getCommentsSuccess = (comments) => {
  console.log('getCommentsSuccess', comments)
  return {
    type: 'GET_COMMENTS_SUCCESS',
    comments: comments.data
  }
} //sends action that is picked up by getCommentsReducer

export const getComments = (campId) => {
  return (dispatch) => {
    return axios.get('/comments/' + campId)
      .then(response => {
        console.log('get camps res', response)
        dispatch(getCommentsSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}

//this worked the first time
// export function getDiscussions(req) {
//   console.log('getDiscussions action ------', req)
//   var url = 'https://chicagowepapp.firebaseio.com/articles.json';
//   let promise = axios.get(url)
//   return {
//     type: 'GET_DISCUSSIONS_REQUEST',
//     payload: promise
//   }
// }

//might work because we have the promise() middleware
// {
//     type: 'GET_DISCUSSIONS_REQUEST',
//     promise: axios.get('https://chicagowepapp.firebaseio.com/articles.json'),
//     payload: request.data
//   }


//post request section

export const createDiscussionSuccess = (discussion) => {
  console.log('discussion create success', discussion)
  return {
    type: 'CREATE_DISCUSSION_SUCCESS',
    id: discussion.discussionId,
    input: discussion.topic
  }
} //sends action that's picked up by discussionReducer

export const createDiscussionPost = (discussion) => {
  console.log('createDiscussionPost discussion', discussion)
  return (dispatch) => {
    return axios.post('/discuss', discussion)
      .then(response => {
        let responseObj = JSON.parse(response.config.data)
        responseObj.discussionId = response.data[0]
        console.log('responseObj', responseObj)
        dispatch(createDiscussionSuccess(responseObj))
      })
  }
}

export const createCampSuccess = (camp) => {
  return {
    type: 'CREATE_CAMP_SUCCESS',
    id: camp.id,
    discussion_id: camp.discussion_id,
    input: camp.input
  }
} //sends action that's picked up by campReducer

export const createCampPost = (camp) => {
  return (dispatch) => {
    return axios.post('/commonground', camp)
      .then(response => {
        console.log('create camp success resobj', response)
        // let responseObj = JSON.parse(response.config.data)
        // responseObj.commongroundId = response.data[0]
        //console.log('create camp success resobj', response)
        dispatch(createCampSuccess(response.data[0]))
      })
  }
}

export const createCommentSuccess = (comment) => {
  console.log('createCommentSuccess', comment)
  return {
    type: 'CREATE_COMMENT_SUCCESS',
    id: comment.id,
    commonground_id: comment.commonground_id,
    input: comment.input,
    upvotecounter: comment.upvotecounter,
    downvotecounter: comment.downvotecounter,
    // upvotecounter: comment.upvotecounter,
    // downvotecounter: comment.downvotecounter,
    delta: 0
  }
}

export const createCommentPost = (comment) => {
  console.log('createCommentPost comment', comment)

  return (dispatch) => {
    return axios.post('/comment', comment)
      .then(response => {
        console.log('create comment success response', response)
        //let responseObj = JSON.parse(response.data)
        // responseObj.commentId = response.data[0]
        console.log('create comment success resobj', response.data)
        dispatch(createCommentSuccess(response.data))
      })
  }
}

export const increaseUpvotesSuccess = (upvote) => {
  console.log('upvote success', upvote)
  return {
    type: 'UPVOTE_SUCCESS',
    commentId: upvote.id,
    upvotecounter: upvote.upvotecounter
  }
}

export function increaseUpvotesPost(vote) {
  console.log('increasing upvotes ==============')
  return (dispatch) => {
    return axios.post('/vote', vote)
      .then(response => {
        console.log('upvote success response', response)
        let responseObj = JSON.parse(response.config.data)
        responseObj.commentId = response.data[0]
        dispatch(increaseUpvotesSuccess(response.data))
      })
  }
}

export const increaseDownvotesSuccess = (downvote) => {
  console.log('downvote success', downvote)
  return {
    type: 'DOWNVOTE_SUCCESS',
    commentId: downvote.id,
    downvotecounter: downvote.downvotecounter
  }
}

export function increaseDownvotesPost(downvote) {
  console.log('downvotinggggg')
  return (dispatch) => {
    return axios.post('/vote', downvote)
      .then(response => {
        console.log('downvote success response', response)
        let responseObj = JSON.parse(response.config.data)
        responseObj.commentId = response.data[0]
        dispatch(increaseDownvotesSuccess(response.data))
      })
  }
}

export const cachingFbData = (fbUser) => {
  console.log('cachingFBData', fbUser)
  return {
    type: 'GET_FBDATA_SUCCESS',
    fbName: fbUser.name,
    fbId: fbUser.id,
    fbGender: fbUser.gender,
    fbLocale: fbUser.locale,
    fbEmail: fbUser.email,
    fbPicture: fbUser.picture
  }
}

// get data from facebook auth
export function sendingFbData(fbData) {
  console.log('posting response data')
  return (dispatch) => {
    return axios.post('/login', fbData)
      .then(response => {
        console.log('POSTING SUCCESS:', response)
        dispatch(sendingFbDataSuccess(response))
      })
  }
}

export function sendingFbDataSuccess(fbUser) {
  console.log('cachingFBData', fbUser)
  return {
    type: 'GET_FBDATA_SUCCESS',
    fbName: fbUser.name,
    fbId: fbUser.id,
    fbGender: fbUser.gender,
    fbLocale: fbUser.locale,
    fbEmail: fbUser.email,
    fbPicture: fbUser.picture
  }
}

//type: 'UPVOTE',
    // commentId: commentId,