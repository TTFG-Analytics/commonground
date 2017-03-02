const React = require('react');
import Navigation from '../navbar/navbar'
import { Panel, Col, Grid, Accordion } from 'react-bootstrap';


class About extends React.Component{
  render(){
    return (
      <div>
      <Navigation />
      <Col md={8} mdOffset={2}>
      <Panel> 
        <Accordion>
          <Panel header="What this app is about" eventKey="1">
            This is a social app designed to facilitate comunication between different viewpoints.
          </Panel>
          <Panel header="How to use this app" eventKey="2">
            By signing in through facebook, you will be able to create a discussion, create a comment, or vote on a post.
            However you are not required to be signed in to browse content. If there are multiple users on your computer,
            there is an ability to logout and login with a different facebook ID. Please note that this will also log you
            out of facebook proper.
          </Panel>
          <Panel header="Rules" eventKey="3">
            <ol>
              <li>No ad hominem attacks</li>
              <li>Be nice and civil</li>
            </ol>
          </Panel>          

          <Panel header="How we use your data" eventKey="4">
            Nunc orci nulla, iaculis a nulla vel, imperdiet rutrum nulla. Sed gravida, 
            lectus eget mattis viverra, dui mauris suscipit dolor, quis molestie massa 
            purus at diam. Fusce lobortis ullamcorper sem ac feugiat. Cras maximus mi 
            bibendum, accumsan ipsum vitae, tempus nulla. Vivamus nec sodales nunc, ut 
            porta diam. Fusce euismod, dolor et dictum tincidunt, magna est aliquam 
            elit, ac ultrices erat quam et nibh. Suspendisse luctus posuere ante. 
            Vivamus in orci id lacus imperdiet suscipit ac ut nisi.
          </Panel>
          
          <Panel header="About Us" eventKey="5">
            TTFG are a group of like minded software engineers hoping to make the world a better place, one app at a time.
          </Panel>
        </Accordion>
        </Panel>
      </Col>  
      </div>
    )
  }
}

module.exports = About;