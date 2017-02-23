import React from 'react'
import io from 'socket.io-client'
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
      hasFetched: false,
      ioNamespace: null
    }
  }

  fetchComments(campId) {
    console.log('this fetchComments', this)
    var context = this;
    window.socket = io(`/${campId}`)
    // var socket = io.connect(`http://localhost:4040/${campId}`)
    console.log('-------SOCKETS FTW----', window.socket)
    socket.on('cgConnection', (data)=> {
      console.log('connected to commonground', data)
      this.setState({
        ioNamespace: data.namespace
      })
      console.log('^^^^^^^^^^^ socket nsp ^^^^^', this.state)
    });
    socket.on('comment', (data) => {
      console.log('context props', context.props)
      setTimeout(function(){
        context.props.getComments(campId)
      }, 2000)
    })
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
        {this.state.showComments && <CommentParent campId={campId} nsp={this.state.ioNamespace}/>}
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