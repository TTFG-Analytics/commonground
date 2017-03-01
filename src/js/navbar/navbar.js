import React from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap';
import ProfileButton from '../discussion/camps/ProfileButton'
import { Link } from 'react-router'
require('./navStyles.css')

class Navigation extends React.Component {

  render() {
   return (
    <Navbar inverse>
    <Nav className='navStuff'>
    <NavItem>
    <ProfileButton />
    </NavItem>
    <NavItem >
        <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>About</MenuItem>
        <MenuItem eventKey={3.2}>Login/Logout</MenuItem>
      </NavDropdown>
    </NavItem>
    </Nav>
    </Navbar>
    )
  }
}


export default Navigation;
        <a href="/as" target="_blank">COMMON X GROUND</a>

    /*<Navbar.Header>
      <Navbar.Brand>
        <img src="./Common.png"></img>
      </Navbar.Brand>
    </Navbar.Header>*/
    // style={{marginRight: 0 + 'em'}}