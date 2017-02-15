//3) combine reducers so that only one object needs to be exported and then the lone cgApp reducer
//goes to the store.js file
import { combineReducers } from 'redux'

// import discussions from './discussionReducer'
import discussionsGet from './getDiscussionsReducer'
import camps from '../camps/campReducer'
import campGet from '../camps/getCampsReducer'
import commentGet from '../comments/commentReducer'
import upvotes from '../comments/upvoteReducer'

const cgApp = combineReducers({
  camps,
  commentGet,
  upvotes,
  campGet,
  discussionsGet
})

export default cgApp