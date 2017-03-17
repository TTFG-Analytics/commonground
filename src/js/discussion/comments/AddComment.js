import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap'
import Constraint from '../camps/Constraint'
import { contributedOnce } from './commentActions'
import UserAlert from 'UserAlert'
require('./comment.css');

class AddComment extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      commentValue: '',
      showModal: false,
      remainingCharacters: 1000,
      invalidComment: false
    }
  }

  handleChange(e) {
    let charsLeft = 1000 - e.target.value.length
    if(charsLeft >= 0) {
      this.setState({
        commentValue: e.target.value,
        remainingCharacters: charsLeft
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.commentValue.length >= 3) {
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
    } else {
      this.setState({
        invalidDiscussion: true
      })
    }
  }

  stopUser(e) {
    e.preventDefault()
    this.setState({
      showModal: true
    })
  } 

  hideModal() {
    this.setState({
      showModal: false
    })
  }

  hideCommentAlert() {
    this.setState({
      invalidDiscussion: false
    })
  }

  render() {
    var notLoggedIn = false
    // if(!this.props.user.id){
    //   notLoggedIn = true
    // }
              /*<Constraint
            showModal={this.state.showModal}
            campId={this.props.campId}
            hideModal={this.hideModal.bind(this)} />*/  // <---- removing constraints for testing

    return (
        <div className='commentForm'>
          <form onSubmit={this.props.contributed ? this.stopUser.bind(this) : this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Create a New Comment</ControlLabel>
              <FormControl
                disabled={notLoggedIn}
                componentClass='textarea'
                value={this.state.commentValue}
                placeholder="Enter text"
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
            <InputGroup.Button className='commentSubmit'>
              <h5 id='charCount'>Remaining characters: {this.state.remainingCharacters}</h5>
              <Button type='submit' bsStyle="primary" >Submit</Button>
            </InputGroup.Button>
          </form>
          <br />
          {this.state.invalidDiscussion && <UserAlert
            alertMessage='Please enter a valid comment.'
            handleAlertDismiss={this.hideCommentAlert.bind(this)}
            alertStyle='warning'
            alertClose='OK' />}
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

const mapDispatchToProps = (dispatch) => {
  return {
    contributedOnce: () => {
      dispatch(contributedOnce())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)