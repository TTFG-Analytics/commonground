// import {BarChart} from 'react-d3-components'
// import React from 'react'
// import axios from 'axios'

// class CampAnalytics extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = {
//       ages: null,
//       showAges: false,
//       politics: null,
//       showPolitics: false
//     }
//   }

//   getCampAges() {
//     console.log('gettign camp ages')
//     if(this.state.ages === null){
//       axios.get(`/campAges/${this.props.campId}`)
//         .then(function(response){
//           console.log('response ages ------', response)
//           var ageRanges = {
//             kids: 0,
//             teens: 0,
//             twenties: 0,
//             thirties: 0,
//             forties: 0,
//             fifties: 0,
//             sixties: 0,
//             seventies: 0
//           }
//           response.data.rows.forEach((userAge, index)=>{
//             if(userAge.age <= 10) {
//               ageRanges.kids++
//             } else if(userAge.age <= 20) {
//               ageRanges.teens++
//             } else if(userAge.age <= 30) {
//               ageRanges.twenties++
//             } else if(userAge.age <= 40) {
//               ageRanges.thirties++
//             } else if(userAge.age <= 50) {
//               ageRanges.forties++
//             } else if(userAge.age <= 60) {
//               ageRanges.fifties++
//             } else if(userAge.age <= 70) {
//               ageRanges.sixties++
//             } else if(userAge.age <= 80) {
//               ageRanges.seventies++
//             }
//           })
//           console.log('ageRanges', ageRanges)
//           this.setState({
//             ages: ageRanges,
//             showAges: !this.state.showAges
//           })
//           console.log('this state...........', this.state)
//         }.bind(this))
//     } else {
//       this.setState({
//         showAges: !this.state.showAges
//       })
//     }
//   }

//   getCampPolitics() {
//     console.log('getting camp politics')
//     if(this.state.politics === null) {
//       axios.get(`/campPolitics/${this.props.campId}`)
//         .then(function(response) {
//           console.log('response politics ------', response)
//           var politics = {
//             Conservative: 0,
//             Authoritarian: 0,
//             Centrist: 0,
//             Libertarian: 0,
//             Progressive: 0
//           }
//           response.data.rows.forEach((userPolitics, index) => {
//             if(userPolitics.politicalleaning === 1) {
//               politics.Conservative++
//             } else if(userPolitics.politicalleaning === 2) {
//               politics.Authoritarian++
//             } else if(userPolitics.politicalleaning === 3) {
//               politics.Centrist++
//             } else if(userPolitics.politicalleaning === 4) {
//               politics.Libertarian++
//             } else if(userPolitics.politicalleaning === 5) {
//               politics.Progressive++
//             }
//           })
//           this.setState({
//             politics: politics,
//             showPolitics: !this.state.showPolitics
//           })
//           console.log('show politics', this.state)
//         }.bind(this))
//     } else {
//       this.setState({
//         showPolitics: !this.state.showPolitics
//       })
//     }
//   }
// // 1 - Conservative
// // 2 - Authoritarian
// // 3 - Centrist
// // 4 - Libertarian
// // 5 - Progressive

//   render() {
//     var campBarchartData = [{
//       label: 'somethingA',
//       values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
//     }];
//     if(this.state.ages !== null) {
//       campBarchartData = [{
//         label: 'Camp users by Age-Group',
//         values: [{x: '0-10', y: this.state.ages.kids}, {x: '11 - 20', y: this.state.ages.teens}, {x: '21 - 30', y: this.state.ages.twenties}, {x: '31 - 40', y: this.state.ages.thirties}, {x: '41 - 50', y: this.state.ages.forties}, {x: '51 - 60', y: this.state.ages.fifties}, {x: '61 - 70', y: this.state.ages.sixties}, {x: '71 - 80', y: this.state.ages.seventies}]
//       }]
//     }
//     //var BarChart = ReactD3.BarChart
//     var campPoliticsBarchartData = [{
//       label: 'somethingA',
//       values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
//     }];
//     if(this.state.politics !== null) {
//       campPoliticsBarchartData = [{
//         label: 'Camp users by Political Leanings',
//         values: [{x: 'Conservative', y: this.state.politics.Conservative}, {x: 'Authoritarian', y: this.state.politics.Authoritarian}, {x: 'Centrist', y: this.state.politics.Centrist}, {x: 'Libertarian', y: this.state.politics.Libertarian}, {x: 'Progressive', y: this.state.politics.Progressive}]
//       }]
//     }

//     return (
//       <div>
//       <button onClick={()=>this.getCampAges()}>Get ages of commenters</button>
//       {this.state.showAges && <BarChart data={campBarchartData} width={800} height={400}
//       margin={{top: 10, bottom: 50, left: 50, right: 10}} />}
//       <button onClick={()=>this.getCampPolitics()}>Get political leanings of commenters</button>
//       {this.state.showPolitics && <BarChart data={campPoliticsBarchartData} width={800} height={400}
//       margin={{top: 10, bottom: 50, left: 50, right: 10}} />}
//       </div>
//     )
//   }
// }

// export default CampAnalytics