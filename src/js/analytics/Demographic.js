import React from 'react'
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'
import demographics from './demographics/demographics'

class Demographic extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    let listDemographics = demographics.map((demographic) => {
      return(
        <option value={demographic.value}>{demographic.value}</option>
      )
    })

    return (
      <div>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select Demographic Property</ControlLabel>
          <FormControl onChange={this.props.demographicChange} componentClass="select" placeholder="select" ref="select">
            {listDemographics}
          </FormControl>
        </FormGroup>
        <Button onClick={this.props.getData} type='submit' bsStyle="primary">Get Data</Button>
      </div>
    )
  }

}

export default Demographic