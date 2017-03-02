import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { createDiscussionSuccess } from '../actions/actions'
import io from 'socket.io-client'
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import Navigation from '../../navbar/navbar'
require('./styles.css')

class AddDiscussion extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      discussionValue: ''
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

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ discussionValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
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
  }

  componentWillUnmount() {
    if(window.discussionSocket) {
      window.discussionSocket.disconnect()
    }
  }

  render() {
    let notLoggedIn = false
    if(!this.props.user.id){
      notLoggedIn = true
    }

    return (
      <div>
        <Col md={8} mdOffset={2}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="formBasicText">
            <h1 className='discussHelp'>Create a New Discussion</h1>
            <InputGroup>
              <FormControl
                disabled={notLoggedIn}
                type="text"
                value={this.state.discussionValue}
                placeholder="Enter text"
                ref='discussion'
                onChange={this.handleChange.bind(this)}
              />
              <InputGroup.Button><Button type='submit' bsStyle="primary">Submit</Button></InputGroup.Button>
            </InputGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddDiscussion)