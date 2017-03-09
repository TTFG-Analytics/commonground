import React from 'react'
import { Modal } from 'react-bootstrap';

export default class Header extends React.Component{
  render() {
    return (
      <Modal.Header closeButton onClick={this.props.toggleModal}>
        <Modal.Title id="contained-modal-title-lg">{this.props.modalName}</Modal.Title>
      </Modal.Header>
    )
  }
}