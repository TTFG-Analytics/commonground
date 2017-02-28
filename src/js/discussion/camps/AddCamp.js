import React from 'react'
import { connect } from 'react-redux'
import { createCampPost } from '../actions/actions'
import { InputGroup, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';


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
    this.setState({ cgValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    let newCamp = {
      commonground: this.state.cgValue,
      discussionId: this.props.discussionId
    }
    this.props.createCampPost(newCamp);
    this.state.cgValue = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Create a New CommonGround</ControlLabel>
              <InputGroup>
              <FormControl
                type="text"
                value={this.state.cgValue}
                placeholder="Enter text"
                ref='cg'
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

const mapDispatchToProps = (dispatch) => {
  return {
    createCampPost: (camp) => {
      dispatch(createCampPost(camp))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddCamp)

// Old react toolbox code
// <Input ref='camp' type='text' label='CommonGround' />
//           <Button type='submit' label='Create CommonGround' raised primary />
