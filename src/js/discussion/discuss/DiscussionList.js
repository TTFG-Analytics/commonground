import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
import axios from 'axios'
import { getDiscussions } from '../actions/actions'
//import { BarChart, PieChart } from 'react-d3-components'

class DiscussionList extends React.Component{
  constructor(props){
    super(props)
    this.state = {ages:null}
  }

  render() {
    let thisObj = this;
    return (
      <ul>
        {thisObj.props.discussionsList.length > 0 && thisObj.props.discussionsList.map((discussionX, index) =>
          <Discussion
            key={discussionX.id}
            discussionId={discussionX.id}
            inputStr={discussionX.input}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    discussionsList: state.discussionsGet.discussions
  }
} //we need the state.discussions array to pass into the DiscussionList as props
//we'd also need the articles retrieved from the get request
//DiscussionList then displays the discussions //

export default connect(mapStateToProps)(DiscussionList)

    // var commongrounds = []
    // console.log('state commongrounds', this.props.commongrounds)
    // for(let i in thisObj.props.commongrounds){
    //   commongrounds.push(thisObj.props.commongrounds[i])
    // }

// //{commongrounds.length > 0 && commongrounds.map((commongroundX, index) =>
//           <h3 key={index}>{commongroundX.input}</h3>
//         )}

  // componentDidMount(){
  //   this.gatherAgeCount();
  // }

// gatherAgeCount() {
//     console.log("THIS IS THIS: ", this);

//     axios.get('/ages').then(function(data){
//     console.log("THIS IS THE DATA: ", data);

//       var ageRanges = {
//         kids: 0,
//         teens: 0,
//         twenties: 0,
//         thirties: 0,
//         forties: 0,
//         fifties: 0,
//         sixties: 0,
//         seventies: 0
//       }
//       for (var i = 0; i < data.data.length; i++) {
//         if (data.data[i].age <= 10){
//           ageRanges.kids++
//         } else if (data.data[i].age <= 20) {
//           ageRanges.teens++
//         } else if (data.data[i].age <= 30) {
//           ageRanges.twenties++
//         } else if (data.data[i].age <= 40) {
//           ageRanges.thirties++
//         } else if (data.data[i].age <= 50) {
//           ageRanges.forties++
//         } else if (data.data[i].age <= 60) {
//           ageRanges.fifties++
//         } else if (data.data[i].age <= 70) {
//           ageRanges.sixties++
//         } else if (data.data[i].age <= 80) {
//           ageRanges.seventies++
//         }
//       }
//       this.setState({ages: ageRanges})
// //     }.bind(this))
// // //   }
// console.log("THIS.STATE", this.state);
    // //example data
    // var barChartData = [{
    //   label: 'somethingA',
    //   values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    // }];
    // if (this.state.ages !== null) {
    //   barChartData= [{
    //     label: 'CommonGround users by Age-Group',
    //     values: [{x: '0 - 10', y: this.state.ages.kids}, {x: '11 - 20', y: this.state.ages.teens}, {x: '21 - 30', y: this.state.ages.twenties}, {x: '31 - 40', y: this.state.ages.thirties}, {x: '41 - 50', y: this.state.ages.forties}, {x: '51 - 60', y: this.state.ages.fifties}, {x: '61 - 70', y: this.state.ages.sixties}, {x: '71 - 80', y: this.state.ages.seventies} ]
    //   }];
    // }

//         <BarChart
//           data={barChartData}
//           width={800}
//           height={400}
//           margin={{top: 10, bottom: 50, left: 50, right: 10}}
//         />