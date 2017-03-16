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

{/*{
          return thisCampId == thisProps.comments[commentId].commonground_id ? alert('yes', thisProps.comments[commentId].commonground_id, thisCampId)
            : console.log('no', thisCampId, thisProps.comments[commentId].commonground_id, commentId, typeof commentId)
        }*/}