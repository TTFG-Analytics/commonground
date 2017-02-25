const fbGet = (state={}, action) => {
  // if(action.type === 'GET_FBDATA_SUCCESS') {
  //   console.log('fbGET action', action)
  //   return Object.assign(
  //     {},
  //     state,
  //     action.payload
  //   )
  // }
  
  return state
}

export default fbGet

// //used for getting all commongrounds and comments for a discussion. Those are all accessible in state.campGet
// {
//         userId: action.userId,
//         fbName: action.fbName,
//         fbId: action.fbId,
//         fbGender: action.fbGender,
//         fbLocale: action.fbLocale,
//         fbEmail: action.fbEmail,
//         fbPicture: action.fbPicture,
//         title: action.title,
//         age: action.age,
//         hometown: action.hometown,
//         race: action.race,
//         industry: action.industry,
//         politicalleaning: action.politicalleaning,
//         religion: action.religion,
//         yearlyincome: action.yearlyincome
//       }