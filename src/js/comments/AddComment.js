import React from 'react'
import { connect } from 'react-redux'
import { createComment, createUpvote } from '../actions/actions'

let AddComment = ({ dispatch, campId }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if(!input.value.trim()) {
          return
        }
        dispatch(createComment(campId, input.value))
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