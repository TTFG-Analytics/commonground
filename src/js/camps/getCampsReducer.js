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
  return state
}

export default campGet

//used for getting all commongrounds and comments for a discussion. Those are all accessible in state.campGet