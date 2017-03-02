import React from 'react'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'
require('./styles.css')

class Discussion extends React.Component{
  fetchCamps(discussionId, fullname) {
    this.props.getCamps(discussionId, fullname)
  }

  render(){
    var discussionId = this.props.discussionId;
    var inputStr = this.props.inputStr;
    var fullname = this.props.fullname;
    return (
      <div className='discussionName'>
        <h3 className="topic" onClick={()=> this.fetchCamps(discussionId, fullname)}>
          {inputStr}
        </h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fullname: state.profileReducer.fullname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCamps: (discussionId, fullname) => {
      dispatch(getCamps(discussionId, fullname))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion)