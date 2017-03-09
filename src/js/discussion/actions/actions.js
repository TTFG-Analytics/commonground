import axios from 'axios'

let discussionId = 0
let campId = 0
let commentId = 0
let voteId = 0
//these IDs are used to identify the camp that a discussion belongs to (for example)

//get request section
export const GET_DISCUSSIONS_REQUEST = 'GET_DISCUSSIONS_REQUEST';

export const cachingFbData = (fbUser) => {
  console.log('cachingFBData', fbUser)
  console.log('!#!#!#!#!#!#!#!',fbUser.facebookpicture)
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
  console.log('!!!Sending fbData!!!', fbData)
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