import React from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap';
import ProfileButton from '../discussion/camps/ProfileButton'
import { Link } from 'react-router'

class Navigation extends React.Component {

  render() {
   return (
    <Navbar>
      <Nav>
        <NavItem>
          <a>Home</a>
        </NavItem>
        <NavItem>
          <ProfileButton />
        </NavItem>
      </Nav>
    </Navbar>
    )
  }
}


export default Navigation;
        //<Link to={`/home`}><h4>Home</h4></Link>
