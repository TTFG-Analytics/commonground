const React = require('react');
import Navigation from '../navbar/navbar'
import { Panel, Col, Grid, Accordion } from 'react-bootstrap';
require('./aboutStyles.css');



class About extends React.Component{
  render(){
    return (
      <div>
      <Navigation />
      <Col md={8} mdOffset={2}>
      <Panel className="abtBox"> 
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
              <li>Per discussion you get 1 comment or upvote, use it wisely</li>
              <li>Do your best to support facts with sources, actual sources... not news articles</li>
            </ol>
          </Panel>          

          <Panel header="How we use your data" eventKey="4">
            We gather data from your public profile. This includes your name, facebook ID, Nationality, and Profile picture. These
            are only used for providing an intuitive user interface and providing light metrics for analytics based on comments and
            commongrounds. In your user profile, you are able to input more information about yourself that also only goes towards displaying
            and graphing information. We do not sell your information, it is kept in house.
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