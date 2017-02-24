import React from 'react'
import { Link } from 'react-router'
// import {Button, IconButton} from 'react-toolbox/lib/button';

class ProfileButton extends React.Component{
  render() {
    return (
      <Link to={"/userprofile"}><h4 style={{marginLeft: '40px'}}>User Profile</h4></Link>
    )
  }
}

export default ProfileButton