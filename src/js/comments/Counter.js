import React from 'react'
import { increaseUpvotes } from '../actions/actions'
import { connect } from 'react-redux'

let Counter = ({dispatch, commentId, upvotes}) => {
  //let currentUpvote = upvotes[commentId].count
  console.log('upvotes ', upvotes)
  let currentUpvote = 1
  return (<div>
      <p className="upvoteCount">Upvotes: {currentUpvote}</p>
      <button onClick={() => {
        dispatch(increaseUpvotes(commentId))}
      }>+1</button>
      <p className="downvoteCount">Downvotes</p>
      <button>-1</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    upvotes: state.upvotes
  }
}


export default connect(mapStateToProps)(Counter)