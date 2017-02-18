//3) combine reducers so that only one object needs to be exported and then the lone cgApp reducer
//goes to the store.js file
import { combineReducers } from 'redux'

// import discussions from './discussionReducer'
import discussionsGet from './discussion/discuss/getDiscussionsReducer'
import campGet from './discussion/camps/getCampsReducer'
import commentGet from './discussion/comments/commentReducer'
// import fbGet from './discussion/camps/FaceBookReducer'
import profileReducer from './profile/reducers/profileReducer';

const cgReducers = combineReducers({
  commentGet,
  campGet,
  discussionsGet,
  profileReducer,
  // fbGet
})

export default cgReducers