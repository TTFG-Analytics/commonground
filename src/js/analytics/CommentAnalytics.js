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
import checkForData from './utils/checkForData'
import Demographic from './Demographic'
import Header from './Header'
import Footer from './Footer'

class CommentAnalytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      demographic: 'age',
      showChart: false,
      categories: null,
      columnConfig: {},
      pieConfig: {}
    }
  }

  demographicChange(e){
    this.setState({
      demographic: e.target.value,
      categories: selectCategory(e.target.value)
    });
  }

  toggleModal(e){
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getVoteData() {
    let commentId = this.props.commentId
    let demographic = this.state.demographic
    axios.get(`/voteanalytics/${commentId}/${demographic}`)
      .then(function(response) {
        var people = response.data
        var upvoteDataArr = handleData(people, demographic, 1)
        var downvoteDataArr = handleData(people, demographic, 0)
        this.setState({
          showChart: true,
          columnConfig: columnChartConfig(this.state.categories, upvoteDataArr, downvoteDataArr),
          pieConfig: this.pieStuffing(upvoteDataArr, downvoteDataArr)
        })
      }.bind(this))
  }

  pieStuffing(upvoters, downvoters) {
    var pieData;
    if(upvoters){
      let upvotePieData = handlePieData(upvoters, this.state.demographic, this.state.categories)
      pieData = upvotePieData
    }
    if(downvoters){
      let downvotePieData = handlePieData(downvoters, this.state.demographic, this.state.categories)
      pieData = pieData.concat(downvotePieData)
    }
    return pieChartConfig(pieData)
  }

  render() {
    var hasData = checkForData(this.props.upvotecounter, this.props.downvotecounter)

    return (
      <div className="inlineRight">

      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Header 
          toggleModal={this.toggleModal.bind(this)}
          modalName='Comment Analytics' />
        <Modal.Body>
          {hasData ? <div>
            <Demographic 
              getData={this.getVoteData.bind(this)} 
              demographicChange={this.demographicChange.bind(this)} />
            {this.state.showChart && <ReactHighcharts config={this.state.columnConfig} />}
            {this.state.showChart && <ReactHighcharts config={this.state.pieConfig} />}
          </div> :
          <div>
            <h4>No one has upvoted or downvoted this comment.</h4>
          </div>}
        </Modal.Body>
        <Footer toggleModal={this.toggleModal.bind(this)} />
      </Modal>

      <span className="delta" style={this.props.deltaStyle} onClick={this.toggleModal.bind(this)}>{this.props.children}</span>

      </div>
    )
  }
}

export default CommentAnalytics