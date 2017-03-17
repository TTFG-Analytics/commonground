import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { createDiscussionSuccess } from './discussionActions'
import io from 'socket.io-client'
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import Navigation from 'Navigation'
import UserAlert from 'UserAlert'
import { Router, Route, Link, browserHistory } from 'react-router'
require('./styles.css')

class AddDiscussion extends React.Component{

  constructor(props, context){
    super(props, context)

    this.state = {
      discussionValue: '',
      invalidDiscussion: false
    }
  }

  componentDidMount(){
    window.discussionSocket = io();
    discussionSocket.on('connect', function() {
      console.log('Joined discussions page');
    });
    discussionSocket.on('discussion', (data) => {
      this.props.createDiscussionSuccess(data)
    })
  }

  handleChange(e) {
    this.setState({ discussionValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.discussionValue.length >= 3) {
      let newDiscussion = {
        topic: this.state.discussionValue,
        user: this.props.user.id
      }
      if(window.discussionSocket){
        window.discussionSocket.emit('discussion', newDiscussion)
      }
      this.setState({
        discussionValue: ''
      })
    } else {
      this.setState({
        invalidDiscussion: true
      })
    }
  }

  componentWillUnmount() {
    if(window.discussionSocket) {
      window.discussionSocket.disconnect()
    }
  }

  goLogin() {
    console.log('goLogin', this.context)
    this.context.router.push('/logout')
    // this.history.pushState(null, `/logout`);
    console.log('finished')
  }

  hideDiscussionAlert() {
    this.setState({
      invalidDiscussion: false
    })
  }

  render() {
    var notLoggedIn = false
    if(!this.props.user.id){
      notLoggedIn = true
    }

    return (
      <div className='discussionForm'>
        <Col md={8} mdOffset={2}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="formBasicText">
            <h1 className='discussHelp'>Create a New Discussion</h1>
            {notLoggedIn && <UserAlert
              alertMessage='Log in with your Facebook to add a new discussion.'
              handleAlertDismiss={this.goLogin.bind(this)}
              alertStyle='info'
              alertClose='Login' />}
              <FormControl
                disabled={notLoggedIn}
                componentClass='textarea'
                value={this.state.discussionValue}
                placeholder="Ask a question"
                onChange={this.handleChange.bind(this)}
              />
            <br/>
            {this.state.invalidDiscussion && <UserAlert
              alertMessage='Please enter a valid discussion.'
              handleAlertDismiss={this.hideDiscussionAlert.bind(this)}
              alertStyle='warning'
              alertClose='OK' />}
            <InputGroup.Button><Button type='submit' bsStyle="primary">Submit</Button></InputGroup.Button>
            <br/>
          </FormGroup>
        </form>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.profileReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscussionSuccess: (discussion) => {
      dispatch(createDiscussionSuccess(discussion))
    }
  }
}

AddDiscussion.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDiscussion)