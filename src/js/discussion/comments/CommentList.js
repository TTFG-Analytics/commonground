import React, { PropTypes } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class CommentList extends React.Component{
  render(){
    return (
      <ul>
        {Object.keys(this.props.comments).length > 0 && Object.keys(this.props.comments).map(commentId =>
          <Comment
            key={commentId}
            commentId={commentId}
          />
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