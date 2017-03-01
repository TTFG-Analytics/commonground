import React from 'react'
import FaceBookButton from '../discussion/camps/FaceBookButton'
import store from '../store'
import BackButton from '../discussion/camps/BackButton'
import ProfileButton from '../discussion/camps/ProfileButton'
import Router from 'react-router'
import Navigation from '../navbar/navbar'

class Logout extends React.Component{
  
  render() {
    return (

      <div>
        <Navigation />
        <FaceBookButton />
      </div>
    )
  }
}

module.exports = Logout