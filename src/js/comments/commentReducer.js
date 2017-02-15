const comment = (state = {}, action) => {
  if(action.type === 'CREATE_COMMENT_SUCCESS') {
    console.log('action campid', action.campId)
    return {
      commentId: action.commentId,
      campId: action.campId,
      inputStr: action.inputStr
    }
  }
  return state
}

const comments = (state = [], action) => {
  if(action.type === 'CREATE_COMMENT_SUCCESS') {
    return [
      ...state,
      comment(undefined, action)
    ]
  }
  return state
}

export default comments