 const ProfileReducer = (state = {}, action) => {

  switch(action.type) {
    case "GET_PROFILE":
      return action.payload;
      break;
    case "POST_PROFILE":
      return Object.assign(
      {},
      state,
      {
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