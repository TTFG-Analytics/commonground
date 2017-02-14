//3) combine reducers so that only one object needs to be exported
import { combineReducers } from 'redux'

import discussions from './discussionReducer'
import camps from '../camps/campReducer'
import comments from '../comments/commentReducer'
import upvotes from '../comments/upvoteReducer'
import articleGet from './getDiscussionReducer'

const cgApp = combineReducers({
  discussions,
  camps,
  comments,
  upvotes,
  articleGet
})

export default cgApp