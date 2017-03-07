const campGet = (state={commongrounds: []}, action) => {
  if(action.type === 'GET_CAMPS_SUCCESS') {
    console.log('action commongrounds', action.camps, action.contributed)
    return Object.assign(
      {},
      state,
      {
        commongrounds: action.camps.reduce((hash, camp) => (
          hash[camp.id] = camp, hash
        ), {}),
        contributed: action.contributed
      }
    )
  }
  if(action.type === 'CREATE_CAMP_SUCCESS') {
    let newCamps = Object.assign(
      {},
      state.commongrounds,
      {[action.id]: action}
    )
    return Object.assign(
      {},
      state,
      {
        contributed: false,
        commongrounds: newCamps
      }
    )
  }
  if(action.type === 'CONTRIBUTED') { //change state so user can't make more comments
    console.log('contributed once')
    return Object.assign(
      {},
      state,
      {
        contributed: true
      }
    )
  }
  if(action.type === 'CONTRIBUTE_AGAIN') { //change state so user can't make more comments
    console.log('contribute more')
    return Object.assign(
      {},
      state,
      {
        contributed: false
      }
    )
  }
  return state
}

export default campGet

//used for getting all commongrounds and comments for a discussion. Those are all accessible in state.campGet
// ''