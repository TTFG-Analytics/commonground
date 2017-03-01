import React from 'react'
// import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import FaceBookIntegration from '../discussion/camps/FaceBookIntegration'
import store from '../store'
// import { AppBar } from 'react-toolbox/lib/app_bar'
import BackButton from '../discussion/camps/BackButton'
import ProfileButton from '../discussion/camps/ProfileButton'
import { Link } from 'react-router'
import Navigation from '../navbar/navbar'

class Logout extends React.Component{
  render() {
    return (
      <div>
        <Navigation />
        <FaceBookIntegration />
      </div>
    )
  }
}

module.exports = Logout