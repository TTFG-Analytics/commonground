import React from 'react'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'
require('./styles.css')

class Discussion extends React.Component{
  fetchCamps(discussionId, fullname) {
    this.props.getCamps(discussionId, fullname)
  }

  render(){
    let discussionId = this.props.discussionId

    return (
      <div className='discussionName'>
        <h3 className="topic" onClick={()=> this.fetchCamps(discussionId, this.props.fullname)}>
          {this.props.discussionsList[discussionId].input}
        </h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fullname: state.profileReducer.fullname,
    discussionsList: state.discussionsGet.discussions 
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