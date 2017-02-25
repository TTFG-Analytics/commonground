 const ProfileReducer = (state = {}, action) => {

  if(action.type === "GET_PROFILE") {
      return action.payload;
  } else if(action.type === 'GET_FBDATA_SUCCESS') {
    console.log('fbGET action', action)
    return Object.assign(
      {},
      state,
      {
        id: action.id,
        fullname: action.fullname,
        facebookid: action.facebookid,
        gender: action.gender,
        locale: action.locale,
        email: action.email,
        facebookpicture: action.facebookpicture,
        title: action.title,
        age: action.age,
        hometown: action.hometown,
        race: action.race,
        industry: action.industry,
        politicalleaning: action.politicalleaning,
        religion: action.religion,
        yearlyincome: action.yearlyincome
      }
    )
  } else if(action.type === "POST_PROFILE") {
    console.log('post profile action reduce', action)
    return Object.assign(
      {},
      state,
      {
        userId: action.id,
        fbName: action.fullname,
        fbId: action.facebookid,
        fbGender: action.gender,
        fbLocale: action.locale,
        fbEmail: action.email,
        fbPicture: action.facebookpicture,
        title: action.title,
        age: action.age,
        hometown: action.hometown,
        race: action.race,
        industry: action.industry,
        politicalleaning: action.politicalleaning,
        religion: action.religion,
        yearlyincome: action.yearlyincome
      }
    )
  }
  return state;
}

export default ProfileReducer