import React, { PropTypes } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class CommentList extends React.Component{
  render(){
    return (
      <ul>
        {Object.keys(this.props.comments).length > 0 && Object.keys(this.props.comments).map(commentId => {
            return this.props.campId == this.props.comments[commentId].commonground_id ? <Comment
              key={commentId}
              commentId={commentId}
            /> : undefined
          }
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet.comments
  }
}

export default connect(mapStateToProps)(CommentList)