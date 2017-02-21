import React from 'react'
import { connect } from 'react-redux'
import { createCampPost } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'

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
        <Input ref={node => {
          input = node
        }} type='text' label='CommonGround' />
        <Button type='submit' label='Create CommonGround' raised primary />
      </form>
    </div>
  )
}

AddCamp = connect()(AddCamp)

export default AddCamp