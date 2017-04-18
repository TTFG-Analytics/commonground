const checkForData = (upvotes, downvotes, comments) => {
  if(upvotes || downvotes) {
    return true
  } else if(comments && comments.length > 0){
    return true
  } else {
    return false
  }
}

export default checkForData