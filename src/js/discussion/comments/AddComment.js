import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap'
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
      }, ()=>{
        if(charsLeft < 997) {
          this.setState({
            invalidComment: false
          });
        } else {
          this.setState({
            invalidComment: true
          });
        }
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
      if(window[this.props.campId]){
        window[this.props.campId].emit('comment', newComment)
      }
      this.setState({
        commentValue: ''
      });
    } else {
      this.setState({
        invalidComment: true
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
      invalidComment: false
    })
  }

  render() {
    var notLoggedIn = false
    if(!this.props.user.id){
      notLoggedIn = true
    }
   
    return (
        <div className='commentForm'>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
          {this.state.invalidComment && <UserAlert
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

//constraint piece that limits a user to one comment per commonground ---> might remove later or re-implement
// import Constraint from '../camps/Constraint'
/*<Constraint
showModal={this.state.showModal}
campId={this.props.campId}
hideModal={this.hideModal.bind(this)} />*/  // <---- removing constraints for testing

// <form onSubmit={this.props.contributed ? this.stopUser.bind(this) : this.handleSubmit.bind(this)}> removing constraint for now
