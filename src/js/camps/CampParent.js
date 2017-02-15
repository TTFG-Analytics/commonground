import React from 'react'
import Camp from './Camp'
import AddCamp from './AddCamp'
import CampList from './CampList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'

// CampList.need = [
//   getCamps
// ]

//discussionId is used to associate which camps belong to which discussions
class CampParent extends React.Component{
  // componentDidMount() {
  //   var discussionId = this.props.params.discussionId
  //   this.props.getCamps(discussionId)
  // }

  render(){
    console.log('camp parent params', this.props.discussions)
    console.log('discussionId', this.props.params.discussionId)
    var discussionId = this.props.params.discussionId
    var discussionName = this.props.discussions[discussionId-1].input
    return (<div>
      <h2>{discussionName}</h2>
      <AddCamp discussionId={discussionId} />
      <CampList discussionId={discussionId} />
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    camps: state.campGet,
    discussions: state.discussionsGet.discussions
  }
}

// const mapDispatchToProps = (dispatch) => {
//   //return bindActionCreators(getCamps, dispatch)
//   return {
//     getCamps: (discussionId) => {
//       dispatch(getCamps(discussionId))
//     }
//   }
// }

export default connect(mapStateToProps)(CampParent)