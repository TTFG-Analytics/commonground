import React from 'react'
import { connect } from 'react-redux'
import { createCamp } from '../actions/actions'

let AddCamp = ({ dispatch, discussionId }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if(!input.value.trim()) {
          return
        }
        dispatch(createCamp(discussionId, input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type='submit'>Create Camp</button>
      </form>
    </div>
  )
}

AddCamp = connect()(AddCamp)

export default AddCamp