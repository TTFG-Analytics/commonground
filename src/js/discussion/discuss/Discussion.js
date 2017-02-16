import React from 'react'
import CampParent from '../camps/CampParent'
import DiscussionList from './DiscussionList'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'

class Discussion extends React.Component{
  fetchCamps(discussionId) {
    this.props.getCamps(discussionId)
  }

  render(){
    console.log('this props discussion', this.props)
    var discussionId = this.props.discussionId;
    //discussionId += 1;
    var inputStr = this.props.inputStr;
    return (
      <li>
        <Link to={`/discuss/${discussionId}`}><h3 onClick={()=> this.fetchCamps(discussionId)}>{inputStr}</h3></Link>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  //return bindActionCreators(getCamps, dispatch)
  return {
    getCamps: (discussionId) => {
      dispatch(getCamps(discussionId))
    }
  }
}

export default connect(null, mapDispatchToProps)(Discussion)

//<CampParent discussionId={discussionId} />