import React from 'react'
import CampList from './CampList'
import CommentParent from '../comments/CommentParent'
import { connect } from 'react-redux'
import { getComments } from '../actions/actions'

class Camp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showComments: false,
      hasFetched: false
    }
  }

  fetchComments(campId) {
    console.log('this fetchComments', this)
    this.props.getComments(campId)
    this.setState({
      showComments: !this.state.showComments
    })
  }

  render() {
    var campId = this.props.campId
    return (
      <li>
        <h3 onClick={()=> this.fetchComments(campId)}>{this.props.inputStr}</h3>
        {this.state.showComments && <CommentParent campId={campId} />}
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