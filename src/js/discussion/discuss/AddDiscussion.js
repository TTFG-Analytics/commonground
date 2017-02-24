import React from 'react'
import { connect } from 'react-redux'
import { createDiscussionPost } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'

class AddDiscussion extends React.Component{
  render() {
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          let newDiscussion = {topic: this.refs.discussion.refs.wrappedInstance.inputNode.value}
          this.props.createDiscussionPost(newDiscussion)
          this.refs.discussion.refs.wrappedInstance.inputNode.value = ''
        }}>
          <Input ref='discussion' type='text' label='Discussion' />
          <Button type='submit' label='Create Discussion' raised primary/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscussionPost: (discussion) => {
      dispatch(createDiscussionPost(discussion))
    }
  }
}

AddDiscussion = connect(null, mapDispatchToProps)(AddDiscussion)

export default AddDiscussion