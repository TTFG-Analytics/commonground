import {BarChart} from 'react-d3-components'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class Analytics extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      camp: null,
      demographic: null,
      people: null
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
        var people = {}
        let demographic = this.state.demographic
        response.data.forEach((person) => {
          if(!people.hasOwnProperty(person[demographic])) {
            people[person[demographic]] = 1
          } else {
            people[person[demographic]] += 1
          }
        })
        console.log('people -----------', people)
        this.setState({
          people: people
        })
      }.bind(this))
  }

  render() {
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
    var demographics = ['age', 'hometown', 'gender', 'race', 'industry', 'politicalleaning', 'religion', 'yearlyincome']
      
    console.log('this props analytics', this.props)
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