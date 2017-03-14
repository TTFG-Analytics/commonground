import React from 'react';
import { connect } from 'react-redux';
import { createCampPost } from './campActions';
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import UserAlert from 'UserAlert';
require('./camp.css');

class AddCamp extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      cgValue: '',
      invalidCamp: false
    }
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ cgValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.cgValue.length >= 3) {
      let newCamp = {
        commonground: this.state.cgValue,
        discussionId: this.props.discussionId
      }
      this.props.createCampPost(newCamp);
      this.setState({
        cgValue: ''
      })
    } else {
      this.setState({
        invalidCamp: true
      })
    }
  }

  hideCampAlert() {
    this.setState({
      invalidCamp: false
    })
  }

  render() {
    var notLoggedIn = false
    // if(!this.props.user.id){
    //   notLoggedIn = true
    // }

    return (
      <div className='container campForm'>
        <Col md={8} mdOffset={2}>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicText">
              <ControlLabel className='campFormLabel'>Create a New CommonGround</ControlLabel>
              <InputGroup>
              <FormControl
                type="text"
                disabled={notLoggedIn}
                value={this.state.cgValue}
                placeholder="Enter text"
                onChange={this.handleChange.bind(this)}
              />
              <InputGroup.Button><Button type='submit' bsStyle="primary">Submit</Button></InputGroup.Button>
              </InputGroup>
          </FormGroup>
        </form>
        <br />
        {this.state.invalidCamp && <UserAlert
          alertMessage='Please enter a valid CommonGround.'
          handleAlertDismiss={this.hideCampAlert.bind(this)}
          alertStyle='warning'
          alertClose='OK' />}
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
    createCampPost: (camp) => {
      dispatch(createCampPost(camp))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCamp)

// Old react toolbox code
// <Input ref='camp' type='text' label='CommonGround' />
//           <Button type='submit' label='Create CommonGround' raised primary />
