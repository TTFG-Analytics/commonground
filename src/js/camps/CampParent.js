import React from 'react'
import Camp from './Camp'
import AddCamp from './AddCamp'
import CampList from './CampList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'

CampList.need = [
  getCamps
]

//discussionId is used to associate which camps belong to which discussions
class CampParent extends React.Component{
  render(){
    console.log('discussionId', this.props.discussionId)
    return (<div>
      <AddCamp discussionId={this.props.discussionId} />
      <CampList discussionId={this.props.discussionId} />
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    camps: state.campGet
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(getCamps, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CampParent)