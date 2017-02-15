const discussion = (state = {}, action) => {
  if(action.type === "CREATE_DISCUSSION_SUCCESS") {
    return {
      id: action.id,
      inputStr: action.inputStr
    }
  }
  return state;
}

const discussions = (state = [], action) => {
  if(action.type === "CREATE_DISCUSSION_SUCCESS") {
    console.log('discussion made!!!', action)
    return [
      ...state,
      discussion(undefined, action)
    ]
  }
  return state
}

export default discussions
//4) set up the discussionReducer that was referenced in store.js
//if a change is made to the input, the state is updated