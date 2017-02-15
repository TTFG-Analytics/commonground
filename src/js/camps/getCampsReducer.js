const campGet = (state = {isFetching: false, commongrounds: [], error: null}, action) => {
  if(action.type === 'GET_CAMPS_SUCCESS') {
    console.log('action commongrounds', action.camps)
    return Object.assign(
      {},
      state,
      {
        isFetching: false,
        error: false,
        commongrounds: action.camps
      }
    )
  }
  if(action.type === 'CREATE_CAMP_SUCCESS') {
    var newCamp = action;
    console.log('action create camp', newCamp, action)
    return {
      state,
      commongrounds: [...state.commongrounds, newCamp]
    }
  }
  if(action.type === 'CREATE_COMMENT_SUCCESS') {
    console.log('action create comment', action)
    return {
      state,
      commongrounds: [...state.commongrounds, ...state.commongrounds[action.campId].comments[action.commentId] = action] //how to get commetn array to update
    }
  }
  return state
}

export default campGet

//used for getting all commongrounds and comments for a discussion. Those are all accessible in state.campGet