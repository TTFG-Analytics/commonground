import React from 'react'
import { connect } from 'react-redux'
import { createCampPost } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
import {Button, IconButton} from 'react-toolbox/lib/button'

class AddCamp extends React.Component{
  render() {
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          let newCamp = {
            commonground: this.refs.camp.refs.wrappedInstance.inputNode.value,
            discussionId: this.props.discussionId
          }
          this.props.createCampPost(newCamp)
          this.refs.camp.refs.wrappedInstance.inputNode.value = ''
        }}>
          <Input ref='camp' type='text' label='CommonGround' />
          <Button type='submit' label='Create CommonGround' raised primary />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCampPost: (camp) => {
      dispatch(createCampPost(camp))
    }
  }
}

AddCamp = connect(null, mapDispatchToProps)(AddCamp)

export default AddCamp