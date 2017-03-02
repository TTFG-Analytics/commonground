import React from 'react'
import { connect } from 'react-redux';
import { Modal, Glyphicon, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import { contribute } from '../actions/actions'

class Constraint extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false
    }
  }

  componentWillReceiveProps() {
    this.setState({
      showModal: true
    })
  }

  allowContribution() {
    this.props.contribute()
    this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Modal.Body>
          <div>
            
            <Button onClick={() => this.allowContribution()} type='submit' bsStyle="primary">Delete old contribution and Add new</Button>

          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contribute: () => {
      dispatch(contribute())
    }
  }
}

export default connect(null, mapDispatchToProps)(Constraint)