import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts'
import { Modal, Glyphicon, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import handleData from './utils/handleData'
import checkForData from './utils/checkForData'
import columnChartConfig from './utils/columnChartConfig'
import selectCategory from './utils/selectCategory'
import Demographic from './Demographic'
import Header from './Header'
import Footer from './Footer'

class Analytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      demographic: 'age',
      showChart: false,
      showModal: false,
      categories: null
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

  getData() {
    let campId = this.props.campId
    let demographic = this.state.demographic
    axios.get(`/analytics/${campId}/${demographic}`)
      .then(function(response) {
        var people = response.data
        var upvoteDataArr = handleData(people, demographic, 1)
        var downvoteDataArr = handleData(people, demographic, 0)
        var commentDataArr = handleData(people, demographic, null)
        this.setState({
          showChart: true,
          columnConfig: columnChartConfig(this.state.categories, upvoteDataArr, downvoteDataArr, commentDataArr)
        })
      }.bind(this))
  }

  render() {
    var hasData = true
    // hasData = checkForData(this.props.upvotecounter, this.props.downvotecounter, this.props.commentList)
    // console.log('hasData analytics', hasData)

    return (
    <div>

      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Header 
          toggleModal={this.toggleModal.bind(this)}
          modalName='CommonGround Analytics' />
        <Modal.Body>
          {hasData ? <div>
            <Demographic 
              getData={this.getData.bind(this)} 
              demographicChange={this.demographicChange.bind(this)} />
            {this.state.showChart && <ReactHighcharts config={this.state.columnConfig} />}
          </div> :
          <div>
            <h4>No one has contributed to this CommonGround.</h4>
          </div>}
        </Modal.Body>
        <Footer toggleModal={this.toggleModal.bind(this)} />
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