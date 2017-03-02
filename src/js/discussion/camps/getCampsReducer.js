const campGet = (state={commongrounds: []}, action) => {
  if(action.type === 'GET_CAMPS_SUCCESS') {
    console.log('action commongrounds', action.camps, action.contributed)
    return Object.assign(
      {},
      state,
      {
        commongrounds: action.camps,
        contributed: action.contributed
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
  if(action.type === 'CREATE_COMMENT_SUCCESS') { //change state so user can't make more comments
    return Object.assign(
      {},
      state,
      {
        contributed: true
      }
    )
  }
  return state
}

export default campGet

//used for getting all commongrounds and comments for a discussion. Those are all accessible in state.campGet