const discussionsGet = (state = { discussions: [] }, action) => {
  if(action.type === 'GET_DISCUSSIONS_SUCCESS') {
    return Object.assign(
      {},
      state,
      {
        discussions: action.discussions.reduce((hash, discussion) => (
          hash[discussion.id] = discussion, hash
        ), {})
      }
    ) //normalized the discussionsGet reducer
    // console.log('action discussions', action.discussions)
    // return Object.assign(
    //   {},
    //   state,
    //   {
    //     isFetching: false,
    //     error: false,
    //     discussions: action.discussions
    //   }
    // )
  }
  if(action.type === "CREATE_DISCUSSION_SUCCESS") {
    let newDiscussions =  Object.assign(
      {},
      state.discussions,
      {[action.id]: action}
    )
    return Object.assign(
      {},
      state,
      {
        discussions: newDiscussions
      }
    )
  }
  return state
}

export default discussionsGet

//used for getting all discussions. Those are all accessible in state.discussionsGet
//links with the getDiscussionsSuccess function which provides the action for this