import React from 'react'
import FaceBookButton from '../discussion/camps/FaceBookButton'
import store from '../store'
import ProfileButton from '../discussion/camps/ProfileButton'
import Router from 'react-router'
import Navigation from '../navbar/navbar'
import { Panel, Col, Grid } from 'react-bootstrap';
require('./logoutStyles.css');

class Logout extends React.Component{
  
  componentDidMount(){
    FB.XFBML.parse()
  }

  render() {
    return (

      <div>
        <Navigation />
        <Col md={2} mdOffset={5}>
        <div>
          <Panel className="fbPan"> <FaceBookButton /> 
          </Panel>
        </div>
        </Col>
        <Col md={4} mdOffset={4}>
        <Panel><h4>Facebook is required to use many features of this app</h4></Panel>
        </Col>
      </div>
    )
  }
}

module.exports = Logout