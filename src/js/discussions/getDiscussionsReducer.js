const discussion = (state = {}, action) => {
  if(action.type === "CREATE_DISCUSSION_SUCCESS") {
    return {
      id: action.id,
      inputStr: action.inputStr
    }
  }
  return state;
}

const discussionsGet = (state = {isFetching: false, discussions: [], error: null}, action) => {
  if(action.type === 'GET_DISCUSSIONS_SUCCESS') {
    console.log('action discussions', action.discussions)
    return Object.assign(
      {},
      state,
      {
        isFetching: false,
        error: false,
        discussions: action.discussions
      }
    )
  }
  if(action.type === "CREATE_DISCUSSION_SUCCESS") {
    console.log('discussion made!!!', action)
    return [
      discussion(undefined, action),
      ...state
    ]
  }
  return state
}

export default discussionsGet

//used for getting all discussions. Those are all accessible in state.discussionsGet
//links with the getDiscussionsSuccess function which provides the action for this