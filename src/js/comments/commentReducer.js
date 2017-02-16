const commentGet = (state={comments:[]}, action) => {
  if(action.type === 'GET_COMMENTS_SUCCESS') {
    console.log('action comments', action.comments)
    return Object.assign(
      {},
      state,
      {
        comments: [...state.comments].concat(action.comments)
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
  if(action.type === 'UPVOTE_SUCCESS') {
    return {
      state,
      comments: [...state.comments.slice(0, action.commentId),
        state.comments[action.commentId].upvotecount = action.upvotecounter,
        ...state.comments.slice(action.commentId+1)
      ]
    }
  }
  return state
}

export default commentGet