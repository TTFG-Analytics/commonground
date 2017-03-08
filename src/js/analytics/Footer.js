import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default class Footer extends React.Component{
  render() {
    return (
      <Modal.Footer>
        <Button onClick={this.props.toggleModal}>Close</Button>
      </Modal.Footer>
    )
  }
}