import React, { PropTypes } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class CommentList extends React.Component{
  render(){
    // var currComments = this.props.comments.filter(comment => {
    //   return comment.campId === this.props.campId
    // });
    let campIndex = this.props.campId
    console.log('campIndex', this.props.comments[campIndex])
    let currComments;
    if(this.props.comments[campIndex]){
      currComments = this.props.comments[campIndex].comments
    }
    
    return (
      <ul>
        {currComments && currComments.map(currComment =>
          <Comment 
            key={currComment.commentId}
            commentId={currComment.commentId}
            inputStr={currComment.input}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    comments: state.campGet.commongrounds
  }
}

export default connect(mapStateToProps)(CommentList)