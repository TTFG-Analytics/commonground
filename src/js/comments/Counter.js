import React from 'react'
import { increaseUpvotesPost } from '../actions/actions'
import { connect } from 'react-redux'

class Counter extends React.Component {
  render() {
    console.log('upvotes props -----', this.props)
    let currentUpvote = 0;
    let currentDownvote = 0;
    // if(this.props.upvotes.length > 0){
    //   currentUpvote = this.props.upvotes.length
    // } else {
    
    // }
    let commentId = this.props.commentId
    this.props.comments.forEach(comment => {
      if(comment.id === commentId) {
        currentUpvote = comment.upvotecounter
        currentDownvote = comment.downvotecounter
      }
    })
    return (
      <div>
        <p className="upvoteCount">Upvotes: {currentUpvote}</p>
        <button onClick={() => {
          this.props.increaseUpvotesPost({vote: '1', commentId: commentId})
        }}>+1</button>
        <p className="downvoteCount">Downvotes: {currentDownvote}</p>
        <button>-1</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('upvotes ============= ', state)
  return {
    comments: state.commentGet.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseUpvotesPost: (vote) => {
      dispatch(increaseUpvotesPost(vote))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)