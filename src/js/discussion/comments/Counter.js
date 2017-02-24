import React from 'react'
import { increaseUpvotesPost, increaseDownvotesPost } from '../actions/actions'
import { connect } from 'react-redux'
import {Button, IconButton} from 'react-toolbox/lib/button'

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
        <Button onClick={() => {
          this.props.increaseUpvotesPost({vote: '1', commentId: commentId})
        }} label='Upvote' raised primary/>
        <p className="downvoteCount">Downvotes: {currentDownvote}</p>
        <Button onClick={() => {
          this.props.increaseDownvotesPost({vote: '0', commentId: commentId})
        }} label='Downvote' raised primary/>
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