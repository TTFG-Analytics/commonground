import React from 'react'
import AddComment from './AddComment'
import CommentList from './CommentList'
require('./comment.css')

class CommentParent extends React.Component{

  render(){
    return (<div className='commentParent'>
      <AddComment campId={this.props.campId} nsp={this.props.nsp} />
      <CommentList campId={this.props.campId} />
    </div>)
  }
}

export default CommentParent