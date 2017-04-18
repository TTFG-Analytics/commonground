/* Commenting out the Constraint modal since, we're not using it for now. Might re-implement in the future.

import React from 'react'  
import { connect } from 'react-redux';
import { Modal, Glyphicon, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
// import { contributeAgain } from '../comments/commentActions'

class Constraint extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: this.props.showModal
    }
  }

  componentWillReceiveProps(nextProps) {
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
    var currentContribution = {
      campId: this.props.campId,
      commentId: null
    }
    Object.keys(this.props.comments).forEach((commentId) => {
      if(this.props.comments[commentId].user_id === this.props.user) {
        currentContribution.commentId = this.props.comments[commentId].id;
      }
    })
    let thisObj = this;
    // this.props.contributeAgain(currentContribution, function() {
    //   if(thisObj.props.hideModal){
    //     thisObj.props.hideModal()
    //   } else {
    //     thisObj.setState({
    //       showModal: !thisObj.props.showModal
    //     })
    //   }
    //   return;
    // })
  }

  render() {
    return (
      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Modal.Body>
          <div>
            <h4>You have already contributed to this discussion. By clicking the button, you'll be removing your previous contribution.</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.doNothing()} type='submit' bsStyle='default'>Keep old contribution and do nothing</Button>
          <Button onClick={() => this.allowContribution()} type='submit' bsStyle="warning">Delete old contribution</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet.comments,
    user: state.profileReducer.id
  }
}


export default connect(mapStateToProps, null)(Constraint)*/


// const mapDispatchToProps = (dispatch) => {
//   return {
//     contributeAgain: (currentContribution, callback) => {
//       dispatch(contributeAgain(currentContribution, callback))
//     }
//   }
// }
