import React from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'

class Select extends React.Component{
  render() {
    return (
      <div>  
        <ControlLabel>{this.props.label}: </ControlLabel>
        <FormControl 
          onChange={this.props.handleChange} 
          componentClass="select" placeholder="select">
          {this.props.list}
        </FormControl>
      </div>
    )
  }
}

export default Select