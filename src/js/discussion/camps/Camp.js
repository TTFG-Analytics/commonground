import React from 'react'
import CampList from './CampList'
import CommentParent from '../comments/CommentParent'
import { connect } from 'react-redux'
import { getComments } from '../actions/actions'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

class Camp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showComments: false,
      hasFetched: false
    }
  }

  fetchComments(campId) {
    console.log('this fetchComments', this)
    this.props.getComments(campId)
    this.setState({
      showComments: !this.state.showComments
    })
  }

  render() {
    var campId = this.props.campId
    return (
      <Card style={{width: '100%'}}>
      <CardTitle onClick={()=> this.fetchComments(campId)} title={this.props.inputStr} />
        {this.state.showComments && <CommentParent campId={campId} />}
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (campId) => {
      dispatch(getComments(campId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camp)