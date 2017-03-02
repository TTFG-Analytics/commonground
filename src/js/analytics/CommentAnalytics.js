import React from 'react';
import axios from 'axios';
import ReactHighcharts from 'react-highcharts'
import { Button, FormControl, FormGroup, ControlLabel, Grid, Row, Col, Media, Modal } from 'react-bootstrap';
import demographics from './demographics/demographics'
import selectCategory from './utils/selectCategory'
import handleData from './utils/handleData'
import handlePieData from './utils/handlePieData'
import columnChartConfig from './utils/columnChartConfig'
import pieChartConfig from './utils/pieChartConfig'


class CommentAnalytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      demographic: 'age',
      upvoters: null,
      downvoters: null,
      showChart: false
    }
  }

  demographicChange(e){
    this.setState({
      demographic: e.target.value
    });
  }

  toggleModal(e){
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getVoteData() {
    console.log('this props commentId', this.props)
    let commentId = this.props.commentId
    let demographic = this.state.demographic
    axios.get(`/voteanalytics/${commentId}/${demographic}`)
      .then(function(response) {
        var people = response.data
        var upvoteDataArr = handleData(people, demographic, 1)
        var downvoteDataArr = handleData(people, demographic, 0)
        this.setState({
          upvoters: upvoteDataArr,
          downvoters: downvoteDataArr,
          showChart: true
        })
      }.bind(this))
  }

  render() {
    var categories = selectCategory(this.state.demographic)

    var columnConfig = columnChartConfig(categories, this.state.upvoters, this.state.downvoters, this.state.commenters)
    
    var upvotePieData = [];
    if(this.state.upvoters){
      upvotePieData = handlePieData(this.state.upvoters, this.state.demographic, categories)
    }
    console.log('upvotePieData', upvotePieData)

    var downvotePieData = [];
    if(this.state.downvoters){
      downvotePieData = handlePieData(this.state.downvoters, this.state.demographic, categories)
    }
    console.log('downvotePieData', downvotePieData)
    var pieData = upvotePieData.concat(downvotePieData)

    var pieConfig = pieChartConfig(pieData)

    var listDemographics = demographics.map((demographic) => {
      return(
        <option value={demographic.value}>{demographic.value}</option>
      )
    })

    return (
      <div className="inlineRight">
      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Modal.Header closeButton onClick={this.toggleModal.bind(this)}>
          <Modal.Title id="contained-modal-title-lg">Comment Analytics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.delta !== 0 ? <div>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Demographic Property</ControlLabel>
              <FormControl onChange={this.demographicChange.bind(this)} componentClass="select" placeholder="select" ref="select">
                {listDemographics}
              </FormControl>
            </FormGroup>
            <Button onClick={() => this.getVoteData()} type='submit' bsStyle="primary">Get Data</Button>

            {this.state.showChart && <ReactHighcharts config={columnConfig} />}
            {this.state.showChart && <ReactHighcharts config={pieConfig} />}
          </div> :
          <div>
            <h4>No one has upvoted or downvoted this comment.</h4>
          </div>}
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

export default CommentAnalytics