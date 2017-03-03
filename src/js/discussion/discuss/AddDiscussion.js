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
      discussionValue: '',
      validInput: false
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
    const length = this.state.discussionValue.length;
    if (length > 9) return 'success'
    else if (length > 140|| length < 10) return 'error';
  }

  handleChange(e) {
    this.setState({ discussionValue: e.target.value });
    if (this.getValidationState() === 'success') {this.state.validInput = true}
    if (this.getValidationState() === 'error') {this.state.validInput = false}

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
          <FormGroup className = 'formText' controlId="formBasicText" validationState={this.getValidationState()}>
            <h1 className='discussHelp'>Create a New Discussion</h1>
            <InputGroup className = 'inputText'>
              <FormControl
                disabled={notLoggedIn}
                type="text"
                value={this.state.discussionValue}
                placeholder="Enter text"
                ref='discussion'
                onChange={this.handleChange.bind(this)}
              />
              <InputGroup.Button><Button type='submit' bsStyle="primary" disabled={!this.state.validInput}>Submit</Button></InputGroup.Button>
            </InputGroup>
            {this.getValidationState() === 'success' ? <div></div> : ValidateHelp()}
            <br/>
          </FormGroup>
        </form>
        </Col>
      </div>
    )
  }
}



const ValidateHelp = () => {
  return (<HelpBlock>'Must Be Minimum Length of 10 Characters'</HelpBlock>)
}


const mapStateToProps = (state) => {
  return {
    user: state.profileReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscussionDenied: (discussion) => {
      dispatch(createDiscussionSuccess(discussion))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDiscussion)


            // {this.getValidationState()} ? '<HelpBlock>Success</HelpBlock>' : '<HelpBlock>Denied</HelpBlock>';
