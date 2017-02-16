import React from 'react'
import { increaseUpvotesPost } from '../actions/actions'
import { connect } from 'react-redux'

class Counter extends React.Component {
  render() {
    console.log('upvotes props -----', this.props)
    let currentUpvote;
    // if(this.props.upvotes.length > 0){
    //   currentUpvote = this.props.upvotes.length
    // } else {
      currentUpvote = 0
    // }
    let commentId = this.props.commentId
    return (
      <div>
        <p className="upvoteCount">Upvotes: {currentUpvote}</p>
        <button onClick={() => {
          this.props.increaseUpvotesPost({vote: 1, commentId: commentId})
        }}>+1</button>
        <p className="downvoteCount">Downvotes</p>
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
    increaseUpvotesPost: (commentId) => {
      dispatch(increaseUpvotesPost(commentId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)