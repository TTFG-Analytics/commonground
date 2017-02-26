import React from 'react'
import { connect } from 'react-redux'
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
  } //need to use this for the form submit later

  handleChange(e) {
    this.setState({ commentValue: e.target.value });
  }

  handleSubmit(e) {
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
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
  return {
    userId: state.profileReducer.id
  }
}

export default connect(mapStateToProps)(AddComment)

// Old react toolbox code
// <Input type='text' label='Comment' ref='comment' />
//           <Button type='submit' label='Reply' raised primary />