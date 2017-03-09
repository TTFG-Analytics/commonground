import React from 'react'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap';
import ProfileButton from '../discussion/camps/ProfileButton'
import { Link } from 'react-router'
require('./navStyles.css')
import { LinkContainer} from 'react-router-bootstrap'
require('./navbarstyles.css');

class Navigation extends React.Component {

  render() {
   return (
    <Navbar inverse fixedTop className='navbarTotal'>
    <Nav className='navLeft'>
      <NavItem>
        <LinkContainer to='/'>
          <h4>Commonground</h4>
        </LinkContainer>
      </NavItem>
    </Nav>
    <Nav className='navStuff'>
      <NavItem className='navbarItem'>
        <ProfileButton />
      </NavItem>
      <NavItem className='navbarItem'>
          <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
            <LinkContainer to='/about'>
              <MenuItem eventKey={3.1}>About</MenuItem>
            </LinkContainer>
            <LinkContainer to='/logout'>
              <MenuItem eventKey={3.2}>Login/Logout</MenuItem>
            </LinkContainer>
        </NavDropdown>
      </NavItem>
    </Nav>
    </Navbar>
    )
  }
}


export default Navigation;
        // <a href="/as" target="_blank">COMMON X GROUND</a>

    /*<Navbar.Header>
      <Navbar.Brand>
        <img src="./Common.png"></img>
      </Navbar.Brand>
    </Navbar.Header>*/
    // style={{marginRight: 0 + 'em'}}
        // <a href="/as" target="_blank">COMMON X GROUND</a>

  // <NavDropdown eventKey={3} title="Authorization" id="basic-nav-dropdown">
  //   <LinkContainer to="/logout">
  //     <MenuItem eventKey={3.1}>Logout</MenuItem>    
  //   </LinkContainer> 

    
    // <Navbar>
    // <nav>
    //       <ProfileButton />
    // </nav>
    // <Navbar.Header>
    //   <Navbar.Brand>
    //     <h1>Common Ground</h1>
    //   </Navbar.Brand>
    // </Navbar.Header>
    // <Nav>
