import axios from 'axios';

export const getProfileSuccess = (profile) => {
  return {
    type: 'GET_PROFILE',
    payload: profile
  }
}

export const getProfile = (uid) => {
  return (dispatch) => {
    return axios.get('/profile/' + uid)
      .then(response => {
        console.log('workssss!', response.data);
        dispatch(getProfileSuccess(response.data))
      })
      .catch(error => {
        console.log('Error in getProfile', error);
      });
  }

}

export const postProfileSuccess = (profile) => {
  return {
    type: 'POST_PROFILE',
    title: profile.title,
    age: profile.age,
    hometown: profile.hometown,
    race: profile.race,
    industry: profile.industry,
    politicalleaning: profile.politicalleaning,
    religion: profile.religion,
    yearlyincome: profile.yearlyincome
  }
}

export const postProfile = () => {
  return (dispatch) => {
    return axios.post('/profile')
      .then(response => {
        console.log('workssss!', response.data);
        dispatch(postProfileSuccess(response.data))
      })
      .catch(error => {
        console.log('Error in postProfile', error);
      });
  }

}