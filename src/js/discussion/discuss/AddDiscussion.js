import React from 'react'
import { connect } from 'react-redux'
import { createDiscussionPost } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'

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
        <Input ref={node => {
          input = node
        }} type='text' label='Discussion' />
        <Button type='submit' label='Create Discussion' raised primary/>
      </form>
    </div>
  )
}

AddDiscussion = connect()(AddDiscussion)

export default AddDiscussion