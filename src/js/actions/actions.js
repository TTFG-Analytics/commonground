import axios from 'axios'

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

export function createCamp(discussionId, inputStr) {
  return {
    type: 'SET_CAMP',
    campId: campId++,
    discussionId: discussionId,
    inputStr
  }
}

export function selectCamp(campId) { //function is 'action creator'
  console.log('you clicked on camp', campId);
  return {//object that gets returned is the 'action'
    type: 'CAMP_SELECTED',
    campId
  }
}

export function createComment(campId, inputStr) {
  return {
    type: 'MAKE_COMMENT',
    commentId: commentId++,
    campId: campId,
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

export function increaseUpvotes(commentId) {
  return {
    type: 'UPVOTE',
    commentId: commentId
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
  return {
    type: 'GET_DISCUSSIONS_SUCCESS',
    discussions: discussions
  }
}

export const getDiscussions = () => {
  var url = 'https://chicagowepapp.firebaseio.com/articles.json'
  return (dispatch) => {
    return axios.get(url)
      .then(response => {
        dispatch(getDiscussionsSuccess(response.data))
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
  return {
    type: 'CREATE_DISCUSSION_SUCCESS',
    id: discussion.discussionId,
    inputStr: discussion.topic
  }
}

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
    campId: camp.commongroundId,
    discussionId: camp.discussionId,
    inputStr: camp.commonground
  }
}

export const createCampPost = (camp) => {
  return (dispatch) => {
    return axios.post('/commonground', camp)
      .then(response => {
        console.log('create camp success resobj', response)
        let responseObj = JSON.parse(response.config.data)
        responseObj.commongroundId = response.data[0]
        console.log('create camp success resobj', responseObj)
        dispatch(createCampSuccess(responseObj))
      })
  }
}

export const createCommentSuccess = (comment) => {
  console.log('createCommentSuccess', comment)
  return {
    type: 'CREATE_COMMENT_SUCCESS',
    commentId: comment.commentId,
    campId: comment.commongroundId,
    inputStr: comment.comment
  }
}

export const createCommentPost = (comment) => {
  console.log('createCommentPost comment', comment)
  return (dispatch) => {
    return axios.post('/comment', comment)
      .then(response => {
        console.log('create comment success response', response)
        let responseObj = JSON.parse(response.config.data)
        responseObj.commentId = response.data[0]
        console.log('create comment success resobj', responseObj)
        dispatch(createCommentSuccess(responseObj))
      })
  }
}