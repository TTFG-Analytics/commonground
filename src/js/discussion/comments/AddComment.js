import React from 'react'
import { connect } from 'react-redux'
import { createCommentPost, createUpvote } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'

class AddComment extends React.Component{
  render() {
  return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          console.log('refs comment', this.refs.comment.refs.wrappedInstance.inputNode.value)
          let newComment = {
            comment: this.refs.comment.refs.wrappedInstance.inputNode.value,
            commongroundId: this.props.campId
          }
          this.props.createCommentPost(newComment)
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

const mapDispatchToProps = (dispatch) => {
  return {
    createCommentPost: (comment) => {
      dispatch(createCommentPost(comment))
    },
    createUpvote: () => {
      dispatch(createUpvote())
    }
  }
}

AddComment = connect(null, mapDispatchToProps)(AddComment)

export default AddComment