import React from 'react'
import io from 'socket.io-client'
import CampList from './CampList'
import Analytics from '../../analytics/Analytics'
import CommentParent from '../comments/CommentParent'
import { connect } from 'react-redux'
import { getComments, createCommentSuccess, contributedOnce } from '../comments/commentActions'
import { Button, Glyphicon, Panel, Col, Row, Grid } from 'react-bootstrap';
require('./camp.css')

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
    });
    window.socket.on('comment', (data) => {
      this.props.createCommentSuccess(data)
      this.props.contributedOnce()
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
      <h2>{this.props.inputStr}</h2>
    );

    return (
      <Col md={6}>
        <Panel header={campName} className='campBox' onClick={()=> this.fetchComments(this.props.campId)}>
          {this.state.showComments && <Analytics campId={this.props.campId} />}
          {this.state.showComments && <CommentParent campId={this.props.campId} nsp={this.state.ioNamespace}/>}
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
    createCommentSuccess: (campId) => {
      dispatch(createCommentSuccess(campId))
    },
    contributedOnce: () => {
      dispatch(contributedOnce())
    }
  }
}

export default connect(null, mapDispatchToProps)(Camp)