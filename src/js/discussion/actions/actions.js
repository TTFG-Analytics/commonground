import axios from 'axios'

let discussionId = 0
let campId = 0
let commentId = 0
let voteId = 0
//these IDs are used to identify the camp that a discussion belongs to (for example)

//get request section
export const GET_DISCUSSIONS_REQUEST = 'GET_DISCUSSIONS_REQUEST';

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


//post request section

export const createDiscussionSuccess = (discussion) => {
  return {
    type: 'CREATE_DISCUSSION_SUCCESS',
    id: discussion.id,
    input: discussion.input,
    user_id: discussion.user_id
  }
} //sends action that's picked up by discussionReducer

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

export const cachingFbData = (fbUser) => {
  console.log('cachingFBData', fbUser)
  return {
    type: 'GET_FBDATA_SUCCESS',
    id: fbUser.id,
    fullname: fbUser.fullname,
    facebookid: fbUser.facebookid,
    gender: fbUser.gender,
    gocale: fbUser.locale,
    email: fbUser.email,
    facebookpicture: fbUser.facebookpicture,
    title: fbUser.title,
    age: fbUser.age,
    hometown: fbUser.hometown,
    race: fbUser.race,
    industry: fbUser.industry,
    politicalleaning: fbUser.politicalleaning,
    religion: fbUser.religion,
    yearlyincome: fbUser.yearlyincome
  }
}

// get data from facebook auth
export function sendingFbData(fbData) {
  return (dispatch) => {
    return axios.post('/login', fbData)
      .then(response => {
        dispatch(cachingFbData(response.data.rows[0]))
      })
  }
}

//not sure why we need this
export function sendingFbDataSuccess(fbUser) {
  console.log('****sendingFBData', fbUser)
  return {
    type: 'GET_FBDATA',
    userId: fbUser.id,
    fbName: fbUser.fullname,
    fbId: fbUser.facebookid,
    fbGender: fbUser.gender,
    fbLocale: fbUser.locale,
    fbEmail: fbUser.email,
    fbPicture: fbUser.facebookpicture
  }
}

export const contributedOnce = () => {
  return {
    type: 'CONTRIBUTED'
  }
}

export const contributeAgain = () => {
  return {
    type: 'CONTRIBUTE_AGAIN'
  }
}