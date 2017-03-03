import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts'
import { Modal, Glyphicon, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import demographics from './demographics/demographics'
import handleData from './utils/handleData'
import checkForData from './utils/checkForData'
import columnChartConfig from './utils/columnChartConfig'
import selectCategory from './utils/selectCategory'

class Analytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      demographic: 'age',
      commenters: null,
      upvoters: null,
      downvoters: null,
      showChart: false,
      showModal: false
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

  getData() {
    let campId = this.props.campId
    let demographic = this.state.demographic
    axios.get(`/analytics/${campId}/${demographic}`)
      .then(function(response) {
        var people = response.data
        console.log('commentDataArr about to handleData')
        var commentDataArr = handleData(people, demographic);
        console.log('upvoteDataArr about to handleData')
        var upvoteDataArr = handleData(people, demographic, 1)
        console.log('downvoteDataArr about to handleData')
        var downvoteDataArr = handleData(people, demographic, 0)
        this.setState({
          commenters: commentDataArr,
          upvoters: upvoteDataArr,
          downvoters: downvoteDataArr,
          showChart: true
        })
      }.bind(this))
  }

  render() {
    var categories = selectCategory(this.state.demographic);
        
    var config = columnChartConfig(categories, this.state.upvoters, this.state.downvoters, this.state.commenters)

    var listDemographics = demographics.map((demographic) => {
      return(
        <option value={demographic.value}>{demographic.value}</option>
      )
    })

    var hasData = checkForData(this.props.upvotecounter, this.props.downvotecounter, this.props.commentList)
    console.log('hasData analytics', hasData)

    return (
    <div>

      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Modal.Header closeButton onClick={this.toggleModal.bind(this)}>
          <Modal.Title id="contained-modal-title-lg">CommonGround Analytics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hasData ? <div>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Demographic Property</ControlLabel>
              <FormControl onChange={this.demographicChange.bind(this)} componentClass="select" placeholder="select" ref="select">
                {listDemographics}
              </FormControl>
            </FormGroup>
            <Button onClick={() => this.getData()} type='submit' bsStyle="primary">Get Data</Button>

            {this.state.showChart && <ReactHighcharts config={config} />}
          </div> :
          <div>
            <h4>No one has contributed to this CommonGround.</h4>
          </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.toggleModal.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={this.toggleModal.bind(this)}>
        <Glyphicon glyph="stats">
        </Glyphicon>
      </Button>

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campList: state.campGet.commongrounds,
    commentList: state.commentGet.comments
  }
}

export default connect(mapStateToProps)(Analytics)