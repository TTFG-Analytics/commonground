import React from 'react'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'
require('./styles.css')

class Discussion extends React.Component{
  fetchCamps(discussionId) {
    this.props.getCamps(discussionId)
  }

  render(){
    var discussionId = this.props.discussionId;
    var inputStr = this.props.inputStr;
    return (
      <div>
        <h3 className="topic" onClick={()=> this.fetchCamps(discussionId)}>
          {inputStr}
        </h3>
      </div>
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