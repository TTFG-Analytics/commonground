import {getDiscussions, GET_DISCUSSIONS, GET_DISCUSSIONS_REQUEST, GET_DISCUSSIONS_SUCCESS } from '../actions/actions'

const articleGet = (state = {isFetching: false, articles: [], error: null}, action) => {
  // if(action.type === 'GET_DISCUSSIONS') {
  //   console.log('state',state)
  //   return Object.assign(
  //     {},
  //     state,
  //     {isFetching: true}
  //   )
  // }
  if(action.type === 'GET_DISCUSSIONS_REQUEST_FULFILLED') {
    console.log('success', action.payload)
    return Object.assign(
      {},
      state,
      {
        isFetching: false,
        error: false,
        articles: action.payload.data
      }
    )
  }
  return state;
}

export default articleGet