import React, { PropTypes } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class CommentList extends React.Component{
  render(){
    var currComments = [];
    console.log('this.props', this.props)
    currComments = this.props.comments.filter(comment => {
      return comment.commonground_id === this.props.campId
    });
    
    return (
      <ul>
        {currComments && currComments.length > 0 && currComments.map(currComment =>
          <Comment 
            key={currComment.id}
            commentId={currComment.id}
            inputStr={currComment.input}
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