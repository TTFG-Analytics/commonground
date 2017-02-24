import React from 'react'
import { connect } from 'react-redux'
import { createDiscussionPost, createDiscussionSuccess } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'
import io from 'socket.io-client'


class AddDiscussion extends React.Component{

  componentDidMount(){
    window.discussionSocket = io();
    discussionSocket.on('connect', function() {
      console.log('AddDiscussion hit');
    });
    discussionSocket.on('discussion', (data) => {
      console.log('FRONT END DATA', data);
        this.props.createDiscussionSuccess(data)
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          let newDiscussion = {topic: this.refs.discussion.refs.wrappedInstance.inputNode.value}
          if(window.discussionSocket){
            console.log('window discussionSocket', window, window.discussionSocket)
            window.discussionSocket.emit('discussion', newDiscussion)
          }
          // this.props.createDiscussionSuccess(newDiscussion)
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
    createDiscussionSuccess: (discussion) => {
      dispatch(createDiscussionSuccess(discussion))
    }
  }
}

AddDiscussion = connect(null, mapDispatchToProps)(AddDiscussion)

export default AddDiscussion