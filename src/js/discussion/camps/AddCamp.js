import React from 'react'
import { connect } from 'react-redux'
import { createCampPost } from '../actions/actions'
//import Input from 'react-toolbox/lib/input'
//import {Button, IconButton} from 'react-toolbox/lib/button'
import { Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';


class AddCamp extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      cgValue: ''
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
    this.setState({ cgValue: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          let newCamp = {
            commonground: this.state.cgValue,
            discussionId: this.props.discussionId
          }
          this.props.createCampPost(newCamp);
          this.state.cgValue = '';
        }}>

          <FormGroup controlId="formBasicText">
            <ControlLabel>Create a New CommonGround</ControlLabel>
            <FormControl
              type="text"
              value={this.state.cgValue}
              placeholder="Enter text"
              ref='cg'
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

const mapDispatchToProps = (dispatch) => {
  return {
    createCampPost: (camp) => {
      dispatch(createCampPost(camp))
    }
  }
}

AddCamp = connect(null, mapDispatchToProps)(AddCamp)

export default AddCamp

// Old react toolbox code
// <Input ref='camp' type='text' label='CommonGround' />
//           <Button type='submit' label='Create CommonGround' raised primary />
