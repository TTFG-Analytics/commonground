import React from 'react'
import { Link } from 'react-router'
// import {Button, IconButton} from 'react-toolbox/lib/button';

class ProfileButton extends React.Component{
  render() {
    return (
      <Link to={"/userprofile"}>User Profile</Link>
    )
  }
}

export default ProfileButton

// <h4 style={{marginLeft: '40px'}}>