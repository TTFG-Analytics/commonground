import update from 'react-addons-update';

const commentGet = (state={comments:[]}, action) => {
  if(action.type === 'GET_COMMENTS_SUCCESS') {
    console.log('action comments', action.comments)
    return Object.assign(
      {},
      state,
      {
        comments: action.comments.reduce((hash, comment) => (
          hash[comment.id] = comment, hash
        ), {})
      }
    )
  }
  if(action.type === 'CREATE_COMMENT_SUCCESS') {
    let newComments = Object.assign(
      {},
      state.comments,
      {[action.id]: action}
    )
    return {
      state,
      comments: newComments
    }
  }
  if(action.type === 'VOTE_SUCCESS') {
    console.log('action vote', action)
    let commentIndex = 0;
    state.comments.forEach((comment, index) => {
      if(comment.id === action.commentId){
        commentIndex = index;
      }
    })
    console.log('commentIndex', commentIndex)
    return {
      state,
      comments: update(state.comments, {
        [commentIndex]: { 
          delta: {$set: action.delta},
          upvotecounter: {$set: action.upvotecounter},
          downvotecounter: {$set: action.downvotecounter} 
        }
      })
    }
  }
  return state
}

export default commentGet