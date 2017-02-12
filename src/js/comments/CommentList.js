import React, { PropTypes } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class CommentList extends React.Component{
  render(){
    var currComments = this.props.comments.filter(comment => {
      return comment.campId === this.props.campId
    });
    
    return (
      <ul>
        {currComments.map(currComment =>
          <Comment 
            key={currComment.commentId}
            commentId={currComment.commentId}
            {...currComment}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps)(CommentList)