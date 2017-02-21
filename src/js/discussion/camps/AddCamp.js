import React from 'react'
import { connect } from 'react-redux'
import { createCampPost } from '../actions/actions'

let AddCamp = ({ dispatch, discussionId }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if(!input.value.trim()) {
          return
        }
        let newCamp = {
          commonground: input.value,
          discussionId: discussionId
        }
        dispatch(createCampPost(newCamp))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type='submit'>Create CommonGround</button>
      </form>
    </div>
  )
}

AddCamp = connect()(AddCamp)

export default AddCamp