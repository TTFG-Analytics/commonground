import update from 'react-addons-update';

const commentGet = (state={comments:[]}, action) => {
  if(action.type === 'GET_COMMENTS_SUCCESS') {
    console.log('action comments', action.comments)
    return Object.assign(
      {},
      state,
      {
        comments: action.comments
      }
    )
  }
  if(action.type === 'CREATE_COMMENT_SUCCESS') {
    var newComment = action;
    console.log('action create comment', newComment, action)
    return {
      state,
      comments: [...state.comments, newComment]
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

//[...state.comments].concat(action.comments)
  // if(action.type === 'DOWNVOTE_SUCCESS') {
  //   console.log('action downvote', action)
  //   let commentIndex = 0
  //   state.comments.forEach((comment, index) => {
  //     if(comment.id === action.commentId) {
  //       commentIndex = index;
  //     }
  //   })
  //   return {
  //     state,
  //     comments: update(state.comments, {
  //       [commentIndex]: {
  //         delta: {$set: action.delta}
  //       }
  //     })
  //   }
  // }