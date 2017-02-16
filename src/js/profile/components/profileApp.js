import React, {Component} from 'react';
import ProfileDetail from '../containers/profile-detail';

class ProfileApp extends React.Component {

  render() {
   return ( <div>
    <h2>Profile Settings: </h2>
    <ProfileDetail />
    </div>
    )
  }
}

export default ProfileApp;