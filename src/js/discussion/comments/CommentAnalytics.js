import React from 'react';
import axios from 'axios';
import ReactHighcharts from 'react-highcharts'
import Dropdown from 'react-toolbox/lib/dropdown'
import {Button, IconButton} from 'react-toolbox/lib/button'

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

  demographicChange(value){
    this.setState({
      demographic: value
    });
    // console.log('demo change', this.state)
  }

  getVoteData() {
    // console.log('this state', this.state)
    // console.log('this props', this.props)
    axios.get(`/voteanalytics/${this.props.commentId}/${this.state.demographic}`)
      .then(function(response) {
        // console.log('response getdata', response.data);
        var people = response.data
        let demographic = this.state.demographic
        var upvoteDataObj = {}
        var downvoteDataObj = {}
        // console.log('people -----------', people)
        people.forEach(person => {
          if(!upvoteDataObj.hasOwnProperty(person[demographic]) && person.input == 1) {
            upvoteDataObj[person[demographic]] = 1;
          } else if(person.input == 1) {
            upvoteDataObj[person[demographic]] += 1;
          } else if(!downvoteDataObj.hasOwnProperty(person[demographic]) && person.input == 0) {
            downvoteDataObj[person[demographic]] = 1;
          } else if(person.input == 0) {
            downvoteDataObj[person[demographic]] += 1;
          }
        }) //upvoteDataObj now has the count for each property - for example the number of politically centrist responders to a commonground
        // console.log('upvoteDataObj -----------', upvoteDataObj)
        // console.log('downvoteDataObj ==========', downvoteDataObj)
        // console.log('upvoteDataobj keys keys', Object.keys(upvoteDataObj))
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
        console.log('updata arr ~~~~~~~~~~~~~~~', upvoteDataArr)
        console.log('downdata arr ~~~~~~~~~~~~~~~', downvoteDataArr)
        this.setState({
          upvoters: upvoteDataArr,
          downvoters: downvoteDataArr,
          showChart: true
        })
        // console.log('this this', this)
      }.bind(this))
  }

  render() {

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
    } else if(this.state.categories === 'age') {

    }
    // console.log('categories =============', categories, this.state)
    var config = {
      chart: {
        type: 'column'
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
        name: 'Upvoters',
        data: this.state.upvoters
      },
      {
        name: 'Downvoters',
        data: this.state.downvoters
      }]
    }
    // console.log('this state upvotes', this.state.upvoters)
    // console.log('this state downvotes', this.state.downvoters)
    var upvotePieData = [];
    if(this.state.upvoters){
      this.state.upvoters.forEach(upvoter => {
        let pieTuple = [];
        let name = ''
        if(this.state.demographic === 'age'){
          let upvoterCategory = upvoter[0]
          //console.log('upvoter category', upvoterCategory)
          name = upvoterCategory
          //console.log('name', name);
        } else {
          name = categories[upvoter[0]]
        }
        if(name){
          pieTuple[0] = name + ' Upvoter'
        } else {
          pieTuple[0] = 'Other Upvoter'
        }
        pieTuple[1] = upvoter[1]
        upvotePieData.push(pieTuple)
      })
    }
    // console.log('upvotePieData', upvotePieData)

    var downvotePieData = [];
    if(this.state.downvoters){
      this.state.downvoters.forEach(downvoter => {
        let pieTuple = [];
        let name = ''
        if(this.state.demographic === 'age'){
          let downvoterCategory = downvoter[0]
          // console.log('upvoter category', downvoterCategory)
          name = downvoterCategory
          // console.log('name', name);
        } else {
          name = categories[downvoter[0]]
        }
        if(name){
          pieTuple[0] = name + ' Downvoter'
        } else {
          pieTuple[0] = 'Other Downvoter'
        }
        pieTuple[1] = downvoter[1]
        downvotePieData.push(pieTuple)
      })
    }
    console.log('downvotePieData', downvotePieData)
    var pieData = upvotePieData.concat(downvotePieData)

    var pieConfig = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: `Statistics for Comment`
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          }
        }
      },
      series: [
      {
        name: 'Voters',
        data: pieData
      }
      ]
    }
    return (
      <div>
      <Dropdown ref="demographicSelect" onChange={(value)=> this.demographicChange(value)}
      source={demographics} value={this.state.demographic} />
      <Button onClick={() => this.getVoteData()} label='Get Data' raised primary/>
      {this.state.showChart && <ReactHighcharts config={config} />}
      {this.state.showChart && <ReactHighcharts config={pieConfig} />}
      </div>
    )
  }
}

export default CommentAnalytics

        // {demographics.map(demographicOption => {
        //   return <option>{demographicOption}</option>
        // })}