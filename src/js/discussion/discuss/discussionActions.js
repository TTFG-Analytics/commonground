import axios from 'axios'

export const getDiscussionsSuccess = (discussions) =>{
  return {
    type: 'GET_DISCUSSIONS_SUCCESS',
    discussions: discussions
  }
} //sends action that is picked up by getDiscussionsReducer

export const getDiscussions = () => {
  return (dispatch) => {
    return axios.get('/discussions')
      .then(response => {
        dispatch(getDiscussionsSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const createDiscussionSuccess = (discussion) => {
  return {
    type: 'CREATE_DISCUSSION_SUCCESS',
    id: discussion.id,
    input: discussion.input,
    user_id: discussion.user_id,
    createdat: discussion.createdat
  }
} //sends action that's picked up by discussionReducer