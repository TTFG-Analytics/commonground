export default function(state = {}, action) {

  switch(action.type) {
    case "GET_PROFILE":
      return action.payload;
      break;
  }
  return state;
}