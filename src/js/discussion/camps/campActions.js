import axios from 'axios'

export const getCampsSuccess = (camps) => {
  var contributed = false;
  if(camps.discussionContribution && camps.discussionContribution.length > 0) {
    contributed = true;
  }
  return {
    type: 'GET_CAMPS_SUCCESS',
    camps: camps.data,
    contributed: contributed
  }
} //sends action that is picked up by getCampsReducer

export const getCamps = (discussionId, fullname) => {
  return (dispatch) => {
    return axios.get(`/discussion/${discussionId}/${fullname}`)
      .then(response => {
        dispatch(getCampsSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const createCampSuccess = (camp) => {
  return {
    type: 'CREATE_CAMP_SUCCESS',
    id: camp.id,
    discussion_id: camp.discussion_id,
    input: camp.input
  }
} //sends action that's picked up by campReducer

export const createCampPost = (camp) => {
  return (dispatch) => {
    return axios.post('/commonground', camp)
      .then(response => {
        dispatch(createCampSuccess(response.data[0]))
      })
  }
}