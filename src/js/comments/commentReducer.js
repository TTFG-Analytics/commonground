const comment = (state = {}, action) => {
  if(action.type === 'MAKE_COMMENT') {
    return {
      commentId: action.commentId,
      campId: action.campId,
      inputStr: action.inputStr
    }
  }
  return state
}

const comments = (state = [], action) => {
  if(action.type === 'MAKE_COMMENT') {
    return [
      ...state,
      comment(undefined, action)
    ]
  }
  return state
}

export default comments