import React from 'react'
import { increaseUpvotesPost, increaseDownvotesPost } from '../actions/actions'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

class Counter extends React.Component {
  render() {
    console.log('upvotes props -----', this.props)
    let currentUpvote = 0;
    let currentDownvote = 0;
    let commentId = this.props.commentId
    let userId = this.props.userId
    this.props.comments.forEach(comment => {
      if(comment.id === commentId) {
        currentUpvote = comment.upvotecounter
        currentDownvote = comment.downvotecounter
      }
    })
    return (
      <div>
        <p className="upvoteCount">Upvotes: {currentUpvote}</p>
        <Button
          type='submit'
          bsStyle="primary"
          onClick={() => {
            this.props.increaseUpvotesPost({vote: '1', commentId: commentId, userId: userId})
          }}
          >Upvote
          </Button>
        <p className="downvoteCount">Downvotes: {currentDownvote}</p>
        <Button
          type='submit'
          bsStyle="primary"
          onClick={() => {
            this.props.increaseDownvotesPost({vote: '0', commentId: commentId, userId: userId})
          }}
          >Downvote
          </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state user id', state.profileReducer.id)
  return {
    comments: state.commentGet.comments,
    userId: state.profileReducer.id
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