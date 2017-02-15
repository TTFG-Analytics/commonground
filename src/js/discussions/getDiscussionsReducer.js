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
  return state
}

export default discussionsGet

//used for getting all discussions. Those are all accessible in state.discussionsGet
//links with the getDiscussionsSuccess function which provides the action for this