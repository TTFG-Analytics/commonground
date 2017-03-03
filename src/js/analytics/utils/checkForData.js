const checkForData = (upvotes, downvotes, comments) => {
  console.log('upvotes', upvotes, 'downvotes', downvotes)
  if(upvotes || downvotes) {
    return true
  } else if(comments && comments.length > 0){
    return true
  } else {
    return false
  }
}

export default checkForData