 const ProfileReducer = (state = {}, action) => {

  switch(action.type) {
    case "GET_PROFILE":
      return action.payload;
      break;
    case "POST_PROFILE":
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
      break;
  }
  return state;
}

export default ProfileReducer