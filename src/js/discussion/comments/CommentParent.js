import React from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import CommentList from './CommentList'
// import { connect } from 'react-redux'
// import { getComments } from '../actions/actions'

class CommentParent extends React.Component{
  //componentDidMount() {
    
    // let id = this.props.campId
    // console.log('componentDidMount CommentParent id', id)
    // this.props.getComments(id)
  //}

  render(){
    console.log('=======campId in CommentParent ============', this.props.campId)
    return (<div>
      <AddComment campId={this.props.campId} />
      <CommentList campId={this.props.campId} />
    </div>)
  }
}

// const mapStateToProps = (state) => {
//   return {
//     comments: state.commentGet
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getComments: (campId) => {
//       dispatch(getComments(campId))
//     }
//   }
// }

export default CommentParent