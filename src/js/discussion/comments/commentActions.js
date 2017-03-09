import axios from 'axios'

export const getCommentsSuccess = (comments) => {
  return {
    type: 'GET_COMMENTS_SUCCESS',
    comments: comments.data
  }
} //sends action that is picked up by getCommentsReducer

export const getComments = (campId) => {
  return (dispatch) => {
    return axios.get('/comments/' + campId)
      .then(response => {
        dispatch(getCommentsSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const createCommentSuccess = (comment) => {
  console.log('created comment', comment)
  return {
    type: 'CREATE_COMMENT_SUCCESS',
    id: comment.id,
    commonground_id: comment.commonground_id,
    input: comment.input,
    user_id: comment.user_id,
    fullname: comment.fullname,
    facebookpicture: comment.facebookpicture,
    delta: 0,
    createdat: comment.createdat
  }
}

export const votesSuccess = (vote) => {
  return {
    type: 'VOTE_SUCCESS',
    commentId: vote.id,
    delta: vote.delta,
    upvotecounter: vote.upvotecounter,
    downvotecounter: vote.downvotecounter
  }
}

export function votesPost(vote) {
  return (dispatch) => {
    return axios.post('/vote', vote)
      .then(response => {
        dispatch(votesSuccess(response.data))
      })
  }
}


export const contributedOnce = () => {
  return {
    type: 'CONTRIBUTED'
  }
}

export const contributeAgainSuccess = () => {
  return {
    type: 'CONTRIBUTE_AGAIN'
  }
}

export const contributeAgain = (currentContribution, callback) => {
  return (dispatch) => {
    return axios.post('/delete', currentContribution)
      .then(response => {
        dispatch(getCommentsSuccess(response))
        dispatch(contributeAgainSuccess())
        callback()
      })
  }
}