// const camp = (state = {}, action) => {
//   if(action.type === 'CREATE_CAMP_SUCCESS') {
//     return {
//       campId: action.campId,
//       discussionId: action.discussionId,
//       inputStr: action.inputStr
//     }
//   }
//   return state
// }

// const camps = (state = [], action) => {
//   if(action.type === 'CREATE_CAMP_SUCCESS') {
//     return [
//       ...state,
//       camp(undefined, action)
//     ]
//   }
//   return state
// }

// export default camps