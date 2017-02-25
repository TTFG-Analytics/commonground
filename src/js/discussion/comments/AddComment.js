import React from 'react'
import { connect } from 'react-redux'
import { createCommentSuccess, createUpvote } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'
import io from 'socket.io-client'


class AddComment extends React.Component{
  render() {
  console.log('this nsp comment', this.props.nsp)
  var nsp = this.props.nsp
  return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          console.log('refs comment', this.refs.comment.refs.wrappedInstance.inputNode.value)
          let newComment = {
            comment: this.refs.comment.refs.wrappedInstance.inputNode.value,
            commongroundId: this.props.campId,
            userId: this.props.userId
          }
          if(window.socket){
            console.log('window socket', window, window.socket)
            window.socket.emit('comment', newComment)
          }
          // this.props.createCommentSuccess(newComment)
          this.props.createUpvote()
          this.refs.comment.refs.wrappedInstance.inputNode.value = ''
        }}>
          <Input type='text' label='Comment' ref='comment' />
          <Button type='submit' label='Reply' raised primary />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state user id', state.profileReducer.id)
  return {
    userId: state.profileReducer.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCommentSuccess: (comment) => {
      dispatch(createCommentSuccess(comment))
    },
    createUpvote: () => {
      dispatch(createUpvote())
    }
  }
}

AddComment = connect(mapStateToProps, mapDispatchToProps)(AddComment)

export default AddComment