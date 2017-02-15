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
    var newDiscuss = action;
    return {
      state,
      discussions: [...state.discussions, newDiscuss]
    }
  }
  return state
}

export default discussionsGet

//used for getting all discussions. Those are all accessible in state.discussionsGet
//links with the getDiscussionsSuccess function which provides the action for this