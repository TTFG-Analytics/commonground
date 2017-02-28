import React from 'react'
import io from 'socket.io-client'
import CampList from './CampList'
import Analytics from '../discuss/Analytics'
import CommentParent from '../comments/CommentParent'
import { connect } from 'react-redux'
import { getComments, createCommentSuccess } from '../actions/actions'
import { Button, Glyphicon, Panel, Col, Row, Grid } from 'react-bootstrap';


class Camp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showComments: false,
      hasFetched: false,
      ioNamespace: null,
      showChart: false,
      showModal: false
    }
  }

  fetchComments(campId) {
    this.disconnectFromPrev();
    var context = this;
    window.socket = io(`/${campId}`)
    window.socket.on('cgConnection', (data)=> {
      console.log('connected to commonground', data)
      this.setState({
        ioNamespace: data.namespace
      })
      console.log('^^^^^^^^^^^ socket nsp ^^^^^', this.state)
    });
    window.socket.on('comment', (data) => {
      this.props.createCommentSuccess(data)
    })
    this.props.getComments(campId)
    this.setState({
      showComments: !this.state.showComments
    })
  }

  disconnectFromPrev() {
    if(window.socket) {
      window.socket.disconnect()
      console.log('disconnected from sockets!!!!!')
    }
  }

  render() {
    const campName = (
      <h3 onClick={()=> this.fetchComments(campId)}>{this.props.inputStr}</h3>
    );
    var campId = this.props.campId
    console.log("camp w/ Analytics", this.state);
    return (
      <Col md={6}>
        <Panel header={campName}>
          <Analytics campId={campId} />
          {this.state.showComments && <CommentParent campId={campId} nsp={this.state.ioNamespace}/>}

        </Panel>
      </Col>
    )
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

export default connect(null, mapDispatchToProps)(Camp)