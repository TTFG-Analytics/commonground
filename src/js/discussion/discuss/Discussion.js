import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'

class Discussion extends React.Component{
  fetchCamps(discussionId) {
    this.props.getCamps(discussionId)
  }

  render(){
    var discussionId = this.props.discussionId;
    var inputStr = this.props.inputStr;
    return (
      <li>
        <Link to={`/discuss/${discussionId}`}>
          <h3 className="test" onClick={()=> this.fetchCamps(discussionId)}>
            {inputStr}
          </h3>
        </Link>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCamps: (discussionId) => {
      dispatch(getCamps(discussionId))
    }
  }
}

export default connect(null, mapDispatchToProps)(Discussion)