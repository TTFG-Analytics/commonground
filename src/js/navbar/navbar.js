import React from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap';
import ProfileButton from '../discussion/camps/ProfileButton'
import { Link } from 'react-router'

class Navigation extends React.Component {

  render() {
   return (
    
    <Navbar>
    <nav>
          <ProfileButton />
    </nav>
    <Navbar.Header>
      <Navbar.Brand>
        <img src="./Common.png"></img>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav style={{marginRight: 0 + 'em'}}>
        <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>About</MenuItem>
        <MenuItem eventKey={3.2}>Login/Logout</MenuItem>
      </NavDropdown>
    </Nav>
    </Navbar>
    )
  }
}


export default Navigation;
        <a href="/as" target="_blank">COMMON X GROUND</a>
