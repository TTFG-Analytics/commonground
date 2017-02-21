//import {BarChart} from 'react-d3-components';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
//import { BarChart } from 'react-d3-basic';
import ReactHighcharts from 'react-highcharts'
import Dropdown from 'react-toolbox/lib/dropdown'
import {Button, IconButton} from 'react-toolbox/lib/button'

class Analytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      camp: null,
      demographic: 'age',
      commenters: null,
      upvoters: null,
      downvoters: null,
      showChart: false
    }
  }

  campChange(value){
    this.setState({
      camp: value
    });
    console.log('camp change', this.state)
  }

  demographicChange(value){
    this.setState({
      demographic: value
    });
    console.log('demo change', this.state)
  }

  getData() {
    console.log('this state', this.state)
    axios.get(`/analytics/${this.state.camp}/${this.state.demographic}`)
      .then(function(response) {
        console.log('response all', response)
        console.log('response getdata', response.data);
        var people = response.data
        let demographic = this.state.demographic
        var commentDataObj = {}
        var upvoteDataObj = {}
        var downvoteDataObj = {}
        console.log('people -----------', people)
        people.forEach(person => {
          if(person.input){
            console.log('person input', person.input)

          }
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
    //var chartData = this.state.people;
    console.log('this props analytics', this.props)
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
    console.log('categories =============', categories, this.state)
    let camp = this.state.camp
    console.log('camp', camp)
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
    return (
      <div>
      <Dropdown label='Select a CommonGround' ref="campSelect" onChange={(value)=> this.campChange(value)} source={commongrounds} value={this.state.camp} />
      <Dropdown label='Select a Demographic Property' ref="demographicSelect" onChange={(value)=> this.demographicChange(value)} source={demographics} value={this.state.demographic} />
      <Button onClick={() => this.getData()} label='Get Data' raised primary />
      {this.state.showChart && <ReactHighcharts config={config} />}
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