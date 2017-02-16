import React from 'react'
import { connect } from 'react-redux'
import { createCommentPost, createUpvote } from '../actions/actions'

let AddComment = ({ dispatch, campId }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if(!input.value.trim()) {
          return
        }
        let newComment = {
          comment: input.value,
          commongroundId: campId
        }
        dispatch(createCommentPost(newComment))
        dispatch(createUpvote())
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type='submit'>Reply</button>
      </form>
    </div>
  )
}

AddComment = connect()(AddComment)

export default AddComment