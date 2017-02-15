import React from 'react'
import { connect } from 'react-redux'
import { createDiscussionPost } from '../actions/actions'

let AddDiscussion = ({ dispatch }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if(!input.value.trim()) {
          return
        }
        let newDiscussion = {topic: input.value}
        dispatch(createDiscussionPost(newDiscussion))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type='submit'>Create Discussion</button>
      </form>
    </div>
  )
}

AddDiscussion = connect()(AddDiscussion)

export default AddDiscussion