// singular camp component - just presentational
import React from 'react'
import CampList from './CampList'
import CommentParent from '../comments/CommentParent'
import { connect } from 'react-redux'
import { getComments } from '../actions/actions'

class Camp extends React.Component{
  fetchComments(campId) {
    console.log('fetchComments campid', campId)
    this.props.getComments(campId)
  }

  render() {
    var campId = this.props.campId
    return (
      <li>
        <h3 onClick={()=> this.fetchComments(campId)}>{this.props.inputStr}</h3>
        <CommentParent campId={campId} />
      </li>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (campId) => {
      dispatch(getComments(campId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camp)