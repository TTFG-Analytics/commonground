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

export const GET_DISCUSSIONS_REQUEST = 'GET_DISCUSSIONS_REQUEST';
export const GET_DISCUSSIONS_SUCCESS = 'GET_DISCUSSIONS_SUCCESS';
//export const ARTICLES_GET_FAILURE = 'ARTICLES_GET_FAILURE';

export function getDiscussions(req) {
  console.log('getDiscussions action ------', req)
  var url = 'https://chicagowepapp.firebaseio.com/articles.json';
  let promise = axios.get(url)
  return {
    type: 'GET_DISCUSSIONS_REQUEST',
    payload: promise
  }
}

// {
//     type: 'GET_DISCUSSIONS_REQUEST',
//     promise: axios.get('https://chicagowepapp.firebaseio.com/articles.json'),
//     payload: request.data
//   }