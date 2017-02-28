import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts'
// import Dropdown from 'react-toolbox/lib/dropdown'
// import {Button, IconButton} from 'react-toolbox/lib/button'
import { Modal, Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';


class Analytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      camp: null,
      demographic: 'age',
      commenters: null,
      upvoters: null,
      downvoters: null,
      showChart: false,
      showModal: false
    }
  }

  campChange(e){
    this.setState({
      camp: e.target.value
    });
    console.log('camp change', this.state)
  }

  demographicChange(e){
    this.setState({
      demographic: e.target.value
    });
    // console.log('demo change', this.state)
  }

  showModal(){
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getData() {
    console.log('THIS.STATE in getData()', this.state);
    axios.get(`/analytics/${this.state.camp}/${this.state.demographic}`)
      .then(function(response) {
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
    var commongrounds = this.props.campList.map(camp => {
      return {value: camp.input, label: camp.input}
    })
    var demographics = [
      {value:'age', label: 'age'},
      {value: 'hometown', label:'hometown'},
      {value: 'gender', label:'gender'},
      {value: 'race', label:'race'},
      {value: 'industry', label:'industry'},
      {value: 'politicalleaning', label:'politicalleaning'},
      {value: 'religion', label:'religion'},
      {value: 'yearlyincome', label:'yearlyincome'}
    ];
    var politicalleaning = ['','Conservative', 'Authoritarian', 'Centrist', 'Libertarian', 'Progressive']
    var gender = ['', 'Male', 'Female', 'Other']
    var race = ['', 'White Hispanic', 'White Non-Hispanic', 'Black or African American', 'American Indian or Alaska Native',
    'Asian', 'Native Hawaiian or Other Pacific Islander', 'Other']
    var industry = ['',
      'Aerospace, defence & security',
      'Asset & wealth management',
      'Automotive',
      'Banking & capital markets',
      'Capital projects & infrastructure',
      'Chemicals',
      'Communications',
      'Energy, utilities & mining',
      'Engineering & construction',
      'Entertainment & media',
      'Financial services',
      'Forest, paper & packaging',
      'Government & public services',
      'Healthcare',
      'Hospitality & leisure',
      'Industrial manufacturing',
      'Insurance',
      'Metals',
      'Pharmaceuticals & life sciences',
      'Private equity',
      'Retail & consumer',
      'Sovereign investment funds',
      'Technology',
      'Transportation & logistics',
      'Other'
    ]
    var religion = ['', 'Protestant', 'Catholic', 'Mormon', 'Other Christian', 'Judaism', 'Islam',
    'Buddhism', 'Hinduism', 'Agnostic', 'Atheist', 'Other']
    var income = ['', 'Under $35,000 / year', '$35,000 - $50,000', '$50,000 - $65,000', '$65,000 - $80,000',
    '$80,000 - $95,000', '$95,000 - $120,000', 'Over $120,000']
    var categories = [];
    if(this.state.demographic === 'politicalleaning') {
      categories = politicalleaning;
    } else if(this.state.demographic === 'gender') {
      categories = gender
    } else if(this.state.demographic === 'race') {
      categories = race
    } else if(this.state.demographic === 'industry') {
      categories = industry
    } else if(this.state.demographic === 'religion') {
      categories = religion
    } else if(this.state.demographic === 'yearlyincome') {
      categories = income
    }
    // console.log('categories =============', categories, this.state)
    let camp = this.state.camp
    // console.log('camp', camp)
    var config = {
      chart: {
        type: 'column'
      },
      title: {
        text: `Statistics for ${camp}`
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false
        }
      },
      xAxis: {
        categories: categories
      },
      series: [{
        name: 'Commenters',
        data: this.state.commenters
      },
      {
        name: 'Upvoters',
        data: this.state.upvoters
      },
      {
        name: 'Downvoters',
        data: this.state.downvoters
      }]
    }

    var listCommonground = commongrounds.map((commonground) => {
      return(
          <option value={commonground.value}>{commonground.value}</option>
        )
    })

    var listDemographics = demographics.map((demographic) => {
      return(
          <option value={demographic.value}>{demographic.value}</option>
        )
    })

    return (

    <div>

      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal}>
        <Modal.Header closeButton onClick={this.showModal.bind(this)}>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.showModal.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select a CommonGround</ControlLabel>
        <FormControl onChange={this.campChange.bind(this)} componentClass="select" placeholder="select" ref="select">
          {listCommonground}
        </FormControl>
      </FormGroup>
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select Demographic Property</ControlLabel>
        <FormControl onChange={this.demographicChange.bind(this)} componentClass="select" placeholder="select" ref="select">
          {listDemographics}
        </FormControl>
      </FormGroup>
      <Button onClick={() => this.getData()} type='submit' bsStyle="primary">Get Data</Button>

      <Button onClick={() => this.showModal()} bsStyle="primary">POPUP</Button>


      {this.state.showChart && <ReactHighcharts config={config} />}
      </div>

    </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    campList: state.campGet.commongrounds
  }
}

export default connect(mapStateToProps)(Analytics)

    // var barchartData = [{
    //   label: 'somethingA',
    //   values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    // }];
    // if(this.state.ages !== null) {
    //   barchartData = [{
    //     label: 'Discussion users by Age-Group',
    //     values: [{x: '0-10', y: this.state.ages.kids}, {x: '11 - 20', y: this.state.ages.teens}, {x: '21 - 30', y: this.state.ages.twenties}, {x: '31 - 40', y: this.state.ages.thirties}, {x: '41 - 50', y: this.state.ages.forties}, {x: '51 - 60', y: this.state.ages.fifties}, {x: '61 - 70', y: this.state.ages.sixties}, {x: '71 - 80', y: this.state.ages.seventies}]
    //   }]
      // }
      // //var BarChart = ReactD3.BarChart
      // <BarChart data={barchartData} width={800} height={400}
      //   margin={{top: 10, bottom: 50, left: 50, right: 10}} />
        // <button onClick={()=>this.getAges()}>Get ages of commenters</button>
    // var width = 700,
    // height = 300,
    // margins = {left: 100, right: 100, top: 50, bottom: 50},
    // title = "User sample",
    // chartSeries = [
    //   {
    //     field: 'politicalleaning',
    //     name: 'Political Leaning',
    //     color: '#ff7f0e'
    //   }
    // ],
    // // your x accessor
    // counter = 0,
    // x = function(d) {
    //   var index = Object.keys(d)

    //   return index
    // },
    // xScale = 'identity',
      // {this.state.people && <BarChart
      //   title={title}
      //   data={chartData}
      //   width={width}
      //   height={height}
      //   chartSeries={chartSeries}
      //   x={x}
      //   xScale={xScale}
      // />}

        //       {this.props.campList.map((camp, index) => {
        //   return <option>{camp.input}</option>
        // })}
      // </select>

      //         {demographics.map(demographicOption => {
      //     return <option>{demographicOption}</option>
      //   })}
      // </select>