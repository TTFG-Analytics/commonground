import React from 'react'
import io from 'socket.io-client'
import CampList from './CampList'
import Analytics from '../../analytics/Analytics'
import CommentParent from '../comments/CommentParent'
import { connect } from 'react-redux'
import { getComments, createCommentSuccess } from '../comments/commentActions'
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
    var context = this;
    this.setState({
      showComments: !this.state.showComments
    }, () => {
      if(this.state.showComments) {
        window[campId] = io(`/${campId}`)
        window[campId].on('cgConnection', (data)=> {
          console.log(`Connected to namespace /${campId}`);
        });
        window[campId].on('comment', (data) => {
          context.props.createCommentSuccess(data)
        })
        context.props.getComments(campId)
      }
    });
  }

  disconnectFromPrev(campId) {
    if(window[campId]) {
      window[campId].disconnect()
      delete window[campId]
      console.log('Disconnected from sockets!')
    }
  }

  componentWillUnmount() {
    this.disconnectFromPrev(this.props.campId);
  }

  render() {
    const campName = (
      <div onClick={()=> this.fetchComments(this.props.campId)}>
      <h3>{this.props.inputStr}</h3>
      </div>
    );

    return (
      <Col md={6}>
        <Panel header={campName} className='campBox'>
        <Button className='openPanel' onClick={()=> this.fetchComments(this.props.campId)}>
          <Glyphicon glyph="resize-vertical">
          </Glyphicon>
        </Button>
          {this.state.showComments && <Analytics campId={this.props.campId} />}
          {this.state.showComments && <CommentParent campId={this.props.campId} />}
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
    }
  }
}

export default connect(null, mapDispatchToProps)(Camp)



// contributedOnce: () => {  <-- removing contributedOnce since we don't need constraints for comments 
//   dispatch(contributedOnce())
// }
// context.props.contributedOnce() <--removing constraint against making multiple comments for now