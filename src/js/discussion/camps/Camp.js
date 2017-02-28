import React from 'react'
import io from 'socket.io-client'
import CampList from './CampList'
import CommentParent from '../comments/CommentParent'
import { connect } from 'react-redux'
import { getComments, createCommentSuccess } from '../actions/actions'
import { Panel, Col, Row, Grid } from 'react-bootstrap';


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
    this.disconnectFromPrev();
    console.log('this fetchComments', this, campId)
    var context = this;
    window.socket = io(`/${campId}`)
    // var socket = io.connect(`http://localhost:4040/${campId}`)
    console.log('-------SOCKETS FTW----', window.socket)
    window.socket.on('cgConnection', (data)=> {
      console.log('connected to commonground', data)
      this.setState({
        ioNamespace: data.namespace
      })
      console.log('^^^^^^^^^^^ socket nsp ^^^^^', this.state)
    });
    window.socket.on('comment', (data) => {
      console.log('context props', context.props)
      this.props.createCommentSuccess(data)
    })
    this.props.getComments(campId)
    this.setState({
      showComments: !this.state.showComments
    })
  }

  disconnectFromPrev() {
    if(window.socket) {
      console.log('starting disconnect')
      window.socket.disconnect()
      console.log('disconnected from sockets!!!!!')
    }
  }

  render() {
    const campName = (
      <h3 onClick={()=> this.fetchComments(campId)}>{this.props.inputStr}</h3>
    );
    var campId = this.props.campId
    console.log("~!@", this.state);
    return (

      <Col md={6}>
        <Panel header={campName}>
          {this.state.showComments && <CommentParent campId={campId} nsp={this.state.ioNamespace}/>}
        </Panel>
      </Col>

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
    },
    createCommentSuccess: (campId) =>
      dispatch(createCommentSuccess(campId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Camp)