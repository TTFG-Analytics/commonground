import React from 'react'
import { connect } from 'react-redux'
require('./styles.css')

class Discussion extends React.Component{

  render(){
    let discussionId = this.props.discussionId
    let discussion = this.props.discussionsList[discussionId]
    return (
      <div className='discussionName'>
        <h3 className="topic">
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

export default connect(mapStateToProps, null)(Discussion)