import React from 'react'
import { connect } from 'react-redux';
import { Modal, Glyphicon, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import { contributeAgain } from '../actions/actions'

class Constraint extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: this.props.showModal
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('props changed again', nextProps.showModal)
    this.setState({
      showModal: nextProps.showModal
    })
  }

  doNothing() {
    this.setState({
      showModal: !this.props.showModal
    })
  }

  allowContribution() {
    console.log('allowContribution this', this)
    this.props.contributeAgain()
    this.setState({
      showModal: !this.props.showModal
    })
  }

  render() {
    return (
      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Modal.Body>
          <div>
            <h4>You have already contributed to this discussion. By clicking the button, you'll be removing your previous contribution and creating a new one.</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.doNothing()} type='submit' bsStyle='default'>Keep old contribution and do nothing</Button>
          <Button onClick={() => this.allowContribution()} type='submit' bsStyle="warning">Delete old contribution and Add new</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contributeAgain: () => {
      dispatch(contributeAgain())
    }
  }
}

export default connect(null, mapDispatchToProps)(Constraint)