//3) combine reducers so that only one object needs to be exported and then the lone cgApp reducer
//goes to the store.js file
import { combineReducers } from 'redux';

// import discussions from './discussionReducer'
import discussionsGet from 'discussionsGet';
import campGet from 'campGet';
import commentGet from 'commentGet';
import fbGet from 'fbGet';
import profileReducer from 'profileReducer';

const cgReducers = combineReducers({
  commentGet,
  campGet,
  discussionsGet,
  profileReducer,
  fbGet
})

export default cgReducers