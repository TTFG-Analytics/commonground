import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap'

class AddComment extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      commentValue: '',
      showModal: false
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
    console.log('this props user', this.props.user.fullname)
    var userPic = this.props.user.facebookpicture || 'unknown'
    let newComment = {
      comment: this.state.commentValue,
      commongroundId: this.props.campId,
      userId: this.props.user.id,
      userName: this.props.user.fullname,
      userPic: userPic
    }
    if(window.socket){
      console.log('window socket', window, window.socket)
      window.socket.emit('comment', newComment)
    }
    this.state.commentValue = ''
  }

  stopUser(e) {
    e.preventDefault()
    console.log('user stopped', this.state)
    this.setState({
      showModal: true
    })
  }

  render() {
    return (
        <div>
          <form onSubmit={this.props.contributed ? this.stopUser.bind(this) : this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Create a New Comment</ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  value={this.state.commentValue}
                  placeholder="Enter text"
                  ref='comment'
                  onChange={this.handleChange.bind(this)}
                />
                <InputGroup.Button><Button type='submit' bsStyle="primary">Submit</Button></InputGroup.Button>
              </InputGroup>
              <HelpBlock>Character limit: </HelpBlock>
            </FormGroup>
          </form>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.profileReducer,
    contributed: state.campGet.contributed
  }
}

export default connect(mapStateToProps)(AddComment)

// Old react toolbox code
// <Input type='text' label='Comment' ref='comment' />
//           <Button type='submit' label='Reply' raised primary />