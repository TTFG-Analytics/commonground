import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap'
import Constraint from '../camps/Constraint'
import { contributedOnce } from '../actions/actions'

class AddComment extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      commentValue: '',
      showModal: false,
      validInput: false
    }
  }

  getValidationState() {
    const length = this.state.commentValue.length;
    if (length > 9) return 'success'
    else if (length > 1000 || length < 2) return 'error';
  } //need to use this for the form submit later

  handleChange(e) {
    this.setState({ commentValue: e.target.value });
    if (this.getValidationState() === 'success') {this.state.validInput = true}
    if (this.getValidationState() === 'error') {this.state.validInput = false}
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
      this.props.contributedOnce()
    }
    this.state.commentValue = ''
  }

  stopUser(e) {
    e.preventDefault()
    this.setState({
      showModal: true
    })
    console.log('user stopped', this.state)
    this.forceUpdate()
  }

  render() {
    var notLoggedIn = false
    if(!this.props.user.id){
      console.log('this props user', this.props.user)
      notLoggedIn = true
    }
    return (
        <div>
          <form onSubmit={this.props.contributed ? this.stopUser.bind(this) : this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
              <ControlLabel>Create a New Comment</ControlLabel>
              <InputGroup>
                <FormControl
                  disabled={notLoggedIn}
                  type="text"
                  value={this.state.commentValue}
                  placeholder="Enter text"
                  ref='comment'
                  onChange={this.handleChange.bind(this)}
                />
                <InputGroup.Button><Button type='submit' bsStyle="primary">Submit</Button></InputGroup.Button>
              </InputGroup>
            {this.getValidationState() === 'success' ? <div></div> : ValidateHelp()}
            </FormGroup>
          </form>
          <Constraint showModal={this.state.showModal} />
        </div>
      )
  }
}

const ValidateHelp = () => {
  return (<HelpBlock>'Must Be Minimum Length of 2 Characters'</HelpBlock>)
}

const mapStateToProps = (state) => {
  return {
    user: state.profileReducer,
    contributed: state.campGet.contributed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contributedOnce: () => {
      dispatch(contributedOnce())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)

// Old react toolbox code
// <Input type='text' label='Comment' ref='comment' />
//           <Button type='submit' label='Reply' raised primary />