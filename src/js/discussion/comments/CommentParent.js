import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import CommentList from './CommentList'

class CommentParent extends React.Component{

  render(){
    console.log('=======campId in CommentParent ============', this.props.campId)
    return (<div>
      <AddComment campId={this.props.campId} />
      <CommentList campId={this.props.campId} />
    </div>)
  }
}

export default CommentParent