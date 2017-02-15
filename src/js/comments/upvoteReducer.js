//import {increaseUpvotes} from '../actions/actions'

// const upvoteIncrement = (state = [], action) => {
//   if(action.type === 'UPVOTE') {
//     console.log('upvoting started', state, action);
//     return [
//       ...state.slice(0, action.commentId),
//       state.count += 1,
//       ...state.slice(action.commentId+1)
//     ]
//   }
//   return state
// }

const upvote = (state = {}, action) => {
  if(action.type === 'CREATE_UPVOTE_COUNTER') {
    return {
      index: action.upvoteId,
      count: action.count
    } //is the equivalent of having a separate function produce the action object (see comment Reducer for example)
  }
  return state
}

const update = (state, mutations) => {
  return Object.assign({}, state, mutations)
}

const upvotes = (state = [], action) => {
  if(action.type === 'CREATE_UPVOTE_COUNTER') {
    return [
      ...state,
      upvote(undefined, action)//is the equivalent of having a separate function produce the action object (see comment Reducer for example)
    ]
  }
  
  if(action.type === 'UPVOTE') {
    console.log('upvoting started', state, action);
    return [
      ...state.slice(0, action.commentId),
      state[action.commentId] = update(state[action.commentId], {index: action.commentId, count: state[action.commentId].count += 1}),
      ...state.slice(action.commentId+1)
    ]
  }
  return state
}

export default upvotes