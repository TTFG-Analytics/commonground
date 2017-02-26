import React from 'react'
import { connect } from 'react-redux'
import { createCommentSuccess } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
//import {Button, IconButton} from 'react-toolbox/lib/button'
import io from 'socket.io-client'
import { Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap'



class AddComment extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      commentValue: ''
    }
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    console.log('HANDLE CHANGE THIS', this);
    this.setState({ commentValue: e.target.value });
  }

  render() {
  console.log('this nsp comment', this.props.nsp)
  var nsp = this.props.nsp
  return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          let newComment = {
            comment: this.state.commentValue,
            commongroundId: this.props.campId,
            userId: this.props.userId
          }
          if(window.socket){
            console.log('window socket', window, window.socket)
            window.socket.emit('comment', newComment)
          }
          this.state.commentValue = ''
        }}>

          <FormGroup controlId="formBasicText">
            <ControlLabel>Create a New Comment</ControlLabel>
            <FormControl
              type="text"
              value={this.state.commentValue}
              placeholder="Enter text"
              ref='comment'
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />
            <HelpBlock>Character limit: </HelpBlock>
          </FormGroup>
          <Button type='submit' bsStyle="primary">Submit</Button>

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
    }
  }
}

AddComment = connect(mapStateToProps, mapDispatchToProps)(AddComment)

export default AddComment



// Old react toolbox code
// <Input type='text' label='Comment' ref='comment' />
//           <Button type='submit' label='Reply' raised primary />