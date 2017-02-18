import React, {Component} from 'react';
import ProfileDetail from '../containers/profile-detail';
import BackButton from '../../discussion/camps/BackButton'
import {fbHolding} from '../../discussion/camps/FaceBookIntegration'


class ProfileApp extends React.Component {

  render() {
   return ( <div>
    <BackButton />
    <h2>Profile Settings: </h2>
    <ProfileDetail />
    </div>
    )
  }
}

export default ProfileApp;