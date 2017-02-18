const fbGet = (state={}, action) => {
  if(action.type === 'GET_FBDATA_SUCCESS') {
    console.log('fbGET action', action)
    return Object.assign(
      {},
      state,
      {
        fbName: action.fbName,
        fbId: action.fbId,
        fbGender: action.fbGender,
        fbLocale: action.fbLocale,
        fbEmail: action.fbEmail,
        fbPicture: action.fbPicture
      }
    )
  }
  
  return state
}

export default fbGet

//used for getting all commongrounds and comments for a discussion. Those are all accessible in state.campGet