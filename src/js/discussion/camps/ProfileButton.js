import React from 'react'
import { Link } from 'react-router'
// import {Button, IconButton} from 'react-toolbox/lib/button';

class ProfileButton extends React.Component{
  render() {
    return (
      <Link to={"/userprofile"}><button>User Profile</button></Link>
    )
  }
}

export default ProfileButton