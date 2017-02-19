//import {BarChart} from 'react-d3-components';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
//import { BarChart } from 'react-d3-basic';
import ReactHighcharts from 'react-highcharts'

class Analytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      camp: null,
      demographic: 'age',
      people: null,
      showChart: false
    }
  }

  campChange(event){
    console.log('this camp change', this, 'refs', this.refs)
    this.setState({
      camp: this.refs.campSelect.value
    });
    console.log('camp change', this.state)
  }

  demographicChange(event){
    this.setState({
      demographic: this.refs.demographicSelect.value
    });
    console.log('demo change', this.state)
  }

  getData() {
    console.log('this state', this.state)
    axios.get(`/analytics/${this.state.camp}/${this.state.demographic}`)
      .then(function(response) {
        console.log('response getdata', response.data);
        var people = response.data
        let demographic = this.state.demographic
        var dataObj = {}
        console.log('people -----------', people)
        people.forEach(person => {
          if(!dataObj.hasOwnProperty(person.politicalleaning)) {
            dataObj[person.politicalleaning] = 1;
          } else {
            dataObj[person.politicalleaning] += 1;
          }
        }) //dataObj now has the count for each property - for example the number of politically centrist responders to a commonground
        console.log('dataObj -----------', dataObj)
        console.log('dataobj keys keys', Object.keys(dataObj))
        var dataArr = []
        for(var demo in dataObj) {
          let tuple = []
          tuple[0] = parseInt(demo)
          tuple[1] = dataObj[demo]
          dataArr.push(tuple)
        }
        console.log('data arr ~~~~~~~~~~~~~~~', dataArr)
        this.setState({
          people: dataArr,
          showChart: true
        })
        console.log('this this', this)
      }.bind(this))
  }

  render() {

    var demographics = ['age', 'hometown', 'gender', 'race', 'industry', 'politicalleaning', 'religion', 'yearlyincome'];
    var chartData = this.state.people;
    console.log('this props analytics', this.props)
    var politicalleaning = ['','Conservative', 'Authoritarian', 'Centrist', 'Libertarian', 'Progressive']
    var categories = [];
    if(this.state.demographic === 'politicalleaning') {
      categories = politicalleaning;
    }
    // 1 - Conservative
    // 2 - Authoritarian
    // 3 - Centrist
    // 4 - Libertarian
    // 5 - Progressive
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
        data: this.state.people
      }]
    }
    return (
      <div>
      <h4>Select commonground</h4>
      <select ref="campSelect" onChange={(event)=> this.campChange(event)}>
        {this.props.campList.map((camp, index) => {
          return <option>{camp.input}</option>
        })}
      </select>
      <select ref="demographicSelect" onChange={(event)=> this.demographicChange(event)}>
        {demographics.map(demographicOption => {
          return <option>{demographicOption}</option>
        })}
      </select>
      <button onClick={() => this.getData()}>Get data</button>
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