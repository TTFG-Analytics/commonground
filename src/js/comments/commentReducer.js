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
  return state
}

export default commentGet