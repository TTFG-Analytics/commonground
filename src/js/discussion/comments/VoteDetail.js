import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts'
// import Dropdown from 'react-toolbox/lib/dropdown'
// import {Button, IconButton} from 'react-toolbox/lib/button'
import { Panel, Modal, Glyphicon, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';

class VoteDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      camp: null,
      commenters: null,
      upvoters: null,
      downvoters: null,
      showChart: false,
      showModal: false
    }
  }

  toggleModal(e){
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getData() {
  var campId = this.props.campId
  axios.get(`/analytics/${campId}/${this.state.demographic}`)
    .then(function(response) {
      console.log('response from getData', response)
      var people = response.data
      let demographic = this.state.demographic
      var commentDataObj = {}
      var upvoteDataObj = {}
      var downvoteDataObj = {}
      console.log('people -----------', people)
      people.forEach(person => {
        if(!commentDataObj.hasOwnProperty(person[demographic]) && !person.hasOwnProperty('input')) {
          commentDataObj[person[demographic]] = 1;
        } else if(commentDataObj.hasOwnProperty(person[demographic]) && !person.hasOwnProperty('input')) {
          commentDataObj[person[demographic]] += 1;
        } else if(!downvoteDataObj.hasOwnProperty(person[demographic]) && person.input === 0) {
          downvoteDataObj[person[demographic]] = 1;
        } else if(downvoteDataObj.hasOwnProperty(person[demographic]) && person.input === 0) {
          downvoteDataObj[person[demographic]] += 1;
        } else if(!upvoteDataObj.hasOwnProperty(person[demographic]) && person.input === 1) {
          upvoteDataObj[person[demographic]] = 1;
        } else if(upvoteDataObj.hasOwnProperty(person[demographic]) && person.input === 1) {
          upvoteDataObj[person[demographic]] += 1;
        }
      }) //dataObj now has the count for each property - for example the number of politically centrist responders to a commonground
      console.log('dataObj -----------', commentDataObj)
      console.log('commentdataobj keys keys', Object.keys(commentDataObj))
      console.log('upvotedataObj -----------', upvoteDataObj)
      console.log('upvoteDataobj keys keys', Object.keys(upvoteDataObj))
      console.log('downvotedataObj -----------', downvoteDataObj)
      console.log('downvoteDataobj keys keys', Object.keys(downvoteDataObj))
      var commentDataArr = []
      for(let demo in commentDataObj) {
        let tuple = []
        tuple[0] = parseInt(demo)
        tuple[1] = commentDataObj[demo]
        commentDataArr.push(tuple)
      }
      var upvoteDataArr = []
      for(let demo in upvoteDataObj) {
        let tuple = []
        tuple[0] = parseInt(demo)
        tuple[1] = upvoteDataObj[demo]
        upvoteDataArr.push(tuple)
      }
      var downvoteDataArr = []
      for(let demo in downvoteDataObj) {
        let tuple = []
        tuple[0] = parseInt(demo)
        tuple[1] = downvoteDataObj[demo]
        downvoteDataArr.push(tuple)
      }
      console.log('comment arr ~~~~~~~~~~~~~~~', commentDataArr)
      console.log('updata arr ~~~~~~~~~~~~~~~', upvoteDataArr)
      console.log('downdata arr ~~~~~~~~~~~~~~~', downvoteDataArr)
      this.setState({
        commenters: commentDataArr,
        upvoters: upvoteDataArr,
        downvoters: downvoteDataArr,
        showChart: true
      })
      console.log('this this', this)
    }.bind(this))
  }

  render() {

    return (

    <div className="inlineRight">

      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Modal.Header closeButton onClick={this.toggleModal.bind(this)}>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Panel header="Upvoters">
              Panel content
            </Panel>
            <Panel header="Downvoters">
              Panel content
            </Panel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.toggleModal.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <span className="delta" style={this.props.deltaStyle} onClick={this.toggleModal.bind(this)}>{this.props.children}</span>

    </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    campList: state.campGet.commongrounds
  }
}

export default connect(mapStateToProps)(VoteDetail)