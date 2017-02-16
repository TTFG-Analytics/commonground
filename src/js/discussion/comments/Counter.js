import React from 'react'
import { increaseUpvotesPost, increaseDownvotesPost } from '../actions/actions'
import { connect } from 'react-redux'

class Counter extends React.Component {
  render() {
    console.log('upvotes props -----', this.props)
    let currentUpvote = 0;
    let currentDownvote = 0;
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
        }}>Upvote</button>
        <p className="downvoteCount">Downvotes: {currentDownvote}</p>
        <button onClick={() => {
          this.props.increaseDownvotesPost({vote: '0', commentId: commentId})
        }}>Downvote</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseUpvotesPost: (vote) => {
      dispatch(increaseUpvotesPost(vote))
    },
    increaseDownvotesPost: (vote) => {
      dispatch(increaseDownvotesPost(vote))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)