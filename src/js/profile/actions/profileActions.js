import axios from 'axios';

export const getProfileSuccess = (profile) => {
  return {
    type: 'GET_PROFILE',
    payload: profile
  }
}

export const getProfile = () => {
  return (dispatch) => {
    return axios.get('/profile')
      .then(response => {
        console.log('workssss!', response.data);
        dispatch(getProfileSuccess(response.data))
      })
      .catch(error => {
        console.log('Error in getProfile', error);
      });
  }

}