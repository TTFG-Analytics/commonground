import React from 'react'
import CommentList from './CommentList'
import Counter from './Counter'

class Comment extends React.Component{
  render(){
    console.log('inputStr', this.props)
    return (
      <li>
      <h4>{this.props.inputStr}</h4>
      <Counter commentId={this.props.commentId}/>
      </li>
    )
  }
}


export default Comment