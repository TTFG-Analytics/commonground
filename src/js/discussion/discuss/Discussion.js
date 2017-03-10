import React from 'react'
import { connect } from 'react-redux'
import { getCamps } from '../camps/campActions'
require('./styles.css')

class Discussion extends React.Component{
  fetchCamps(discussionId, fullname) {
    console.log('fetching started')
    this.props.getCamps(discussionId, fullname)
  }

  render(){
    let discussionId = this.props.discussionId
    let discussion = this.props.discussionsList[discussionId]
    return (
      <div className='discussionName'>
        <h3 className="topic" onClick={()=> this.fetchCamps(discussionId, this.props.fullname)}>
          {discussion.input}
        </h3>
        <em>by {discussion.fullname || this.props.fullname} on {new Date(discussion.createdat).toLocaleString()}</em>
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