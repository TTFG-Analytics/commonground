import React from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class AgeInput extends React.Component{
  render() {
    return (
      <div>
        <FormGroup onChange={this.props.handleChange} controlId="formBasicText">
          <ControlLabel>Age:</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter your age"
          />
          <FormControl.Feedback />
        </FormGroup>
      </div>
    )
  }
}

export default AgeInput
            // {/*value={this.state.age}*/}