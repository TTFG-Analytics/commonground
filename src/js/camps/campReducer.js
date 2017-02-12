const camp = (state = {}, action) => {
  if(action.type === 'SET_CAMP') {
    return {
      campId: action.campId,
      discussionId: action.discussionId,
      inputStr: action.inputStr
    }
  }
  return state
}

const camps = (state = [], action) => {
  if(action.type === 'SET_CAMP') {
    return [
      ...state,
      camp(undefined, action)
    ]
  }
  return state
}

export default camps