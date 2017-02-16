import React, { PropTypes } from 'react'
import Comment from './Comment'
import { connect } from 'react-redux'

class CommentList extends React.Component{
  render(){

    //let campIndex = this.props.campId
    //console.log('campIndex', this.props.comments[campIndex])
    // let currComments = this.props.comments;
    // if(this.props.comments[campIndex]){
    //   currComments = this.props.comments[campIndex].comments
    // }
    var currComments = [];
    //if(currComments.length > 0){
    //console.log('currrcomments', currComments[0][0].input)
    console.log('this.props', this.props)
    currComments = this.props.comments.filter(comment => {
      return comment.commonground_id === this.props.campId
    });
    //console.log('confussed', currComments[0])
    console.log('this props commetns curr', this.props)
    //}
    
    return (
      <ul>
        {currComments && currComments.length > 0 && currComments.map(currComment =>
          <Comment 
            key={currComment.commentId}
            commentId={currComment.id}
            inputStr={currComment.input}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('state', state);
  return {
    comments: state.commentGet.comments
  }
}

export default connect(mapStateToProps)(CommentList)